'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './admin.module.css';
import { CATEGORIAS, buscarSessao, dataCurta, nomeSessao } from '../dados/mostra';

const INTERVALO = 5000; // atualiza os números a cada 5 s

const hora = (data) =>
  data
    ? new Date(data).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—';

const formatarMedia = (media) => (media === null ? '—' : media.toFixed(2).replace('.', ','));

const numero = (n) => n.toLocaleString('pt-BR');

export function Painel() {
  const router = useRouter();
  const [dados, setDados] = useState(null);
  const [falhou, setFalhou] = useState(false);
  const [alterando, setAlterando] = useState(null); // id da sessão (ou 'encerrar') sendo alterada
  const [aviso, setAviso] = useState('');

  const carregar = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dados', { cache: 'no-store' });
      if (res.status === 401) {
        router.refresh(); // login expirou ou a senha mudou
        return;
      }
      if (!res.ok) throw new Error();
      setDados(await res.json());
      setFalhou(false);
    } catch {
      setFalhou(true);
    }
  }, [router]);

  useEffect(() => {
    carregar();
    const id = setInterval(() => !document.hidden && carregar(), INTERVALO);
    document.addEventListener('visibilitychange', carregar);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', carregar);
    };
  }, [carregar]);

  const alterarVotacao = async (sessaoId) => {
    const atual = dados?.aberta ? buscarSessao(dados.aberta) : null;
    const pergunta = sessaoId
      ? `Abrir a votação de ${nomeSessao(buscarSessao(sessaoId))}?` +
        (atual ? `\n\nA votação de ${nomeSessao(atual)} será encerrada.` : '')
      : `Encerrar a votação de ${nomeSessao(atual)}?`;
    if (!window.confirm(pergunta)) return;

    setAlterando(sessaoId ?? 'encerrar');
    setAviso('');
    try {
      const res = await fetch('/api/admin/votacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessao: sessaoId }),
      });
      if (res.status === 401) return router.refresh();
      if (!res.ok) throw new Error();
      await carregar();
    } catch {
      setAviso('Não foi possível alterar a votação. Confira a internet e tente de novo.');
    } finally {
      setAlterando(null);
    }
  };

  const sair = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    router.refresh();
  };

  if (!dados) {
    return (
      <div className={style.carregando}>
        {falhou ? 'Não foi possível carregar os dados. Tentando de novo…' : 'Carregando…'}
      </div>
    );
  }

  const aberta = dados.aberta ? buscarSessao(dados.aberta) : null;
  const totais = dados.sessoes.reduce(
    (t, s) => ({ votos: t.votos + s.votos, recentes: t.recentes + s.recentes, pesquisas: t.pesquisas + s.pesquisas }),
    { votos: 0, recentes: 0, pesquisas: 0 }
  );

  // Agrupa as sessões por dia
  const dias = [];
  for (const sessao of dados.sessoes) {
    let dia = dias.find((d) => d.data === sessao.data);
    if (!dia) dias.push((dia = { data: sessao.data, diaSemana: sessao.diaSemana, sessoes: [] }));
    dia.sessoes.push(sessao);
  }

  return (
    <div className={style.painel}>
      <header className={style.topo}>
        <div>
          <h1 className={style.titulo}>PAINEL DA VOTAÇÃO</h1>
          <p className={style.subtitulo}>13ª Mostra de Cinema de Gostoso</p>
        </div>
        <button type="button" className={style.sair} onClick={sair}>
          Sair
        </button>
      </header>

      {dados.modoTeste && (
        <p className={style.faixaTeste}>
          MODO DE TESTE — votos e controle no banco <strong>{dados.banco}</strong>, separado dos votos oficiais.
        </p>
      )}

      <section className={`${style.status} ${aberta ? style.statusAberta : ''}`} aria-live="polite">
        <div>
          <p className={style.statusRotulo}>{aberta ? 'VOTAÇÃO ABERTA AGORA' : 'NENHUMA VOTAÇÃO ABERTA'}</p>
          <p className={style.statusSessao}>
            {aberta ? nomeSessao(aberta) : 'O público vê a tela “Aguarde”.'}
          </p>
          {dados.atualizadoEm && <p className={style.statusDesde}>Última alteração às {hora(dados.atualizadoEm)}</p>}
        </div>
        {aberta && (
          <button
            type="button"
            className={style.botaoEncerrar}
            onClick={() => alterarVotacao(null)}
            disabled={alterando !== null}
          >
            {alterando === 'encerrar' ? 'ENCERRANDO…' : 'ENCERRAR VOTAÇÃO'}
          </button>
        )}
      </section>

      {aviso && (
        <p className={style.erro} role="alert">
          {aviso}
        </p>
      )}

      <div className={style.atualizacao}>
        <span className={`${style.ponto} ${falhou ? style.pontoFalha : ''}`} aria-hidden="true" />
        {falhou ? 'Sem conexão — mostrando os últimos dados' : `Ao vivo · atualizado às ${hora(dados.agora)}`}
      </div>

      <section className={style.numeros}>
        <Numero rotulo="Votos no total" valor={totais.votos} />
        <Numero rotulo="Votos nos últimos 5 min" valor={totais.recentes} />
        <Numero rotulo="Pesquisas respondidas" valor={totais.pesquisas} />
      </section>

      <Legenda />

      {dias.map((dia) => {
        const { diaMes, diaSemana } = dataCurta(dia);
        return (
          <section key={dia.data} className={style.dia}>
            <h2 className={style.tituloDia}>
              <strong>{diaMes}</strong> {diaSemana}
            </h2>
            <div className={style.sessoes}>
              {dia.sessoes.map((sessao) => (
                <CartaoSessao
                  key={sessao.id}
                  sessao={sessao}
                  aberta={dados.aberta === sessao.id}
                  alterando={alterando}
                  aoAbrir={() => alterarVotacao(sessao.id)}
                  aoEncerrar={() => alterarVotacao(null)}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className={style.dia}>
        <h2 className={style.tituloDia}>
          <strong>RANKING</strong> geral (média das notas)
        </h2>
        <div className={style.sessoes}>
          {Object.entries(CATEGORIAS).map(([categoria, { nome }]) => (
            <div key={categoria} className={style.cartao}>
              <h3 className={style.tituloCartao}>{nome}</h3>
              <ol className={style.ranking}>
                {dados.ranking[categoria].map((filme, i) => (
                  <li key={filme.id} className={style.itemRanking}>
                    <span className={style.posicao}>{filme.votos ? `${i + 1}º` : '–'}</span>
                    <span className={style.nomeRanking}>
                      {filme.titulo} <small>· Sessão {filme.sessao}</small>
                    </span>
                    <span className={style.mediaRanking}>{formatarMedia(filme.media)}</span>
                    <span className={style.votosRanking}>
                      {numero(filme.votos)} {filme.votos === 1 ? 'voto' : 'votos'}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Numero({ rotulo, valor }) {
  return (
    <div className={style.numero}>
      <strong>{numero(valor)}</strong>
      <span>{rotulo}</span>
    </div>
  );
}

function Legenda() {
  return (
    <p className={style.legenda}>
      Distribuição das notas:
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={style.itemLegenda}>
          <span className={style[`nota${n}`]} aria-hidden="true" /> {n}
        </span>
      ))}
    </p>
  );
}

function CartaoSessao({ sessao, aberta, alterando, aoAbrir, aoEncerrar }) {
  const ocupado = alterando !== null;

  return (
    <article className={`${style.cartao} ${aberta ? style.cartaoAberto : ''}`}>
      <div className={style.cabecalhoCartao}>
        <h3 className={style.tituloCartao}>
          Sessão {sessao.numero} <small>· {sessao.horario}</small>
        </h3>
        <span className={`${style.selo} ${aberta ? style.seloAberto : ''}`}>{aberta ? 'ABERTA' : 'FECHADA'}</span>
      </div>

      <dl className={style.resumo}>
        <div>
          <dt>Votos</dt>
          <dd>{numero(sessao.votos)}</dd>
        </div>
        <div>
          <dt>Últimos 5 min</dt>
          <dd>{numero(sessao.recentes)}</dd>
        </div>
        <div>
          <dt>Pesquisas</dt>
          <dd>{numero(sessao.pesquisas)}</dd>
        </div>
        <div>
          <dt>Último voto</dt>
          <dd>{sessao.ultimoVoto ? hora(sessao.ultimoVoto).slice(0, 5) : '—'}</dd>
        </div>
      </dl>

      <ul className={style.filmes}>
        {sessao.filmes.map((filme) => (
          <li key={filme.id} className={style.filme}>
            <div className={style.linhaFilme}>
              <span className={style.nomeFilme}>
                {filme.titulo} <small className={style.categoriaFilme}>{CATEGORIAS[filme.categoria].singular}</small>
              </span>
              <span className={style.mediaFilme}>
                {formatarMedia(filme.media)}
                <small> · {numero(filme.votos)}</small>
              </span>
            </div>
            <Distribuicao notas={filme.notas} total={filme.votos} />
          </li>
        ))}
      </ul>

      {aberta ? (
        <button type="button" className={style.botaoEncerrar} onClick={aoEncerrar} disabled={ocupado}>
          {alterando === 'encerrar' ? 'ENCERRANDO…' : 'ENCERRAR VOTAÇÃO'}
        </button>
      ) : (
        <button type="button" className={style.botaoAbrir} onClick={aoAbrir} disabled={ocupado}>
          {alterando === sessao.id ? 'ABRINDO…' : 'ABRIR VOTAÇÃO'}
        </button>
      )}
    </article>
  );
}

function Distribuicao({ notas, total }) {
  const descricao = notas.map((qtd, i) => `nota ${i + 1}: ${qtd}`).join(', ');
  return (
    <div className={style.barra} role="img" aria-label={total ? descricao : 'Sem votos'} title={total ? descricao : 'Sem votos'}>
      {total > 0 &&
        notas.map((qtd, i) =>
          qtd ? <span key={i} className={style[`nota${i + 1}`]} style={{ width: `${(qtd / total) * 100}%` }} /> : null
        )}
    </div>
  );
}
