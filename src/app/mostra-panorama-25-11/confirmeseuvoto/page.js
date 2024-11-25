"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/Mostra SMG - Logo 2024_Preto-01 1.svg'
export default function Confirmeseuvoto() {
  const [votos, setVotos] = useState(null);

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, []);

  return (

    
      <div className={style.body}>
        
      
        <header className={style.header}>
          <Image src={logo} className={style.logo} alt=''/>

          <h1 className={style.title}>CONFIRME SEUS VOTOS</h1>
          
          <h2 className={style.h2}>MOSTRA COMPETITIVA</h2>

          <div className={style.date}>
                      <h1 className={style.dia}>25</h1>
                      <h2 className={style.mes}>NOV</h2>
                      <h1 className={style.dia}>2024</h1>
          </div>
          <p className={style.diasemana}>SEGUNDA-FEIRA</p>

        </header>
        
        <main className={style.container}>



          {!votos ? (
            <p className={style.paragraph}>Carregando votos...</p>
          ) : (
            <div className={style.body2}>
              {votos?.filme1 && (
                <Prevote
                  title="YBY KATU"
                  description="FICÇÃO, 18 MIN, RN, 2024, LIVRE"
                  direction={"DIREÇÃO: Kaylany Cordeiro, Jessé Carlos, Ladivan Soares, Geyson Fernandes e Rodrigo Sena"}
                  vote={votos?.filme1}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="CHIBO"
                  description="DOCUMENTÁRIO, 18 MIN, RS, 2024, 10 ANOS"
                  direction={"DIREÇÃO: Gabriela Poester e Henrique Lahude"}
                  vote={votos?.filme2}
                  
                />
              )}

              {votos?.filme3 && (
                <Prevote
                  title="RAPOSA"
                  description="FICÇÃO, 15 MIN, CE, 2024, 14 ANOS"
                  direction={"DIREÇÃO: Margot Leitão e João Fontenele"}
                  vote={votos?.filme3}
                  
                />
              )}

              {votos?.filme4 && (
                <Prevote
                  title="PEQUENAS INSURREIÇÕES"
                  description="FICÇÃO, 13 MIN, PR, 2023, LIVRE "
                  direction={"DIREÇÃO: William de Oliveira"}
                  vote={votos?.filme4}
                  
                />
              )}

              {votos?.filme5 && (
                <Prevote
                  title="RAPOSA"
                  description="FICÇÃO, 101 MIN, PE, 2024, 14 ANOS"
                  direction={"DIREÇÃO: Marianna Brennand"}
                  vote={votos?.filme5}
                  
                />
              )}

            <footer className={style.footer}>

            {(votos?.filme1 || votos?.filme2 || votos?.filme3 || votos?.filme4 || votos?.filme5) && (
                <Link className={style.button} href="/mostra-panorama-25-11/confirmeseuvoto/finalizar">
                  CONFIRMAR
                </Link>
              )}

              <Link className={style.button2} href="/mostra-panorama-25-11">
                REVISAR VOTOS
              </Link>
            </footer>
            </div>
          )}



        </main>

           
        </div>
     
  );
}
