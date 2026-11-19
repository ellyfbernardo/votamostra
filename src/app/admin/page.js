import { cookies } from 'next/headers';
import { COOKIE_ADMIN, adminConfigurado, tokenValido } from '../lib/admin';
import { Login } from './Login';
import { Painel } from './Painel';
import style from './admin.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Painel – VotaMostra',
  robots: { index: false, follow: false },
};

// Painel da equipe: abrir/encerrar votações e acompanhar os votos em tempo real.
export default async function Admin() {
  if (!adminConfigurado()) {
    return (
      <div className={style.pagina}>
        <div className={style.caixaLogin}>
          <h1 className={style.tituloLogin}>PAINEL DA VOTAÇÃO</h1>
          <p className={style.textoLogin}>
            O painel ainda não tem senha. Defina a variável <code>ADMIN_SENHA</code> na Vercel (ou no <code>.env</code>) e
            publique de novo.
          </p>
        </div>
      </div>
    );
  }

  const token = (await cookies()).get(COOKIE_ADMIN)?.value;
  return <div className={style.pagina}>{tokenValido(token) ? <Painel /> : <Login />}</div>;
}
