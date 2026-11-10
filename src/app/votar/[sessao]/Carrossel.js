'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from './Carrossel.module.css';
import { Tela } from '../../components/Tela/Tela';
import { Cabecalho } from '../../components/Cabecalho/Cabecalho';
import { BotoesNota } from '../../components/BotoesNota/BotoesNota';
import { buscarSessao, infoFilme } from '../../dados/mostra';
import { lerVotos, salvarVotos } from '../../lib/votosLocais';
import olhoFlor from '../../assets/mostra2026/olho-flor.svg';

// Tela 2: um card por filme, passando para o lado.
export function Carrossel({ sessaoId }) {
  const sessao = buscarSessao(sessaoId);
  const filmes = sessao.filmes;
  const total = filmes.length;

  const router = useRouter();
  const trilhoRef = useRef(null);
  const [indice, setIndice] = useState(0);
  const [votos, setVotos] = useState({});

  useEffect(() => {
    setVotos(lerVotos(sessaoId));
  }, [sessaoId]);

  const irPara = (i) => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const destino = Math.max(0, Math.min(total - 1, i));
    trilho.scrollTo({ left: destino * trilho.clientWidth, behavior: 'smooth' });
  };

  // Atualiza o indicador conforme a pessoa arrasta o carrossel
  const aoRolar = () => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const atual = Math.round(trilho.scrollLeft / trilho.clientWidth);
    if (atual !== indice) setIndice(atual);
  };

  const votar = (filmeId, nota, posicao) => {
    const novos = { ...votos };
    if (novos[filmeId] === nota) {
      delete novos[filmeId]; // tocar de novo na mesma nota desmarca
    } else {
      novos[filmeId] = nota;
      // Avança sozinho para o próximo filme
      if (posicao < total - 1) setTimeout(() => irPara(posicao + 1), 350);
    }
    setVotos(novos);
    salvarVotos(sessaoId, novos);
  };

  const temVoto = Object.keys(votos).length > 0;

  return (
    <Tela>
      <Cabecalho sessao={sessao} />

      <section className={style.carrossel} aria-roledescription="carrossel" aria-label="Filmes da sessão">
        <div className={style.trilho} ref={trilhoRef} onScroll={aoRolar}>
          {filmes.map((filme, i) => (
            <article
              key={filme.id}
              className={style.slide}
              aria-roledescription="slide"
              aria-label={`Filme ${i + 1} de ${total}`}
            >
              <div className={style.card}>
                <span className={style.selo}>
                  Filme {i + 1}/{total}
                </span>

                <div className={style.imagem}>
                  {filme.imagem ? (
                    <Image src={filme.imagem} alt={`Cena de ${filme.titulo}`} fill sizes="(max-width: 480px) 90vw, 430px" />
                  ) : (
                    <Image src={olhoFlor} alt="" className={style.semImagem} />
                  )}
                </div>

                <h2 className={style.titulo}>{filme.titulo}</h2>
                <p className={style.info}>{infoFilme(filme)}</p>
                <p className={style.direcao}>
                  Direção <strong>{filme.direcao}</strong>
                  {filme.codirecao && (
                    <>
                      {' '}
                      · Co-direção <strong>{filme.codirecao}</strong>
                    </>
                  )}
                </p>
                <p className={style.sinopse}>{filme.sinopse}</p>

                <BotoesNota
                  nome={filme.titulo}
                  valor={votos[filme.id]}
                  aoEscolher={(nota) => votar(filme.id, nota, i)}
                />
              </div>
            </article>
          ))}
        </div>

        {indice > 0 && (
          <button type="button" className={`${style.seta} ${style.anterior}`} onClick={() => irPara(indice - 1)} aria-label="Filme anterior">
            <Seta />
          </button>
        )}
        {indice < total - 1 && (
          <button type="button" className={`${style.seta} ${style.proxima}`} onClick={() => irPara(indice + 1)} aria-label="Próximo filme">
            <Seta />
          </button>
        )}
      </section>

      {total > 1 && (
        <div className={style.pontos}>
          {filmes.map((filme, i) => (
            <button
              key={filme.id}
              type="button"
              className={`${style.ponto} ${i === indice ? style.pontoAtivo : ''}`}
              onClick={() => irPara(i)}
              aria-label={`Ir para o filme ${i + 1}`}
              aria-current={i === indice}
            />
          ))}
        </div>
      )}

      <footer className={style.rodape}>
        <button
          type="button"
          className="btn-verde"
          disabled={!temVoto}
          onClick={() => router.push(`/votar/${sessaoId}/confirmar`)}
        >
          FINALIZAR
        </button>
        {!temVoto && <p className={style.dica}>Dê uma nota a pelo menos um filme</p>}
      </footer>
    </Tela>
  );
}

function Seta() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
