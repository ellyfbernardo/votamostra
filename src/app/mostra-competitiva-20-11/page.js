"use client";

import style from "./page.module.css";
import MovieCard from "../components/moviecard20/moviecard";
import filme1 from '../assets/dia dos pais.png';
import filme2 from '../assets/a natureza das coisas invisiveis.png';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main className={style.main}>

        <MovieCard
          title1={"DIA DOS PAIS"}
          subdescription1={"FICÇÃO, 19 MIN, AM, 2025, 14 ANOS"}
          description1={"Direção: Bernardo Ale Abinader"}
          filme1={filme1}
          sinopse1={"Em um futuro próximo, numa Manaus coberta pela fumaça das queimadas da floresta amazônica, pai e filho não conseguem se entender."}

          
          title2={"A NATUREZA DAS COISAS INVISÍVEIS"}
          subdescription2={"FICÇÃO, 90 MIN, DF, 2025, 12 ANOS"}
          description2={"Direção: Rafaela Camelo"}
          filme2={filme2}
          sinopse2={" Durante as férias de verão, duas meninas de dez anos se conhecem em um hospital e criam um vínculo inesperado. A conexão as leva a uma jornada agridoce de despedidas e de grandes descobertas sobre a vida."}
        />

      </main>
      </div>
    
  );
}
