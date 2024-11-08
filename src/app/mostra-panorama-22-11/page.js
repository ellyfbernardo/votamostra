"use client";

import style from "./page.module.css";
import MovieCard from "../components/moviecard/moviecard";
import filme1 from '../assets/TIJOLO POR TIJOLO.png';
import filme2 from '../assets/O DESERTO DE AKIN.jpg';
import filme3 from '../assets/filme3.webp';
import Image from 'next/image';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main>

        <MovieCard
          title1={"TIJOLO POR TIJOLO"}
          subdescription1={"DOCUMENTÁRIO, 103 MIN, PE, 2024, LIVRE"}
          description1={"DIREÇÃO: VICTÓRIA ÁLVARES E QUENTIN DELAROCHE"}
          filme1={filme1}
          sinopse1={"Durante a pandemia, Cris perdeu seu emprego e sua casa, devido a um risco de desabamento. Grávida do seu quarto filho e em busca de uma laqueadura, ela trabalha como micro-influenciadora digital, enquanto tenta reconstruir a casa e reestruturar a vida."}

          
          title2={"O DESERTO DE AKIN"}
          subdescription2={"FICÇÃO, 78 MIN, ES, 2024, 12 ANOS"}
          description2={" DIREÇÃO: BERNARD LESSA"}
          filme2={filme2}
          sinopse2={"Akin é um dos médicos cubanos trabalhando no Brasil em 2018. Com as eleições, a cooperação entre o Brasil e Cuba chega ao fim. Os médicos são convocados a retornar ao seu país de origem. Akin está em uma encruzilhada. Voltar para Cuba ou se estabelecer no Brasil?"}

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
