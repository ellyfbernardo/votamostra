// Qual votação está aberta agora. Fica no MongoDB (coleção "controle"), no mesmo
// banco dos votos: no modo de teste, o painel controla só o banco de teste.
// Só uma votação fica aberta por vez; quem abre e encerra é a equipe pelo /admin.
// Só roda no servidor.
import { bancoAtual } from './armazenamento';
import { buscarSessao } from '../dados/mostra';

const ID = 'votacao';

async function colecao() {
  return (await bancoAtual()).collection('controle');
}

// { aberta: id da sessão ou null, atualizadoEm }
export async function lerControle() {
  const doc = await (await colecao()).findOne({ _id: ID });
  const aberta = doc?.aberta && buscarSessao(doc.aberta) ? doc.aberta : null;
  return { aberta, atualizadoEm: doc?.atualizadoEm ?? null };
}

// Abre a votação de uma sessão (encerrando a anterior) ou, com null, encerra tudo.
export async function definirVotacaoAberta(sessaoId) {
  await (await colecao()).updateOne(
    { _id: ID },
    { $set: { aberta: sessaoId, atualizadoEm: new Date() } },
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
