"use client";

import style from './confirmeseuvoto.module.css';
import { useEffect, useState } from 'react';
import { Prevote } from '@/app/components/prevote/prevote';
import Link from 'next/link';
import filmepng1 from '../../assets/filme1.webp';
import filmepng2 from '../../assets/filme2.webp';
import filmepng3 from '../../assets/filme3.webp';

export default function Confirmeseuvoto() {
  const [votos, setVotos] = useState(null);

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, []);

  return (
    <>
      <main>
        <h2 className={style.title}>REVISE SEU VOTO</h2>
        {!votos ? (
          <p className={style.paragraph}>Carregando votos...</p>
        ) : (
          <>
            {votos?.filme1 && (
              <Prevote
                title="O DIA QUE TE CONHECI"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme1}
                foto={filmepng1}
              />
            )}

            {votos?.filme2 && (
              <Prevote
                title="ESTRANHO CAMINHO"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme2}
                foto={filmepng2}
              />
            )}

            {votos?.filme3 && (
              <Prevote
                title="QUANDO EU ME ENCONTRAR"
                description="FICÇÃO, 70MIN, MG, 2023, 14 ANOS DIREÇÃO ANDRÉ NOVAIS OLIVEIRA"
                vote={votos?.filme3}
                foto={filmepng3}
              />
            )}
          </>
        )}

        <footer className={style.footer}>
          <Link className={style.button} href="/mostra-panorama-22-11">
            EDITAR VOTO
          </Link>

          {(votos?.filme1 || votos?.filme2 || votos?.filme3) && (
            <Link className={style.button} href="/mostra-panorama-22-11/confirmeseuvoto/finalizar">
              CONTINUAR
            </Link>
          )}
        </footer>
      </main>
    </>
  );
}
