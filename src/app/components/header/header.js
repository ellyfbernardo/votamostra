"use client";

import { useEffect, useState } from 'react';
import style from './header.module.css';
import Image from 'next/image';
import art from '../../assets/Coral.svg';
import luneta1 from '../../assets/Luneta 1.png';
import luneta2 from '../../assets/Luneta 2.png';
import flor from '../../assets/Flor.png';
import logo from '../../assets/Mostra SMG - Logo 2024_Preto-01 1.svg';

export function Header() {
  const [diaSemana, setDiaSemana] = useState('');

  useEffect(() => {
    const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO'];
    const dataAtual = new Date();
    const diaAtualSemana = diasSemana[dataAtual.getDay()];
    setDiaSemana(diaAtualSemana);
  }, []);

  return (
    <header className={`${style.title}`}>
      <Image src={art} className={style.art} alt="#" />
      <Image src={luneta1} className={style.luneta1} alt="#" />
      <Image src={luneta2} className={style.luneta2} alt="#" />
      <Image src={flor} className={style.flor} alt="#" />
      <Image src={logo} className={style.logo} alt="#" />

      <div className={style.date_container}>
        <h1 className={style.mostra}>MOSTRA COMPETITIVA</h1>
        <div className={style.date}>
          <h1 className={style.dia}>23</h1>
          <h2 className={style.mes}>NOV</h2>
          <h1 className={style.dia}>2024</h1>
        </div>
      </div>

      <p className={style.diasemana}>{diaSemana} </p>
    </header>
  );
}
