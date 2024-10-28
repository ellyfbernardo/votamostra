"use client";

import style from "./page.module.css";
import MovieCard from "../components/moviecard/moviecard";
import filme1 from '../assets/filme1.webp';
import filme2 from '../assets/filme2.webp';
import filme3 from '../assets/filme3.webp';
import Image from 'next/image';
import fundor from '../assets/fundo direita.png';
import fundol from '../assets/fundo esquerda.png';

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <header className={style.title}>
        <h1 className={style.dia}>22</h1>
        <h2 className={style.mes}>nov</h2>
        <h1 className={style.mostra}>MOSTRA COMPETITIVA</h1>
        <p className={style.diasemana}>Sexta-feira</p>
      </header>
      <main>
      <Image src={fundol} className={style.fundol}/>

      <Image src={fundor} className={style.fundor}/>
        <MovieCard
          title1={"O DIA QUE TE CONHECI"}
          description1={"DIREÇÃO: ANDRÉ NOVAIS OLIVEIRA"}
          subdescription1={"FICÇÃO, 70MIN, MG, 2023, 14 ANOS"}
          filme1={filme1}
          sinopse1={"Zeca tenta levantar cedo para pegar o ônibus e chegar na escola da cidade vizinha, onde trabalha como bibliotecário. Acordar cedo anda cada vez mais difícil, mas um dia ele conhece Luísa e tudo muda em sua vida."}

          
          title2={"ESTRANHO CAMINHO"}
          description2={" DIREÇÃO: GUTO PARENTE"}
          subdescription2={"FICÇÃO, 83 MIN, CE, 2023, 12 ANOS"}
          filme2={filme2}
          sinopse2={"Zeca tenta levantar cedo para pegar o ônibus e chegar na escola da cidade vizinha, onde trabalha como bibliotecário. Acordar cedo anda cada vez mais difícil, mas um dia ele conhece Luísa e tudo muda em sua vida."}

          title3={"QUANDO EU ME ENCONTRAR"}
          description3={"DIREÇÃO: AMANDA PONTES E MICHELLINE HELENA"}
          subdescription3={"FICÇÃO, 77 MIN, CE, 2023, 10 ANOS"}
          filme3={filme3}
          sinopse3={"Zeca tenta levantar cedo para pegar o ônibus e chegar na escola da cidade vizinha, onde trabalha como bibliotecário. Acordar cedo anda cada vez mais difícil, mas um dia ele conhece Luísa e tudo muda em sua vida."}
        />

      </main>
      </div>
    
  );
}
