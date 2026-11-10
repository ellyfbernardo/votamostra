import clientPromise from '../../mongodb';
import { cpfValido, texto, listaDeTextos, objetoSimples } from '../../lib/validacao';

// Campos de texto da página /pesquisa e o tamanho máximo de cada um.
const CAMPOS = {
  nome: 120,
  faixaEtaria: 10,
  pais: 100,
  estado: 100,
  cidade: 100,
  hospedagem: 50,
  hospedagemOutro: 200,
  soubeOutro: 200,
  primeiraVez: 10,
  salaFrequentada: 50,
  avaliacaoSalaPrincipal: 10,
  avaliacaoSalaPetrobras: 10,
  comentarioNota: 2000,
  pontoMaisDestaca: 50,
  pontoMaisDestacaOutro: 200,
  pontoMenosDestaca: 50,
  pontoMenosDestacaOutro: 200,
  melhoria: 50,
  melhoriaOutro: 200,
  motivoVoltar: 2000,
  recomendacao: 10,
  sugestao: 2000,
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }

  if (!objetoSimples(body) || !objetoSimples(body.form)) {
    return new Response('Formulário inválido', { status: 400 });
  }

  const form = {};
  for (const [campo, max] of Object.entries(CAMPOS)) {
    form[campo] = texto(body.form[campo], max);
  }
  form.soube = listaDeTextos(body.form.soube);

  if (!form.nome) {
    return new Response('Nome é obrigatório', { status: 400 });
  }

  // CPF é opcional aqui; se vier algo inválido, é descartado
  const cpf = cpfValido(body.cpf) ? body.cpf : null;

  try {
    const client = await clientPromise;
    const collection = client.db('votos-2025').collection('pesquisa-pos-2025');

    await collection.insertOne({
      cpf,
      form,
      createdAt: new Date(),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Erro ao salvar pesquisa:', error);
    return new Response('Erro interno', { status: 500 });
  }
}
