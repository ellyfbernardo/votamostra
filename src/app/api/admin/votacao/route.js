import { buscarSessao } from '../../../dados/mostra';
import { requisicaoAutorizada } from '../../../lib/admin';
import { definirVotacaoAberta, lerControle } from '../../../lib/controle';

// Abre a votação de uma sessão ({ sessao: "21-nov-curtas" }) ou encerra ({ sessao: null }).
export async function POST(request) {
  if (!requisicaoAutorizada(request)) {
    return new Response('Não autorizado', { status: 401 });
  }

  let sessao;
  try {
    ({ sessao } = await request.json());
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }
  if (sessao !== null && !buscarSessao(sessao)) {
    return new Response('Sessão inválida', { status: 400 });
  }

  try {
    await definirVotacaoAberta(sessao);
    return Response.json(await lerControle());
  } catch (error) {
    console.error('Erro ao alterar a votação:', error);
    return new Response('Erro ao alterar a votação', { status: 500 });
  }
}
