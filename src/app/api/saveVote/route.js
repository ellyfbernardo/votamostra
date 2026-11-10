import axios from 'axios';
import { buscarSessao, votacaoAberta } from '../../dados/mostra';
import { cpfValido, notaValida, coordenadaValida, objetoSimples } from '../../lib/validacao';
import { modoTeste, votoExiste, inserirVoto } from '../../lib/armazenamento';

async function buscarCidade(latitude, longitude) {
  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) {
    throw new Error('OPENCAGE_API_KEY não definida no .env');
  }

  const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
    params: { q: `${latitude},${longitude}`, key: apiKey },
  });

  const componentes = response.data.results?.[0]?.components ?? {};
  return componentes.city || componentes.town || componentes.village || null;
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }

  const teste = modoTeste();

  // Validação de tudo que veio do navegador
  const { sessao: sessaoId, cpf, notas, latitude, longitude, notificar } = data ?? {};

  const sessao = buscarSessao(sessaoId);
  if (!sessao) {
    return new Response('Sessão inválida', { status: 400 });
  }
  if (!votacaoAberta(sessao)) {
    return new Response('A votação desta sessão não está aberta', { status: 403 });
  }
  if (!cpfValido(cpf)) {
    return new Response('CPF inválido', { status: 400 });
  }

  const temLocalizacao = coordenadaValida(latitude, 90) && coordenadaValida(longitude, 180);
  if (!temLocalizacao && !teste) {
    return new Response('Localização obrigatória', { status: 422 });
  }

  if (!objetoSimples(notas)) {
    return new Response('Votos inválidos', { status: 400 });
  }

  // Só aceita notas de 1 a 5 para filmes desta sessão
  const notasValidas = {};
  for (const filme of sessao.filmes) {
    const nota = notas[filme.id];
    if (nota === undefined || nota === null) continue;
    if (!notaValida(nota)) {
      return new Response(`Nota inválida para ${filme.titulo}`, { status: 400 });
    }
    notasValidas[filme.id] = nota;
  }
  if (Object.keys(notasValidas).length === 0) {
    return new Response('Nenhum voto informado', { status: 400 });
  }

  try {
    if (await votoExiste(cpf, sessao.id)) {
      return new Response('CPF já votou nesta sessão', { status: 409 });
    }

    // No modo de teste não consulta a OpenCage
    let cidade = null;
    if (!teste) {
      cidade = await buscarCidade(latitude, longitude);
      if (!cidade) {
        throw new Error('Não foi possível encontrar o nome da cidade.');
      }
    }

    const result = await inserirVoto({
      sessao: sessao.id,
      cpf,
      notas: notasValidas,
      latitude: temLocalizacao ? latitude : null,
      longitude: temLocalizacao ? longitude : null,
      cidade,
      notificar: notificar === true,
      horarioVoto: new Date(),
      form: null,
      ...(teste && { teste: true }),
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    if (error.code === 11000) {
      return new Response('CPF já votou nesta sessão', { status: 409 });
    }

    console.error('Erro ao salvar o voto:', error);
    return new Response('Erro ao salvar o voto', { status: 500 });
  }
}
