"use client";

import { useEffect } from 'react';
import style from "./page.module.css";
import MovieCard from "../components/moviecard/moviecard";
import filme1 from '../assets/filme1.webp';
import filme2 from '../assets/filme2.webp';
import filme3 from '../assets/filme3.webp';

export default function VoteList() {

  // useEffect(() => {
  //    Limpa o localStorage ao carregar a tela inicial
  //   localStorage.removeItem('votos');
  // }, []);

  return (
    <>
      <header className={style.title}>
        <h1>Faça seu voto</h1>
      </header>
      <main>
        <MovieCard
          title1={"O DIA QUE TE CONHECI"}
          description1={"FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"}
          filme1={filme1}
          title2={"ESTRANHO CAMINHO"}
          description2={"FICÇÃO, 83 MIN, CE, 2023, 12 ANOS DIREÇÃO: GUTO PARENTE"}
          filme2={filme2}
          title3={"QUANDO EU ME ENCONTRAR"}
          description3={"FICÇÃO, 77 MIN, CE, 2023, 10 ANOS DIREÇÃO: AMANDA PONTES E MICHELLINE HELENA"}
          filme3={filme3}
        />
      </main>
    </>
  );
}
