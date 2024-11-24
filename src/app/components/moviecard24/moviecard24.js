"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from './moviecard.module.css';

const MovieCard24 = (props) => {
  const [votos, setVotos] = useState({
    filme1: null,
    filme2: null,
    filme3: null,
    filme4: null,
    filme5: null,
  });

  const cardRefs = {
    filme1: useRef(null),
    filme2: useRef(null),
    filme3: useRef(null),
    filme4: useRef(null),
    filme5: useRef(null),
  };





  const router = useRouter();

  useEffect(() => {
    const votosArmazenados = localStorage.getItem('votos');
    if (votosArmazenados) {
      setVotos(JSON.parse(votosArmazenados));
    }
  }, [router.asPath]); // Atualiza o estado sempre que o caminho mudar

  const handleVote = (topico, voto) => {
    const novosVotos = {
      ...votos,
      [topico]: votos[topico] === voto ? null : voto,
    };
    setVotos(novosVotos);
    localStorage.setItem('votos', JSON.stringify(novosVotos));

        // Move para o próximo card após o voto
        const topicos = Object.keys(cardRefs);
        const currentIndex = topicos.indexOf(topico);
        const nextIndex = currentIndex + 1;
    
        if (nextIndex < topicos.length) {
          const nextCard = cardRefs[topicos[nextIndex]].current;
          
          if (nextCard) {
            const isMobile = window.innerWidth <= 768;
            console.log("Rodando em Mobile?", isMobile);
    
            // Tenta rolar o card para o próximo
            nextCard.scrollIntoView({
              behavior: 'smooth',
              block: 'start', // Inicia no topo do próximo card
            });
            
            // Adiciona uma margem extra para compensar a barra de navegação (caso necessário)
            if (isMobile) {
              setTimeout(() => {
                window.scrollBy(0, -100); // Ajuste para compensar a barra de navegação
              }, 300);
            }
          }
        }
  };

  const handleSubmit = () => {
    router.push('/mostra-panorama-24-11/confirmeseuvoto');
  };

  const hasVotes = Object.values(votos).some(voto => voto !== null);
  return (
    <>

      {/* FILME 1 */}

      <h2 className={style.tipo}>CURTAS-METRAGEM</h2>

      <div className={style.container_flex} ref={cardRefs.filme1}>
        {['filme1'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title1}</h3>
            <p className={style.subdescription}>{props.subdescription1}</p>
            <Image src={props.filme1} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description1}</p>
            <p className={style.sinopse}>{props.sinopse1}</p>

            <div className={style.notecontainer}>
              
              <h2 className={style.note}>SUA NOTA</h2>
              
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FILME 2 */}

      <div className={style.container_flex} ref={cardRefs.filme2}>
        {['filme2'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title2}</h3>
            <p className={style.subdescription}>{props.subdescription2}</p>
            <Image src={props.filme2} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description2}</p>
            <p className={style.sinopse}>{props.sinopse2}</p>

            <div className={style.notecontainer}>
             
              <h2 className={style.note}>SUA NOTA</h2>
              
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

          {/* FILME 3 */}

      <div className={style.container_flex} ref={cardRefs.filme3}>
        {['filme3'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title3}</h3>
            <p className={style.subdescription}>{props.subdescription3}</p>
            <Image src={props.filme3} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description3}</p>
            <p className={style.sinopse}>{props.sinopse3}</p>

            <div className={style.notecontainer}>
             
              <h2 className={style.note}>SUA NOTA</h2>
             
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

          {/* FILME 4 */}
      
      <div className={style.container_flex} ref={cardRefs.filme4}>
        {['filme4'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title4}</h3>
            <p className={style.subdescription}>{props.subdescription4}</p>
            <Image src={props.filme4} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description4}</p>
            <p className={style.sinopse}>{props.sinopse4}</p>

            <div className={style.notecontainer}>
             
              <h2 className={style.note}>SUA NOTA</h2>
             
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

          {/* FILME 5 */}
        <h2 className={style.tipo}>LONGA-METRAGEM</h2>

      <div className={style.container_flex} ref={cardRefs.filme5}>
        {['filme5'].map((topico, index) => (
          <div key={index} className={style.container}>
            <h3 className={style.title}>{props.title5}</h3>
            <p className={style.subdescription}>{props.subdescription5}</p>
            <Image src={props.filme5} alt="" className={style.movie_image} />
            <p className={style.description}>{props.description5}</p>
            <p className={style.sinopse}>{props.sinopse5}</p>

            <div className={style.notecontainer}>
             
              <h2 className={style.note}>SUA NOTA</h2>
             
            </div>

            <div className={style.opcoes}>
              {[1, 2, 3, 4, 5].map((voto) => (
                <div
                  key={voto}
                  className={`${style.opcao} ${votos[topico] === voto ? style.selecionado : ''} ${votos[topico] && votos[topico] !== voto ? style.esmaecido : ''}`}
                  onClick={() => handleVote(topico, voto)}
                >
                  <div className={style.square}>
                    {voto}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className={style.footer}>
        {hasVotes && (
          <button onClick={handleSubmit} className={style.submitButton}>
            FINALIZAR
          </button>
        )}
      </footer>
    </>
  );
};

export default MovieCard24;
