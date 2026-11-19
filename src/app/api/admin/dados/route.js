import { SESSOES, CATEGORIAS } from '../../../dados/mostra';
import { requisicaoAutorizada } from '../../../lib/admin';
import { lerControle } from '../../../lib/controle';
import { estatisticas, modoTeste, nomeBanco } from '../../../lib/armazenamento';

export const dynamic = 'force-dynamic';

const media = (f) => (f.votos ? f.soma / f.votos : null);

// Tudo que o painel mostra, já organizado por sessão e com o ranking de cada categoria.
export async function GET(request) {
  if (!requisicaoAutorizada(request)) {
    return new Response('Não autorizado', { status: 401 });
  }

  try {
    const [controle, stats] = await Promise.all([lerControle(), estatisticas()]);
    const vazio = { votos: 0, soma: 0, notas: [0, 0, 0, 0, 0] };

    const sessoes = SESSOES.map((sessao) => ({
      id: sessao.id,
      numero: sessao.numero,
      data: sessao.data,
      diaSemana: sessao.diaSemana,
      horario: sessao.horario,
      votos: 0,
      pesquisas: 0,
      recentes: 0,
      ultimoVoto: null,
      ...stats.sessoes[sessao.id],
      filmes: sessao.filmes.map((filme) => {
        const f = stats.filmes[`${sessao.id}/${filme.id}`] ?? vazio;
        return { id: filme.id, titulo: filme.titulo, categoria: filme.categoria, votos: f.votos, media: media(f), notas: f.notas };
      }),
    }));

    // Ranking geral por categoria: maior média primeiro; empate, mais votos
    const ranking = {};
    for (const categoria of Object.keys(CATEGORIAS)) {
      ranking[categoria] = sessoes
        .flatMap((s) => s.filmes.map((f) => ({ ...f, sessao: s.numero })))
        .filter((f) => f.categoria === categoria)
        .sort((a, b) => (b.media ?? -1) - (a.media ?? -1) || b.votos - a.votos);
    }

    return Response.json({
      agora: new Date(),
      modoTeste: modoTeste(),
      banco: nomeBanco(),
      aberta: controle.aberta,
      atualizadoEm: controle.atualizadoEm,
      sessoes,
      ranking,
    });
  } catch (error) {
    console.error('Erro ao carregar o painel:', error);
    return new Response('Erro ao carregar os dados', { status: 500 });
  }
}
