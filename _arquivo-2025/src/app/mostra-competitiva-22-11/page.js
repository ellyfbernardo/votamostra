"use client";

import style from "./page.module.css";
import MovieCard22 from "../components/moviecard22/moviecard22";
import filme1 from '../assets/filmes-22-11/laudelina.jpg';
import filme2 from '../assets/filmes-22-11/cais.jpg';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main className={style.main}>

        <MovieCard22
          title1={"LAUDELINA E A FELICIDADE GUERREIRA"}
          subdescription1={"DOCUMENTÁRIO, 15MIN, RJ, 2025, LIVRE"}
          description1={"DIREÇÃO: MILENA MANFREDINI"}
          filme1={filme1}
          sinopse1={"Um retrato sensível de Laudelina de Campos Mello, ativista negra que teceu, com coragem e palavra, a luta das trabalhadoras domésticas do Brasil. Um filme sobre legado, força coletiva e memória."}

          
          title2={"CAIS"}
          subdescription2={"DOCUMENTÁRIO, 68MIN, BA, 2025, LIVRE"}
          description2={"DIREÇÃO: SAFIRA MOREIRA"}
          filme2={filme2}
          sinopse2={"Dois meses após o falecimento de sua mãe Angélica, Safira viaja em busca de encontrá-la em outras paisagens. Num curso fluvial, o filme percorre cidades banhadas pelo Rio Paraguaçu (Bahia) e pelo Rio Alegre (Maranhão), para imergir em novas perspectivas sobre memória, tempo, nascimento, vida e morte."}


        />

      </main>
      </div>
    
  );
}
