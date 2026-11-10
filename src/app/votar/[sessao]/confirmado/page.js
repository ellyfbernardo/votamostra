'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import style from './confirmado.module.css';
import { Tela } from '../../../components/Tela/Tela';
import { Pesquisa } from './Pesquisa';
import { buscarSessao } from '../../../dados/mostra';
import { lerCpf, pesquisaRespondida } from '../../../lib/votosLocais';
import tranca from '../../../assets/mostra2026/tranca.svg';
import nomeMostra from '../../../assets/mostra2026/nome-mostra.svg';
import dataFestival from '../../../assets/mostra2026/data.svg';
import peixe from '../../../assets/mostra2026/peixe.svg';

// Tela 5.1: voto registrado + acesso à pesquisa de satisfação (5.2).
export default function Confirmado() {
  const { sessao: sessaoId } = useParams();
  const sessao = buscarSessao(sessaoId);

  const [cpf, setCpf] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [aberta, setAberta] = useState(false);

  useEffect(() => {
    setCpf(lerCpf(sessaoId));
    setRespondida(pesquisaRespondida(sessaoId));
  }, [sessaoId]);

  if (!sessao) notFound();

  return (
    <Tela posicaoGeodesica="topo">
      <Image src={tranca} alt="" aria-hidden="true" className={style.tranca} />

      <div className={style.marca}>
        <Image src={nomeMostra} alt="13ª Mostra de Cinema de Gostoso" className={style.nome} priority />
        <Image src={dataFestival} alt="20 a 24 de novembro de 2026" className={style.data} />
      </div>

      <main className={style.conteudo}>
        <h1 className={style.titulo}>
          <span>SEUS VOTOS FORAM</span>
          <strong>CONFIRMADOS!</strong>
        </h1>

        {cpf && !respondida && (
          <button type="button" className="btn-claro" onClick={() => setAberta(true)}>
            PESQUISA DE SATISFAÇÃO
          </button>
        )}
        {respondida && <p className={style.obrigado}>Obrigado por responder a pesquisa!</p>}

        <Link href="/" className="btn-preto">
          INÍCIO
        </Link>
      </main>

      <Image src={peixe} alt="" aria-hidden="true" className={style.ilustracao} />

      {aberta && (
        <Pesquisa
          sessaoId={sessaoId}
          cpf={cpf}
          aoFechar={() => setAberta(false)}
          aoEnviar={() => setRespondida(true)}
        />
      )}
    </Tela>
  );
}
