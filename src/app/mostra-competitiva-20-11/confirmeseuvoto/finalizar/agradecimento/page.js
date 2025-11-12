import style from "./agradecimento.module.css";
import Image from "next/image";
import logo from '../../../../assets/mostra2025/logo-2025-branco.png'
import manganga from '../../../../assets/mostra2025/BICHAO 2 1.png'


import Link from "next/link";

export default function Agradecimento(){
     return(


          <main className={style.container}>
          
               {/* <Image src={lateral} alt='' className={style.lateral}/>
               <Image src={laterald} alt='' className={style.laterald}/>
               <Image src={flor} alt='' className={style.flor}/> */}
               <Image src={logo} alt='' className={style.logo}/>
               <Image src={manganga} alt='' className={style.manganga}/>


               <div className={style.text}> 
                    <h1 className={style.title}>SUA VOTAÇÃO FOI</h1>
                    <h2 className={style.subtitle}>CONFIRMADA!</h2>
               </div>

               <Link href={'/'} className={style.button}>INÍCIO</Link>
          </main>


     )
}