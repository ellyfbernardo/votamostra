// Qual votação está aberta agora. Fica no MongoDB (coleção "controle"), no mesmo
// banco dos votos: no modo de teste, o painel controla só o banco de teste.
// Só uma votação fica aberta por vez; quem abre e encerra é a equipe pelo /admin.
// Cada votação fecha sozinha DURACAO_VOTACAO_MIN minutos depois de aberta.
// Só roda no servidor.
import { bancoAtual } from './armazenamento';
import { buscarSessao } from '../dados/mostra';

export const DURACAO_VOTACAO_MIN = 90; // 01:30:00

const ID = 'votacao';

async function colecao() {
  return (await bancoAtual()).collection('controle');
}

// { aberta, abertaEm, fechaEm, atualizadoEm, encerradaAuto }
// encerradaAuto: { sessao, em } quando a última votação fechou pelo timer
export async function lerControle() {
  const doc = await (await colecao()).findOne({ _id: ID });
  const sessao = doc?.aberta && buscarSessao(doc.aberta) ? doc.aberta : null;
  const abertaEm = sessao ? (doc.abertaEm ?? doc.atualizadoEm) : null;
  const fechaEm = abertaEm ? new Date(new Date(abertaEm).getTime() + DURACAO_VOTACAO_MIN * 60 * 1000) : null;

  if (fechaEm && Date.now() >= fechaEm.getTime()) {
    return { aberta: null, abertaEm: null, fechaEm: null, atualizadoEm: fechaEm, encerradaAuto: { sessao, em: fechaEm } };
  }
  return { aberta: sessao, abertaEm, fechaEm, atualizadoEm: doc?.atualizadoEm ?? null, encerradaAuto: null };
}

// Abre a votação de uma sessão (encerrando a anterior e zerando o timer) ou, com null, encerra tudo.
export async function definirVotacaoAberta(sessaoId) {
  const agora = new Date();
  await (await colecao()).updateOne(
    { _id: ID },
    { $set: { aberta: sessaoId, abertaEm: sessaoId ? agora : null, atualizadoEm: agora } },
    { upsert: true }
  );
}

// Sessão com votação aberta agora, ou null
export async function sessaoEmVotacao() {
  const { aberta } = await lerControle();
  return aberta ? buscarSessao(aberta) : null;
}

export async function votacaoAberta(sessao) {
  if (!sessao) return false;
  return (await sessaoEmVotacao())?.id === sessao.id;
}
