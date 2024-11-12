import style from "./agradecimento.module.css";
import lateral from '../../../../assets/lateral1.png';
import laterald from '../../../../assets/lateralDpng.png';
import Image from "next/image";
import logo from '../../../../assets/Mostra SMG - Logo 2024_Preto-01 1.svg'
import flor from '../../../../assets/Flor.svg';

import Link from "next/link";

export default function Agradecimento(){
     return(


          <main className={style.container}>
          
               <Image src={lateral} alt='' className={style.lateral}/>
               <Image src={laterald} alt='' className={style.laterald}/>
               <Image src={logo} alt='' className={style.logo}/>
               <Image src={flor} alt='' className={style.flor}/>


               <div className={style.text}> 
                    <h1 className={style.title}>SUA VOTAÇÃO FOI</h1>
                    <h2 className={style.subtitle}>CONFIRMADA!</h2>
               </div>

               <Link href={'/'} className={style.button}>ÍNICIO</Link>
          </main>


     )
}