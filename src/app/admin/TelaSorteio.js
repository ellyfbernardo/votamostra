'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import style from './TelaSorteio.module.css';
import nomeMostra from '../assets/mostra2026/nome-mostra.svg';
import olhoFlor from '../assets/mostra2026/olho-flor.svg';
import geodesica from '../assets/mostra2026/geodesica.svg';
import chancela from '../assets/mostra2026/chancela.svg';
import dataFestival from '../assets/mostra2026/data.svg';
import pessoas from '../assets/mostra2026/pessoas-bolhas.svg';
import inseto from '../assets/mostra2026/inseto.svg';
import tranca from '../assets/mostra2026/tranca.svg';

const CORES_CONFETE = ['#c5da4b', '#faf7fb', '#000000', '#a064a5'];

// Sequência de atrasos da animação: começa rápido e vai desacelerando (~5 s)
function atrasos(reduzido) {
  if (reduzido) return [300, 400, 500];
  const lista = [];
  let atraso = 55;
  while (atraso < 480) {
    lista.push(atraso);
    atraso *= 1.09;
  }
  return lista;
}

// Tela cheia para gravar o sorteio. Mostra só nome e cidade de quem foi sorteado;
// telefone e CPF ficam no painel, fora da gravação.
export function TelaSorteio({ disponiveis, aoFechar, aoSortear }) {
  const telaRef = useRef(null);
  const timers = useRef([]);
  const [etapa, setEtapa] = useState('inicio'); // inicio | sorteando | resultado
  const [nomeNaTela, setNomeNaTela] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [restantes, setRestantes] = useState(disponiveis);
  const [telaCheia, setTelaCheia] = useState(false);

  // Trava a rolagem do painel, fecha com Esc e limpa os timers ao sair
  useEffect(() => {
    const pendentes = timers.current;
    const raiz = document.documentElement;
    const overflow = [document.body.style.overflow, raiz.style.overflow];
    document.body.style.overflow = 'hidden';
    raiz.style.overflow = 'hidden';
    const aoTeclar = (e) => e.key === 'Escape' && !document.fullscreenElement && aoFechar();
    const aoMudarTelaCheia = () => setTelaCheia(Boolean(document.fullscreenElement));
    document.addEventListener('keydown', aoTeclar);
    document.addEventListener('fullscreenchange', aoMudarTelaCheia);
    return () => {
      [document.body.style.overflow, raiz.style.overflow] = overflow;
      document.removeEventListener('keydown', aoTeclar);
      document.removeEventListener('fullscreenchange', aoMudarTelaCheia);
      pendentes.forEach(clearTimeout);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [aoFechar]);

  const alternarTelaCheia = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else telaRef.current?.requestFullscreen?.().catch(() => {});
  };

  const sortear = async () => {
    setErro('');
    setResultado(null);
    setEtapa('sorteando');
    setNomeNaTela('');

    let dados;
    try {
      const res = await fetch('/api/admin/sorteio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao: 'sortear' }),
      });
      if (res.status === 409) throw new Error('Não há mais ninguém para sortear.');
      if (!res.ok) throw new Error('Não foi possível sortear. Confira a internet e tente de novo.');
      dados = await res.json();
    } catch (e) {
      setErro(e.message);
      setEtapa('inicio');
      return;
    }

    const { nomes, ...sorteado } = dados;
    const lista = nomes.length ? nomes : [sorteado.nome];
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Nomes passando cada vez mais devagar, depois a revelação
    let tempo = 0;
    atrasos(reduzido).forEach((atraso, i) => {
      tempo += atraso;
      timers.current.push(setTimeout(() => setNomeNaTela(lista[i % lista.length]), tempo));
    });
    timers.current.push(
      setTimeout(() => {
        setResultado(sorteado);
        setEtapa('resultado');
        setRestantes(sorteado.concorreram - 1);
        aoSortear(sorteado);
      }, tempo + 700)
    );
  };

  return (
    <div ref={telaRef} className={style.tela} role="dialog" aria-modal="true" aria-label="Sorteio">
      {/* Ilustrações da identidade da 13ª Mostra */}
      <Image src={geodesica} alt="" aria-hidden="true" className={style.geodesica} priority />
      <Image src={tranca} alt="" aria-hidden="true" className={style.tranca} priority />
      <Image
        src={inseto}
        alt=""
        aria-hidden="true"
        className={`${style.inseto} ${etapa === 'sorteando' ? style.insetoVoando : ''}`}
        priority
      />
      <Image src={pessoas} alt="" aria-hidden="true" className={style.pessoas} priority />

      <header className={style.topo}>
        <Image
          src={chancela}
          alt="Ministério da Cultura, Governo do Estado do Rio Grande do Norte e Petrobras apresentam"
          className={style.chancela}
          priority
        />
        <div className={style.marca}>
          <Image src={nomeMostra} alt="13ª Mostra de Cinema de Gostoso" className={style.logo} priority />
          <Image src={dataFestival} alt="20 a 24 de novembro de 2026" className={style.data} priority />
        </div>
      </header>

      <main className={style.palco}>
        {etapa === 'inicio' && (
          <div className={style.inicio}>
            <Image src={olhoFlor} alt="" aria-hidden="true" className={style.olho} priority />
            <h1 className={style.titulo}>SORTEIO</h1>
            <p className={style.subtitulo}>entre o público que respondeu a pesquisa de satisfação</p>
            <p className={style.contagem}>
              <strong>{restantes.toLocaleString('pt-BR')}</strong> {restantes === 1 ? 'pessoa concorrendo' : 'pessoas concorrendo'}
            </p>
            {erro && (
              <p className={style.erro} role="alert">
                {erro}
              </p>
            )}
            <button type="button" className={style.botaoSortear} onClick={sortear} disabled={restantes === 0}>
              SORTEAR
            </button>
          </div>
        )}

        {etapa === 'sorteando' && (
          <div className={style.inicio}>
            <Image src={olhoFlor} alt="" aria-hidden="true" className={`${style.olho} ${style.olhoGirando}`} />
            <p className={style.rotulo}>SORTEANDO…</p>
            <p key={nomeNaTela} className={style.nomeGirando} aria-live="off">
              {nomeNaTela || '· · ·'}
            </p>
          </div>
        )}

        {etapa === 'resultado' && resultado && (
          <div className={style.inicio} aria-live="polite">
            <Confete />
            <Image src={olhoFlor} alt="" aria-hidden="true" className={`${style.olho} ${style.olhoPequeno}`} />
            <p className={style.rotulo}>PARABÉNS!</p>
            <p className={style.vencedor}>{resultado.nome}</p>
            {resultado.cidade && <p className={style.cidade}>{resultado.cidade}</p>}
          </div>
        )}
      </main>

      {/* Controles discretos no rodapé (somem durante a animação) */}
      {etapa !== 'sorteando' && (
        <nav className={style.controles}>
          {etapa === 'resultado' && restantes > 0 && (
            <button type="button" className={style.controle} onClick={sortear}>
              Sortear de novo
            </button>
          )}
          <button type="button" className={style.controle} onClick={alternarTelaCheia}>
            {telaCheia ? 'Sair da tela cheia' : 'Tela cheia'}
          </button>
          <button type="button" className={style.controle} onClick={aoFechar}>
            Fechar
          </button>
        </nav>
      )}
    </div>
  );
}

function Confete() {
  const [pecas] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      left: Math.random() * 100,
      atraso: Math.random() * 0.8,
      duracao: 2.6 + Math.random() * 2,
      cor: CORES_CONFETE[i % CORES_CONFETE.length],
      largura: 6 + Math.random() * 8,
      giro: Math.random() * 360,
    }))
  );

  return (
    <div className={style.confete} aria-hidden="true">
      {pecas.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.largura,
            height: p.largura * 1.6,
            background: p.cor,
            animationDelay: `${p.atraso}s`,
            animationDuration: `${p.duracao}s`,
            transform: `rotate(${p.giro}deg)`,
          }}
        />
      ))}
    </div>
  );
}
