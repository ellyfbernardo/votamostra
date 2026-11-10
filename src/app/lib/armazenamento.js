// Onde os votos são guardados (MongoDB, coleção COLECAO_VOTOS).
// - Normal: banco BANCO (dados oficiais).
// - Modo de teste (VOTACAO_MODO_TESTE=true): banco separado BANCO_TESTE,
//   para os votos de teste nunca se misturarem com os oficiais.
//   Para limpar os testes, basta apagar esse banco no MongoDB.
import clientPromise from '../mongodb';
import { BANCO, COLECAO_VOTOS } from './validacao';

export const BANCO_TESTE = `${BANCO}-teste`;

export const modoTeste = () => process.env.VOTACAO_MODO_TESTE === 'true';

// Um índice por banco, criado uma vez por processo
const indices = {};

async function colecao() {
  const nomeBanco = modoTeste() ? BANCO_TESTE : BANCO;
  const client = await clientPromise;
  const col = client.db(nomeBanco).collection(COLECAO_VOTOS);

  // Garante um voto por CPF em cada sessão, mesmo com duas requisições simultâneas
  if (!indices[nomeBanco]) {
    indices[nomeBanco] = col.createIndex({ cpf: 1, sessao: 1 }, { unique: true }).catch((error) => {
      indices[nomeBanco] = undefined;
      console.error('Não foi possível criar o índice único de votos:', error);
    });
  }
  await indices[nomeBanco];
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
