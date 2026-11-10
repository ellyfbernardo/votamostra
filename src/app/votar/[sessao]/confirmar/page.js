'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import style from './confirmar.module.css';
import { Tela } from '../../../components/Tela/Tela';
import { Cabecalho } from '../../../components/Cabecalho/Cabecalho';
import { buscarSessao, infoFilme } from '../../../dados/mostra';
import { lerVotos } from '../../../lib/votosLocais';
import inseto from '../../../assets/mostra2026/inseto.svg';
import peixe from '../../../assets/mostra2026/peixe.svg';

// Tela 3: resumo das notas antes de informar o CPF.
export default function Confirmar() {
  const { sessao: sessaoId } = useParams();
  const sessao = buscarSessao(sessaoId);
  const [votos, setVotos] = useState(null);

  useEffect(() => {
    setVotos(lerVotos(sessaoId));
  }, [sessaoId]);

  if (!sessao) notFound();

  const votados = sessao.filmes
    .map((filme, i) => ({ filme, numero: i + 1, nota: votos?.[filme.id] }))
    .filter((item) => item.nota);

  return (
    <Tela>
      <Cabecalho sessao={sessao} />
      <Image src={inseto} alt="" aria-hidden="true" className={style.inseto} />

      <main className={style.lista}>
        {votos === null ? null : votados.length === 0 ? (
          <p className={style.vazio}>Você ainda não deu nota a nenhum filme.</p>
        ) : (
          votados.map(({ filme, numero, nota }) => (
            <article key={filme.id} className={style.item}>
              <span className={style.selo}>Filme {numero}</span>
              <div className={style.texto}>
                <h2 className={style.titulo}>{filme.titulo}</h2>
                <p className={style.info}>{infoFilme(filme)}</p>
                <p className={style.direcao}>
                  Direção <strong>{filme.direcao}</strong>
                </p>
              </div>
              <span className={style.nota} aria-label={`Sua nota: ${nota}`}>
                {nota}
              </span>
            </article>
          ))
        )}
      </main>

      <footer className={style.acoes}>
        {votados.length > 0 && (
          <Link href={`/votar/${sessaoId}/cpf`} className="btn-verde">
            CONFIRMAR
          </Link>
        )}
        <Link href={`/votar/${sessaoId}`} className="btn-preto">
          REVISAR VOTOS
        </Link>
      </footer>

      <Image src={peixe} alt="" aria-hidden="true" className={style.peixe} />
    </Tela>
  );
}
