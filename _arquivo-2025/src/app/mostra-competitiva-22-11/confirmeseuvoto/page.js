"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/mostra2025/12MCG_Logo.svg';
import stars from '../../assets/mostra2025/ESTRELAS 1.png';
import snake from '../../assets/mostra2025/SEREIA.png';
import waves from '../../assets/mostra2025/ONDAS 2.png';



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
          

          <h1 className={style.title}>CONFIRME SEUS VOTOS</h1>
          
          <h2 className={style.h2}>MOSTRA COMPETITIVA</h2>

          <div className={style.date}>
                      <h1 className={style.dia}>22</h1>
                      <h2 className={style.mes}>NOV</h2>
                      <h1 className={style.dia}>2025</h1>
          </div>
          <p className={style.diasemana}>SÁBADO</p>

        </header>


          <Image src={stars} className={style.stars} alt=''/>
          <Image src={logo} className={style.logo} alt=''/>
        
      
        
        <main className={style.container}>



          {!votos ? (
            <p className={style.paragraph}>Carregando votos...</p>
          ) : (
            <div className={style.movies}>
              {votos?.filme1 && (
                <Prevote
                  title="LAUDELINA E A FELICIDADE GUERREIRA"
                  description="DOCUMENTÁRIO, 15MIN, RJ, 2025, LIVRE"
                  vote={votos?.filme1}
                  direction={"DIREÇÃO: MILENA MANFREDINI"}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="CAIS"
                  description="DOCUMENTÁRIO, 68MIN, BA, 2025, LIVRE"
                  vote={votos?.filme2}
                  direction={"DIREÇÃO: SAFIRA MOREIRA"}
                  
                />
              )}

            </div>
          )}
        </main>

          <footer className={style.footer}>

          {(votos?.filme1 || votos?.filme2) && (
              <Link className={style.button} href="/mostra-competitiva-22-11/confirmeseuvoto/finalizar">
                CONFIRMAR
              </Link>
            )}
          
            <Link className={style.button2} href="/mostra-competitiva-22-11">
              REVISAR VOTOS
            </Link>
          <Image src={snake} className={style.snake} alt=''/>
          <Image src={waves} className={style.waves} alt=''/>
            
          </footer>

        

        
        </div>
     
  );
}
