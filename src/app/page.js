import { TelaInicial } from './components/TelaInicial/TelaInicial';
import { sessaoEmVotacao } from './dados/mostra';

// Calculada a cada acesso: mostra VOTAR só quando há uma sessão com votação aberta.
export const dynamic = 'force-dynamic';

export default function Home() {
  const sessao = sessaoEmVotacao();
  return <TelaInicial sessaoId={sessao?.id} />;
}
