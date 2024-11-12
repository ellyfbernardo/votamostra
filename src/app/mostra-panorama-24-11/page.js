"use client";

import style from "./page.module.css";
import MovieCard24 from "../components/moviecard24/moviecard24";
import filme1 from '../assets/BATI DA VILA.png';
import filme2 from '../assets/HOJE EU SÓ VOLTO AMANHA.jpg';
import filme3 from '../assets/CALUIM.png';
import filme4 from '../assets/AXE MEU AMOR.jpg';
import filme5 from '../assets/KASA BRANCA.jpeg';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main>

        <MovieCard24
          title1={"BATI DA VILA"}
          subdescription1={"DOCUMENTÁRIO, 13 MIN, RN, 2024  LIVRE"}
          description1={"Direção: Raquel Cardozo"}
          filme1={filme1}
          sinopse1={`"Bati da Vila: memórias que azeitam uma tradição" traça o conhecimento de Dona Nicinha e das famílias mais antigas da Vila de Ponta Negra, mostrando o processo e a importância da produção do azeite do Bati, valorizando a memória e o conhecimento ancestral da cidade de Natal (RN).`}

          
          title2={"HOJE EU SÓ VOLTO AMANHÃ"}
          subdescription2={"ANIMAÇÃO, 24 MIN, PE, 2024, 12 ANOS"}
          description2={"Direção: Diego Lacerda"}
          filme2={filme2}
          sinopse2={"Nas ladeiras de Olinda, Marina busca o êxtase carnavalesco. Seu trajeto é visto através dos olhos de dez personagens diferentes e para cada um deles um(a) diretor(a) empresta seu olhar artístico. Mas no meio de tanta gente, como encontrar o Carnaval?"}

          title3={"CALUIM"}
          subdescription3={"FICÇÃO, 11 MIN, BA, 2023, LIVRE"}
          description3={"Direção: Marcos Alexandre"}
          filme3={filme3}
          sinopse3={"Uma atriz negra recebe um tratamento bem peculiar em um set de filmagem composto por uma equipe branca."}

          title4={"AXÉ MEU AMOR"}
          subdescription4={"FICÇÃO, 18 MIN, PB, 2024, LIVRE"}
          description4={"Direção: Thiago Costa"}
          filme4={filme4}
          sinopse4={"Mãe Bené acorda de um pesadelo e descobre que a vida de sua mãe de santo está por um fio. Em um jogo de búzios descobre que tem que fazer sua última obrigação de 21 anos de santo. Antes que o pior aconteça, embarca numa viagem em busca do seu sagrado."}

          title5={"KASA BRANCA"}
          subdescription5={"FICÇÃO, 95 MIN, RJ, 2024, 12 ANOS"}
          description5={"Direção: Luciano Vidigal"}
          filme5={filme5}
          sinopse5={"Dé é um adolescente negro da periferia da Chatuba, Rio de Janeiro, que recebe a notícia de que sua avó, Almerinda, está na fase terminal da doença de Alzheimer. Ele tem a ajuda de seus dois melhores amigos, Adrianin e Matins, para enfrentar o mundo e aproveitar os últimos dias de vida com ela."}
        />

      </main>
      </div>
    
  );
}
