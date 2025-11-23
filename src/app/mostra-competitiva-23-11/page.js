"use client";

import style from "./page.module.css";
import MovieCard23 from "../components/moviecard23/moviecard23";
import filme1 from '../assets/filmes-23-11/nave.png';
import filme2 from '../assets/filmes-23-11/ressonancia.png';
import filme3 from '../assets/filmes-23-11/naoentraluz.png';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main className={style.main}>

        <MovieCard23
          title1={"A NAVE QUE NUNCA POUSA"}
          subdescription1={"DOCUMENTÁRIO, 15MIN, PB, 2025, 10 ANOS"}
          description1={"DIREÇÃO: ELLEN MORAIS"}
          filme1={filme1}
          sinopse1={"Uma nave paira sobre uma comunidadequilombola no sertão da Paraíba. Os moradores locais precisam lidar com as consequências desse acontecimento. Uma ficção científica documental nas terras de Aruanda."}

          
          title2={"RESSONÂNCIA"}
          subdescription2={"FICÇÃO, 20MIN, RN, 2025, LIVRE"}
          description2={"DIREÇÃO: ANNA ZÊPA"}
          filme2={filme2}
          sinopse2={"O desejo de liberdade ainda ressoa em Margarida e a ideia de ficar presa em uma rotina cotidiana a deixa sufocada."}

          title3={"AQUI NÃO ENTRA LUZ"}
          subdescription3={"DOCUMENTÁRIO, 78MIN, MG, 2025, LIVRE"}
          description3={"DIREÇÃO: KAROL MAIA"}
          filme3={filme3}
          sinopse3={"Entre memórias pessoais e pesquisas históricas, uma cineasta, filha de uma trabalhadora doméstica, percorre o Brasil procurando rastros da escravidão na arquitetura. No caminho, encontra outras mulheres que enfrentam o mesmo legado."}
        />

      </main>
      </div>
    
  );
}
