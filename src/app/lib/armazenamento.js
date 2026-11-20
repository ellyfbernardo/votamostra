// Onde os votos são guardados (MongoDB, coleção COLECAO_VOTOS).
// - Normal: banco BANCO (dados oficiais).
// - Modo de teste (VOTACAO_MODO_TESTE=true): banco separado BANCO_TESTE,
//   para os votos de teste nunca se misturarem com os oficiais.
//   Para limpar os testes, basta apagar esse banco no MongoDB.
import clientPromise from '../mongodb';
import { BANCO, COLECAO_VOTOS } from './validacao';

export const BANCO_TESTE = `${BANCO}-teste`;

export const modoTeste = () => process.env.VOTACAO_MODO_TESTE === 'true';

export const nomeBanco = () => (modoTeste() ? BANCO_TESTE : BANCO);

// Banco em uso agora (oficial ou de teste). Também guarda o controle da votação.
export async function bancoAtual() {
  const client = await clientPromise;
  return client.db(nomeBanco());
}

// Um índice por banco, criado uma vez por processo
const indices = {};

async function colecao() {
  const banco = nomeBanco();
  const col = (await bancoAtual()).collection(COLECAO_VOTOS);

  // Garante um voto por CPF em cada sessão, mesmo com duas requisições simultâneas
  if (!indices[banco]) {
    indices[banco] = col.createIndex({ cpf: 1, sessao: 1 }, { unique: true }).catch((error) => {
      indices[banco] = undefined;
      console.error('Não foi possível criar o índice único de votos:', error);
    });
  }
  await indices[banco];
  return col;
}

export async function votoExiste(cpf, sessao) {
  const col = await colecao();
  return Boolean(await col.findOne({ cpf, sessao }, { projection: { _id: 1 } }));
}

export async function inserirVoto(voto) {
  const col = await colecao();
  return col.insertOne(voto);
}

// Preenche a pesquisa do voto, só se ainda estiver vazia.
// Retorna 'ok', 'ja-respondida' ou 'sem-voto'.
export async function salvarPesquisa(cpf, sessao, form) {
  const col = await colecao();
  const atualizado = await col.findOneAndUpdate(
    { cpf, sessao, form: null },
    { $set: { form, formRespondidoEm: new Date() } }
  );
  if (atualizado) return 'ok';
  return (await votoExiste(cpf, sessao)) ? 'ja-respondida' : 'sem-voto';
}

// Números do painel /admin, direto do banco.
// sessoes: { [id]: { votos, pesquisas, recentes, ultimoVoto } }
// filmes:  { ['idSessao/idFilme']: { votos, soma, notas: [qtd de 1, de 2, ..., de 5] } }
// (votos de sessões que não existem mais, como os testes antigos, não entram)
export async function estatisticas() {
  const col = await colecao();
  const cincoMinutos = new Date(Date.now() - 5 * 60 * 1000);

  const [resultado] = await col
    .aggregate([
      {
        $facet: {
          sessoes: [
            {
              $group: {
                _id: '$sessao',
                votos: { $sum: 1 },
                pesquisas: { $sum: { $cond: [{ $ifNull: ['$form', false] }, 1, 0] } },
                recentes: { $sum: { $cond: [{ $gte: ['$horarioVoto', cincoMinutos] }, 1, 0] } },
                ultimoVoto: { $max: '$horarioVoto' },
              },
            },
          ],
          notas: [
            { $project: { sessao: 1, notas: { $objectToArray: '$notas' } } },
            { $unwind: '$notas' },
            { $group: { _id: { sessao: '$sessao', filme: '$notas.k', nota: '$notas.v' }, qtd: { $sum: 1 } } },
          ],
        },
      },
    ])
    .toArray();

  const sessoes = {};
  for (const { _id, ...dados } of resultado.sessoes) sessoes[_id] = dados;

  const filmes = {};
  for (const { _id, qtd } of resultado.notas) {
    const { sessao, filme, nota } = _id;
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) continue;
    const chave = `${sessao}/${filme}`;
    filmes[chave] ??= { votos: 0, soma: 0, notas: [0, 0, 0, 0, 0] };
    filmes[chave].votos += qtd;
    filmes[chave].soma += nota * qtd;
    filmes[chave].notas[nota - 1] += qtd;
  }

  return { sessoes, filmes };
}

