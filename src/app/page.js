import { TelaInicial } from './components/TelaInicial/TelaInicial';
import { sessaoEmVotacao } from './lib/controle';

// Calculada a cada acesso: mostra VOTAR só quando há uma sessão com votação aberta.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const sessao = await sessaoEmVotacao();
  return <TelaInicial sessaoId={sessao?.id} />;
}
