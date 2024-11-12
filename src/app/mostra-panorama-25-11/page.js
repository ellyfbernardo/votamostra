"use client";

import style from "./page.module.css";
import MovieCard25 from "../components/moviecard25/moviecard25";
import filme1 from '../assets/YBY KATU.jpg';
import filme2 from '../assets/CHIBO.png';
import filme3 from '../assets/RAPOSA.jpg';
import filme4 from '../assets/PEQUENAS INSURREIÇÕES.png';
import filme5 from '../assets/MANAS.jpg';
import Image from 'next/image';

import { Header } from "../components/header/header";

export default function VoteList() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main>

        <MovieCard25
          title1={"YBY KATU"}
          subdescription1={"FICÇÃO, 18 MIN, RN, 2024, LIVRE"}
          description1={"Direção: Kaylany Cordeiro, Jessé Carlos, Ladivan Soares, Geyson Fernandes e Rodrigo Sena"}
          filme1={filme1}
          sinopse1={"Enquanto os indígenas do Katu vivenciam mais um dia de suas jornadas, Fernanda enfrenta os mesmos problemas na escola."}

          
          title2={"CHIBO"}
          subdescription2={"DOCUMENTÁRIO, 18 MIN, RS, 2024, 10 ANOS"}
          description2={"Direção: Gabriela Poester e Henrique Lahude"}
          filme2={filme2}
          sinopse2={"Na fronteira entre Brasil e Argentina, uma família vive às margens do rio Uruguai e trabalha com chibo - travessia clandestina de mercadorias para subsistência, comércio e pessoas. Dani, a filha mais velha, está prestes a concluir o ensino médio e enfrenta as decisões dessa fase da vida."}

          title3={"RAPOSA"}
          description3={"Direção: Margot Leitão e João Fontenele"}
          subdescription3={"FICÇÃO, 15 MIN, CE, 2024, 14 ANOS"}
          filme3={filme3}
          sinopse3={"Em uma pequena casa do interior do Ceará, mora Raposa, uma mulher de jeito peculiar que chama atenção de Lelé, um diarista que trabalha na casa ao lado. A relação entre os dois muda a partir de sons estranhos vindos da casa de Raposa."}

          title4={"PEQUENAS INSURREIÇÕES"}
          subdescription4={"FICÇÃO, 13 MIN, PR, 2023, LIVRE"}
          description4={"Direção: William de Oliveira"}
          filme4={filme4}
          sinopse4={"Em uma sala de espera de uma agência de babás, um grupo de mulheres decide firmar um pacto."}

          title5={"MANAS"}
          subdescription5={"FICÇÃO, 101 MIN, PE, 2024, 14 ANOS"}
          description5={"Direção: Marianna Brennand"}
          filme5={filme5}
          sinopse5={"Marcielle, jovem de 13 anos que vive na Ilha do Marajó (PA), começa a entender que o futuro não lhe reserva muitas opções. Encurralada pela resignação da mãe e movida pela idealização da irmã que partiu, decide confrontar a engrenagem violenta que rege sua família e as mulheres da comunidade."}
        />

      </main>
      </div>
    
  );
}
