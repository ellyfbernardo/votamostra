import Image from 'next/image';
import style from './Cabecalho.module.css';
import nomeMostra from '../../assets/mostra2026/nome-mostra.svg';
import { dataCurta } from '../../dados/mostra';

// Topo das telas internas: "MOSTRA COMPETITIVA" + nome do festival e, opcionalmente, a data da sessão.
export function Cabecalho({ sessao, mostrarData = true }) {
  const data = sessao ? dataCurta(sessao) : null;

  return (
    <header className={style.cabecalho}>
      <div className={style.linha}>
        <p className={style.mostra}>
          MOSTRA
          <br />
          COMPETITIVA
        </p>
        <Image src={nomeMostra} alt="13ª Mostra de Cinema de Gostoso" className={style.nome} priority />
      </div>

      {mostrarData && data && (
        <p className={style.data}>
          <strong>{data.diaMes}</strong> {data.diaSemana}
        </p>
      )}
    </header>
  );
}
