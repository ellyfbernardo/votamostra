import { notFound } from 'next/navigation';
import { buscarSessao, votacaoAberta } from '../../dados/mostra';
import { TelaInicial } from '../../components/TelaInicial/TelaInicial';
import { Carrossel } from './Carrossel';

export const dynamic = 'force-dynamic';

export default async function Votacao({ params }) {
  const { sessao: sessaoId } = await params;
  const sessao = buscarSessao(sessaoId);
  if (!sessao) notFound();

  // Fora do horário da votação, mostra a tela "Aguarde"
  if (!votacaoAberta(sessao)) {
    return <TelaInicial />;
  }

  return <Carrossel sessaoId={sessao.id} />;
}
