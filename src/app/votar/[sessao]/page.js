import { notFound } from 'next/navigation';
import { buscarSessao } from '../../dados/mostra';
import { sessaoEmVotacao } from '../../lib/controle';
import { TelaInicial } from '../../components/TelaInicial/TelaInicial';
import { Carrossel } from './Carrossel';

export const dynamic = 'force-dynamic';

export default async function Votacao({ params }) {
  const { sessao: sessaoId } = await params;
  const sessao = buscarSessao(sessaoId);
  if (!sessao) notFound();

  // Votação desta sessão fechada: mostra "Aguarde" ou o botão da votação que estiver aberta
  const aberta = await sessaoEmVotacao();
  if (aberta?.id !== sessao.id) {
    return <TelaInicial sessaoId={aberta?.id} />;
  }

  return <Carrossel sessaoId={sessao.id} />;
}
