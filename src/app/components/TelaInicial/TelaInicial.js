import Image from 'next/image';
import Link from 'next/link';
import style from './TelaInicial.module.css';
import chancela from '../../assets/mostra2026/chancela.svg';
import nomeMostra from '../../assets/mostra2026/nome-mostra.svg';
import olhoFlor from '../../assets/mostra2026/olho-flor.svg';
import reguaLogos from '../../assets/mostra2026/regua-logos.svg';

// Telas 1.1 (Aguarde) e 1.2 (Abertura).
// Com sessaoId mostra o botão VOTAR; sem, mostra o aviso de espera.
export function TelaInicial({ sessaoId }) {
  return (
    <>
      <main className={style.topo}>
        <Image src={chancela} alt="Ministério da Cultura, Petrobras e Governo do Estado do Rio Grande do Norte apresentam" className={style.chancela} priority />
        <Image src={nomeMostra} alt="13ª Mostra de Cinema de Gostoso" className={style.nomeMostra} priority />

        <div className={style.arte}>
          <Image src={olhoFlor} alt="" className={style.olho} priority />
        </div>

        <div className={style.acao}>
          {sessaoId ? (
            <Link href={`/votar/${sessaoId}`} className={style.votar}>
              VOTAR
            </Link>
          ) : (
            <>
              <p className={style.aguarde}>AGUARDE!</p>
              <p className={style.aviso}>
                A VOTAÇÃO COMEÇARÁ
                <br />
                APÓS O TÉRMINO DA SESSÃO
              </p>
            </>
          )}
        </div>

        <h1 className={style.mostraCompetitiva}>
          MOSTRA
          <br />
          COMPETITIVA
        </h1>
      </main>

      <footer className={style.rodape}>
        <Image src={reguaLogos} alt="Realização, patrocínio e apoio da 13ª Mostra de Cinema de Gostoso" className={style.regua} />
      </footer>
    </>
  );
}
