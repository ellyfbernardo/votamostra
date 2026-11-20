import { randomInt } from 'node:crypto';
import { requisicaoAutorizada } from '../../../lib/admin';
import { limparSorteios, sortear } from '../../../lib/armazenamento';

// { acao: 'sortear' } sorteia uma pessoa entre quem respondeu a pesquisa (sem repetir);
// { acao: 'limpar' } apaga o histórico de sorteados.
export async function POST(request) {
  if (!requisicaoAutorizada(request)) {
    return new Response('Não autorizado', { status: 401 });
  }

  let acao;
  try {
    ({ acao } = await request.json());
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }

  try {
    if (acao === 'limpar') {
      await limparSorteios();
      return new Response(null, { status: 204 });
    }
    if (acao === 'sortear') {
      const resultado = await sortear((n) => randomInt(n));
      if (!resultado) return new Response('Ninguém disponível para sortear', { status: 409 });
      return Response.json({ ...resultado.sorteado, nomes: resultado.nomes });
    }
    return new Response('Ação inválida', { status: 400 });
  } catch (error) {
    console.error('Erro no sorteio:', error);
    return new Response('Erro no sorteio', { status: 500 });
  }
}