// ---------- Painel: comentários e sorteio ----------

// Sugestões/comentários da pesquisa, mais recentes primeiro
export async function comentarios(limite = 300) {
  const col = await colecao();
  return col
    .find(
      { 'form.comentario': { $nin: [null, ''] } },
      { projection: { _id: 0, sessao: 1, formRespondidoEm: 1, 'form.nome': 1, 'form.comentario': 1, 'form.recomendacao': 1 } }
    )
    .sort({ formRespondidoEm: -1 })
    .limit(limite)
    .toArray()
    .then((docs) =>
      docs.map((d) => ({
        sessao: d.sessao,
        em: d.formRespondidoEm ?? null,
        nome: d.form.nome,
        comentario: d.form.comentario,
        recomendacao: d.form.recomendacao,
      }))
    );
}

// Quem respondeu a pesquisa, uma vez por CPF (a primeira resposta vale)
async function participantes() {
  const col = await colecao();
  return col
    .aggregate([
      { $match: { form: { $ne: null } } },
      { $sort: { formRespondidoEm: 1 } },
      {
        $group: {
          _id: '$cpf',
          nome: { $first: '$form.nome' },
          telefone: { $first: '$form.telefone' },
          cidade: { $first: '$form.cidade' },
          estado: { $first: '$form.estado' },
          sessao: { $first: '$sessao' },
        },
      },
    ])
    .toArray();
}

async function colecaoSorteios() {
  return (await bancoAtual()).collection('sorteios');
}

export async function listarSorteios() {
  return (await colecaoSorteios()).find({}, { projection: { _id: 0 } }).sort({ em: -1 }).toArray();
}

// Resumo para o painel: quantas pessoas ainda podem ser sorteadas e o histórico
export async function resumoSorteio() {
  const [todos, sorteados] = await Promise.all([participantes(), listarSorteios()]);
  const jaSorteados = new Set(sorteados.map((s) => s.cpf));
  return {
    participantes: todos.length,
    disponiveis: todos.filter((p) => !jaSorteados.has(p._id)).length,
    sorteados,
  };
}

// Sorteia uma pessoa entre quem respondeu a pesquisa e ainda não foi sorteado.
// Retorna o sorteado ou null se não houver ninguém disponível.
export async function sortear(aleatorio) {
  const [todos, sorteados] = await Promise.all([participantes(), listarSorteios()]);
  const jaSorteados = new Set(sorteados.map((s) => s.cpf));
  const disponiveis = todos.filter((p) => !jaSorteados.has(p._id));
  if (disponiveis.length === 0) return null;

  const p = disponiveis[aleatorio(disponiveis.length)];
  const sorteado = {
    cpf: p._id,
    nome: p.nome,
    telefone: p.telefone ?? '',
    cidade: [p.cidade, p.estado].filter(Boolean).join(' – '),
    sessao: p.sessao,
    concorreram: disponiveis.length,
    em: new Date(),
  };
  await (await colecaoSorteios()).insertOne({ ...sorteado });

  // Nomes que passam na animação da tela de sorteio: até 40 participantes em ordem
  // aleatória, abreviados ("Ana T.") para não expor nomes completos na gravação
  const embaralhados = [...disponiveis];
  for (let i = embaralhados.length - 1; i > 0; i--) {
    const j = aleatorio(i + 1);
    [embaralhados[i], embaralhados[j]] = [embaralhados[j], embaralhados[i]];
  }
  const nomes = embaralhados.slice(0, 40).map((pessoa) => abreviarNome(pessoa.nome));

  return { sorteado, nomes };
}

function abreviarNome(nome = '') {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length <= 1) return partes[0] ?? '';
  return `${partes[0]} ${partes.at(-1)[0].toUpperCase()}.`;
}

// Apaga o histórico (todos voltam a concorrer)
export async function limparSorteios() {
  await (await colecaoSorteios()).deleteMany({});
}
