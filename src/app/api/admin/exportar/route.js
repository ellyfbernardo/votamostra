import { SESSOES, CATEGORIAS } from '../../../dados/mostra';
import { requisicaoAutorizada } from '../../../lib/admin';
import { listarVotosParaExportar } from '../../../lib/armazenamento';

export const dynamic = 'force-dynamic';

// Planilha com todos os votos, uma linha por voto, SEM dados pessoais:
// fica de fora CPF, nome, telefone e as coordenadas (latitude/longitude).
// CSV com ";" e BOM UTF-8 para abrir direto no Excel em português.

const FAIXAS = { '-18': 'Menos de 18', '18-24': '18 – 24', '25-34': '25 – 34', '35-44': '35 – 44', '45-54': '45 – 54', '55+': '55 ou mais' };
const MOTIVOS = { mostra: 'A Mostra', turismo: 'Turismo', trabalho: 'Trabalho', moro: 'Moro aqui' };
const COMO_SOUBE = { redes: 'Redes sociais', ads: 'Publicidade online', sites: 'Sites especializados', indicacao: 'Indicação', midia: 'Mídia tradicional' };
const SIM_NAO = { sim: 'Sim', nao: 'Não' };

const fusoBrasil = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Fortaleza',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
const dataHora = (d) => (d ? fusoBrasil.format(new Date(d)).replace(',', '') : '');

// Aspas quando preciso; textos que começam com = + - @ viram texto (evita fórmulas no Excel)
function celula(valor) {
  if (valor === null || valor === undefined) return '';
  let t = String(valor);
  if (typeof valor === 'string' && /^[=+\-@\t\r]/.test(t)) t = `'${t}`;
  return /[";\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}

export async function GET(request) {
  if (!requisicaoAutorizada(request)) {
    return new Response('Não autorizado', { status: 401 });
  }

  try {
    const sessoes = Object.fromEntries(SESSOES.map((s) => [s.id, s]));
    // Só sessões da programação atual (votos de testes antigos ficam de fora, como no painel)
    const votos = (await listarVotosParaExportar()).filter((v) => sessoes[v.sessao]);
    const filmes = SESSOES.flatMap((s) => s.filmes.map((f) => ({ ...f, sessao: s.numero, sessaoId: s.id })));

    const cabecalho = [
      'Voto nº',
      'Sessão',
      'Data da sessão',
      'Horário da sessão',
      'Data e hora do voto',
      'Cidade (localização do celular)',
      'Quer ser notificado(a)',
      'Filmes avaliados',
      ...filmes.map((f) => `Nota · S${f.sessao} · ${f.titulo} (${CATEGORIAS[f.categoria]?.singular ?? ''})`),
      'Respondeu a pesquisa',
      'Data e hora da pesquisa',
      'Faixa etária',
      'País',
      'Estado',
      'Cidade (pesquisa)',
      'Primeira vez em Gostoso',
      'Motivo da visita',
      'Como soube da Mostra',
      'Nota · Estrutura',
      'Nota · Organização',
      'Nota · Programação',
      'Nota · Acessibilidade',
      'Recomendaria',
      'Sugestões ou comentários',
    ];

    const linhas = votos.map((v, i) => {
      const s = sessoes[v.sessao];
      const p = v.form;
      const notas = v.notas ?? {};
      return [
        i + 1,
        s ? `Sessão ${s.numero}` : v.sessao,
        s ? s.data.split('-').reverse().join('/') : '',
        s?.horario ?? '',
        dataHora(v.horarioVoto),
        v.cidade ?? '',
        v.notificar ? 'Sim' : 'Não',
        Object.keys(notas).length,
        ...filmes.map((f) => (f.sessaoId === v.sessao ? notas[f.id] ?? '' : '')),
        p ? 'Sim' : 'Não',
        dataHora(v.formRespondidoEm),
        p ? FAIXAS[p.faixa] ?? p.faixa : '',
        p?.pais ?? '',
        p?.estado ?? '',
        p?.cidade ?? '',
        p ? SIM_NAO[p.primeiraVez] ?? p.primeiraVez : '',
        p ? MOTIVOS[p.motivo] ?? p.motivo : '',
        p ? (p.soube ?? []).map((x) => COMO_SOUBE[x] ?? x).join(', ') : '',
        p?.estrutura ?? '',
        p?.organizacao ?? '',
        p?.programacao ?? '',
        p?.acessibilidade ?? '',
        p?.recomendacao ?? '',
        p?.comentario ?? '',
      ];
    });

    const csv = '﻿' + [cabecalho, ...linhas].map((l) => l.map(celula).join(';')).join('\r\n') + '\r\n';
    const agora = dataHora(new Date()).replace(/[/: ]/g, '-');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="votos-mostra-gostoso-${agora}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Erro ao exportar votos:', error);
    return new Response('Erro ao exportar', { status: 500 });
  }
}
