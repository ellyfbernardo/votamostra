"use client";

import style from "./page.module.css";
import MovieCard from "../components/moviecard20/moviecard";
import filme1 from '../assets/filmes-21-11/pupa.jpg';
import filme2 from '../assets/filmes-21-11/pupa.jpg';
import filme3 from '../assets/filmes-21-11/pupa.jpg';
import filme4 from '../assets/filmes-21-11/pupa.jpg';
import filme5 from '../assets/filmes-21-11/pupa.jpg';
import { Header } from "../components/header/header";

export default function VoteList21() {


  return (
    
    <div className={style.body}>
      <Header/>
      <main className={style.main}>

        <MovieCard
          title1={"PUPÁ"}
          subdescription1={"DOCUMENTÁRIO, 14 MIN, RN, 2024, LIVRE"}
          description1={"DIREÇÃO: OSANI"}
          filme1={filme1}
          sinopse1={"Pupá mora em Acari/RN, onde sua presença originária marcante é sinônimo de alegria e liberdade. No dia a dia, se divide entre trabalhos domésticos, o ofício de cambista e a criação de lambedores, aos finais de semana ela deixa os afazeres e encontra nas serestas e rios o espaço onde reafirma o direito de viver sua autonomia."}

          
          title2={"BUENOSAIRES"}
          subdescription2={"DOCUMENTÁRIO, 70 MIN, PE, 2025, 12 ANOS"}
          description2={"DIREÇÃO: TUCA SIQUEIRA"}
          filme2={filme2}
          sinopse2={"Buenos Aires é uma pequena cidade brasileira que tem o mesmo nome da capital da Argentina. Seus moradores celebram essa coincidência nominal com a criação de vínculos afetivos manifestados no futebol e na cultura durante a última COPA do Mundo."}


          title3={"PRESÉPIO"}
          subdescription3={"FICÇÃO, 18MIN, RJ, 2025, 12 ANOS"}
          description3={"DIREÇÃO: FELIPE BIBIAN"}
          filme3={filme3}
          sinopse3={"No natal, Dejair tenta convencer sua família do absurdo que é dar uma arma para uma criança."}
          
          title4={"QUEIMANDO POR DENTRO"}
          subdescription4={"FICÇÃO, 16MIN, PE, 2024, LIVRE"}
          description4={"DIREÇÃO: ENOCK CARVALHO E MATHEUS FARIAS"}
          filme4={filme4}
          sinopse4={"Nascido em uma família evangélica, Samuel cresceu em uma religião que ganhou influência no Brasil nas últimas décadas. Enquanto começa a abraçar sua identidade queer, seu mundo é abalado quando seu pai, de forma abrupta, o proíbe de dançar na igreja. Um ponto de virada em sua vida é iminente."}

          title5={"MORTE E VIDA MADALENA"}
          subdescription5={"FICÇÃO, 85 MIN, CE, 2025, 14 ANOS"}
          description5={"DIREÇÃO: GUTO PARENTE"}
          filme5={filme5}
          sinopse5={"Madalena é uma produtora de cinema tendo que lidar ao mesmo tempo com a morte recente do pai, sua gravidez de 8 meses e aprodução de uma ficção científica B onde tudo parece dar errado."}
        />

      </main>
      </div>
    
  );
}
