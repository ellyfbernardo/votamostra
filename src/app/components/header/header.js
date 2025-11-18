"use client";

import { useEffect, useState } from 'react';
import style from './header.module.css';
import Image from 'next/image';
import art from '../../assets/mostra2025/PEIXE 2 1.png';
import stars from '../../assets/mostra2025/ESTRELAS 1.png'
import logo from '../../assets/mostra2025/12MCG_Logo.svg';

export function Header() {
  const [diaSemana, setDiaSemana] = useState('');
  const [diaMes, setDiaMes] = useState('');

  useEffect(() => {
    const diasSemana = ['DOMINGO', 'SEGUNDA-FEIRA', 'TERÇA-FEIRA', 'QUARTA-FEIRA', 'QUINTA-FEIRA', 'SEXTA-FEIRA', 'SÁBADO'];
    const dataAtual = new Date();

    // Define o dia da semana (ex: SEGUNDA-FEIRA)
    const diaAtualSemana = diasSemana[dataAtual.getDay()];
    setDiaSemana(diaAtualSemana);

    // Define o dia do mês (ex: 25)
    setDiaMes(dataAtual.getDate());
  }, []);

  return (
    <header className={`${style.title}`}>
      <Image src={art} className={style.art} alt="#" />
      <Image src={stars} className={style.stars} alt="#" />
 
      <Image src={logo} className={style.logo} alt="#" />

      <div className={style.date_container}>
        <h1 className={style.mostra}>MOSTRA COMPETITIVA</h1>
        <div className={style.date}>
          <h1 className={style.dia}>{diaMes}</h1>  {/* Atualizado dinamicamente */}
          <h2 className={style.mes}>NOV</h2>
          <h1 className={style.dia}>2024</h1>
        </div>
      </div>

      <p className={style.diasemana}>{diaSemana}</p>
    </header>
  );
}
