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
                      <h1 className={style.dia}>24</h1>
                      <h2 className={style.mes}>NOV</h2>
                      <h1 className={style.dia}>2024</h1>
          </div>
          <p className={style.diasemana}>DOMINGO</p>

        </header>
        
        <main className={style.container}>



          {!votos ? (
            <p className={style.paragraph}>Carregando votos...</p>
          ) : (
            <div className={style.body2}>
              {votos?.filme1 && (
                <Prevote
                  title="BATI DA VILA"
                  description="DOCUMENTÁRIO, 13 MIN, RN, 2024  LIVRE"
                  direction={"DIREÇÃO: Raquel Cardozo"}
                  vote={votos?.filme1}
                  
                />
              )}

              {votos?.filme2 && (
                <Prevote
                  title="HOJE EU SÓ VOLTO AMANHÃ"
                  description="ANIMAÇÃO, 24 MIN, PE, 2024, 12 ANOS"
                  direction={"DIREÇÃO: Diego Lacerda"}
                  vote={votos?.filme2}
                  
                />
              )}

              {votos?.filme3 && (
                <Prevote
                  title="CALUIM"
                  description="FICÇÃO, 11 MIN, BA, 2023, LIVRE"
                  direction={"DIREÇÃO: Marcos Alexandre"}
                  vote={votos?.filme3}
                  
                />
              )}

              {votos?.filme4 && (
                <Prevote
                  title="AXÉ MEU AMOR"
                  description="FICÇÃO, 18 MIN, PB, 2024, LIVRE"
                  direction={"DIREÇÃO: Thiago Costa"}
                  vote={votos?.filme4}
                  
                />
              )}

              {votos?.filme5 && (
                <Prevote
                  title="KASA BRANCA"
                  description="FICÇÃO, 95 MIN, RJ, 2024, 12 ANOS"
                  direction={"DIREÇÃO: Luciano Vidigal"}
                  vote={votos?.filme5}
                  
                />
              )}

                        <footer className={style.footer}>

          {(votos?.filme1 || votos?.filme2 || votos?.filme3 || votos?.filme4 || votos?.filme5) && (
              <Link className={style.button} href="/mostra-panorama-24-11/confirmeseuvoto/finalizar">
                CONFIRMAR
              </Link>
            )}
          
            <Link className={style.button2} href="/mostra-panorama-24-11">
              REVISAR VOTOS
            </Link>

            
          </footer>  
            </div>
          )}
        </main>


        </div>
     
  );
}
