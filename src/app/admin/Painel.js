'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './admin.module.css';
import { CATEGORIAS, buscarSessao, dataCurta, nomeSessao } from '../dados/mostra';
import { TelaSorteio } from './TelaSorteio';

const INTERVALO = 5000; // atualiza os números a cada 5 s

const hora = (data) =>
  data
    ? new Date(data).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—';

const formatarMedia = (media) => (media === null ? '—' : media.toFixed(2).replace('.', ','));

const numero = (n) => n.toLocaleString('pt-BR');

// 90 -> "1h30"
const duracao = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;

const dataHora = (data) =>
  new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

// 52998224725 -> ***.982.247-**
const cpfMascarado = (cpf) => `***.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-**`;

// 84999998888 -> (84) 99999-8888
const telefone = (t) =>
  !t
    ? 'sem telefone'
    : t.length === 11
      ? `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}`
      : `(${t.slice(0, 2)}) ${t.slice(2, 6)}-${t.slice(6)}`;

const rotuloSessao = (id) => {
  const sessao = buscarSessao(id);
  return sessao ? nomeSessao(sessao) : id;
};

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
      ? `Abrir a votação de ${nomeSessao(buscarSessao(sessaoId))}?\n\nEla fecha sozinha em ${duracao(dados.duracaoMin)}.` +
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
          {aberta && dados.fechaEm && <Contagem fechaEm={dados.fechaEm} aoTerminar={carregar} />}
          {!aberta && dados.encerradaAuto && buscarSessao(dados.encerradaAuto.sessao) && (
            <p className={style.statusDesde}>
              A votação da {nomeSessao(buscarSessao(dados.encerradaAuto.sessao))} fechou sozinha às{' '}
              {hora(dados.encerradaAuto.em).slice(0, 5)} (timer de {duracao(dados.duracaoMin)}).
            </p>
          )}
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

      <Graficos sessoes={dados.sessoes} />

      <section className={style.dia}>
        <h2 className={style.tituloDia}>
          <strong>EXPORTAR</strong> planilha dos votos
        </h2>
        <div className={style.cartao}>
          <p className={style.textoSorteio}>
            Uma linha por voto, com as notas de cada filme e as respostas da pesquisa.
            <br />
            <small>Sem dados pessoais: CPF, nome, telefone e coordenadas ficam de fora. Abre no Excel e no Google Planilhas.</small>
          </p>
          <a href="/api/admin/exportar" className={style.botaoAbrir} download>
            BAIXAR PLANILHA (CSV)
          </a>
        </div>
      </section>

      <Sorteio dados={dados.sorteio} aoAtualizar={carregar} />

      <Comentarios lista={dados.comentarios} />
    </div>
  );
}

// Tempo até a votação fechar sozinha, atualizado a cada segundo
function Contagem({ fechaEm, aoTerminar }) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const restante = Math.max(0, new Date(fechaEm).getTime() - agora);
  const terminou = restante === 0;
  useEffect(() => {
    if (terminou) aoTerminar();
  }, [terminou, aoTerminar]);

  const s = Math.floor(restante / 1000);
  const relogio = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map((n) => String(n).padStart(2, '0'))
    .join(':');

  return (
    <p className={style.timer}>
      Fecha sozinha em <strong>{relogio}</strong> <span>(às {hora(fechaEm).slice(0, 5)})</span>
    </p>
  );
}

function Sorteio({ dados, aoAtualizar }) {
  const [sorteando, setSorteando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const enviar = async (acao) => {
    setErro('');
    setSorteando(true);
    try {
      const res = await fetch('/api/admin/sorteio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acao }),
      });
      if (res.status === 409) setErro('Não há mais ninguém para sortear.');
      else if (!res.ok) throw new Error();
      else if (acao === 'sortear') setResultado(await res.json());
      else setResultado(null);
      await aoAtualizar();
    } catch {
      setErro('Não foi possível sortear. Confira a internet e tente de novo.');
    } finally {
      setSorteando(false);
    }
  };

  // O sorteio em si acontece na tela cheia (TelaSorteio), própria para gravar
  const [telaAberta, setTelaAberta] = useState(false);
  const fecharTela = useCallback(() => setTelaAberta(false), []);
  const aoSortear = useCallback(
    (sorteado) => {
      setResultado(sorteado);
      aoAtualizar();
    },
    [aoAtualizar]
  );
  const sortear = () => {
    setErro('');
    setTelaAberta(true);
  };

  const limpar = () => {
    if (window.confirm('Apagar o histórico de sorteados? Todos voltam a concorrer.')) enviar('limpar');
  };

  return (
    <section className={style.dia}>
      <h2 className={style.tituloDia}>
        <strong>SORTEIO</strong> entre quem respondeu a pesquisa
      </h2>
      <div className={style.cartao}>
        <p className={style.textoSorteio}>
          <strong>{numero(dados.disponiveis)}</strong> pessoa(s) concorrendo agora
          {dados.sorteados.length > 0 && ` · ${numero(dados.sorteados.length)} já sorteada(s), que não concorrem de novo`}
          <br />
          <small>Cada CPF conta uma vez, mesmo que tenha respondido a pesquisa em mais de uma sessão.</small>
        </p>

        <button type="button" className={style.botaoAbrir} onClick={sortear} disabled={sorteando || dados.disponiveis === 0}>
          {sorteando ? 'AGUARDE…' : 'SORTEAR'}
        </button>

        {telaAberta && <TelaSorteio disponiveis={dados.disponiveis} aoFechar={fecharTela} aoSortear={aoSortear} />}

        {erro && (
          <p className={style.erro} role="alert">
            {erro}
          </p>
        )}

        {resultado && (
          <div className={style.sorteado} aria-live="polite">
            <p className={style.statusRotulo}>ÚLTIMA PESSOA SORTEADA</p>
            <p className={style.nomeSorteado}>{resultado.nome}</p>
            <p>
              <strong>{telefone(resultado.telefone)}</strong> · CPF {cpfMascarado(resultado.cpf)}
            </p>
            <p className={style.statusDesde}>{[resultado.cidade, rotuloSessao(resultado.sessao)].filter(Boolean).join(' · ')}</p>
          </div>
        )}

        {dados.sorteados.length > 0 && (
          <>
            <h3 className={style.subtituloCartao}>Histórico</h3>
            <ol className={style.ranking}>
              {dados.sorteados.map((s) => (
                <li key={`${s.cpf}-${s.em}`} className={style.itemSorteio}>
                  <strong>{s.nome}</strong> · {telefone(s.telefone)}
                  <br />
                  <small>
                    CPF {cpfMascarado(s.cpf)} · sorteado em {dataHora(s.em)} entre {numero(s.concorreram)}
                  </small>
                </li>
              ))}
            </ol>
            <button type="button" className={style.botaoTexto} onClick={limpar} disabled={sorteando}>
              Apagar histórico de sorteados
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function Comentarios({ lista }) {
  return (
    <section className={style.dia}>
      <h2 className={style.tituloDia}>
        <strong>SUGESTÕES E COMENTÁRIOS</strong> ({numero(lista.length)})
      </h2>
      <div className={style.cartao}>
        {lista.length === 0 ? (
          <p className={style.textoSorteio}>Ainda não há comentários.</p>
        ) : (
          <ul className={style.comentarios}>
            {lista.map((c, i) => (
              <li key={i} className={style.comentario}>
                <p>{c.comentario}</p>
                <small>
                  {c.nome} · {rotuloSessao(c.sessao)}
                  {c.em && ` · ${dataHora(c.em)}`}
                  {c.recomendacao && ` · Recomendaria: ${c.recomendacao}`}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
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

// Gráficos de colunas: votos por filme e quantidade de cada nota (1 a 5)
function Graficos({ sessoes }) {
  const filmes = sessoes.flatMap((s) =>
    s.filmes.map((f) => ({ ...f, chave: `${s.id}/${f.id}`, sessao: s.numero }))
  );
  const [filtro, setFiltro] = useState('todos');

  const escolhido = filmes.find((f) => f.chave === filtro);
  const notas = escolhido
    ? escolhido.notas
    : filmes.reduce((soma, f) => soma.map((n, i) => n + f.notas[i]), [0, 0, 0, 0, 0]);
  const totalNotas = notas.reduce((a, b) => a + b, 0);

  return (
    <section className={style.dia}>
      <h2 className={style.tituloDia}>
        <strong>GRÁFICOS</strong> dos votos
      </h2>

      <div className={style.cartao}>
        <h3 className={style.tituloCartao}>Votos por filme</h3>
        <Colunas
          rotulo="Quantidade de votos por filme"
          itens={filmes.map((f) => ({
            chave: f.chave,
            valor: f.votos,
            nome: f.titulo,
            detalhe: `Sessão ${f.sessao} · ${CATEGORIAS[f.categoria]?.singular ?? ''}`,
            dica: `${f.titulo} (Sessão ${f.sessao}): ${numero(f.votos)} ${f.votos === 1 ? 'voto' : 'votos'}`,
          }))}
          larguraMinima={76}
          espacoNomes={96}
        />
        <p className={style.dicaRolar}>Arraste o gráfico para o lado para ver todos os filmes.</p>
      </div>

      <div className={style.cartao}>
        <div className={style.cabecalhoCartao}>
          <h3 className={style.tituloCartao}>Quantidade de cada nota</h3>
          <select
            className={style.filtroGrafico}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            aria-label="Filme do gráfico de notas"
          >
            <option value="todos">Todos os filmes</option>
            {filmes.map((f) => (
              <option key={f.chave} value={f.chave}>
                S{f.sessao} · {f.titulo}
              </option>
            ))}
          </select>
        </div>
        <Colunas
          rotulo={`Quantidade de notas de 1 a 5${escolhido ? ` para ${escolhido.titulo}` : ''}`}
          itens={notas.map((qtd, i) => {
            const pct = totalNotas ? Math.round((qtd / totalNotas) * 100) : 0;
            return {
              chave: String(i + 1),
              valor: qtd,
              nome: `Nota ${i + 1}`,
              detalhe: `${pct}%`,
              dica: `Nota ${i + 1}: ${numero(qtd)} (${pct}%)`,
            };
          })}
          larguraMinima={48}
          espacoNomes={44}
        />
        <p className={style.notaGrafico}>
          {numero(totalNotas)} {totalNotas === 1 ? 'nota dada' : 'notas dadas'}
          {escolhido ? ` para ${escolhido.titulo}` : ' em todos os filmes'}
        </p>
      </div>
    </section>
  );
}

function Colunas({ rotulo, itens, larguraMinima, espacoNomes }) {
  const maximo = Math.max(1, ...itens.map((i) => i.valor));

  return (
    <div className={style.grafico} style={{ '--espaco-nomes': `${espacoNomes}px` }}>
      <ul className={style.colunas} aria-label={rotulo} style={{ '--largura-coluna': `${larguraMinima}px` }}>
        {itens.map((item) => (
          <li key={item.chave} className={style.coluna} title={item.dica} aria-label={item.dica}>
            <span className={style.valorColuna} aria-hidden="true">
              {numero(item.valor)}
            </span>
            <span className={style.areaBarra} aria-hidden="true">
              <span className={style.barra} style={{ height: `${(item.valor / maximo) * 100}%` }} />
            </span>
            <span className={style.nomeColuna} aria-hidden="true">
              {item.nome}
              <small>{item.detalhe}</small>
            </span>
          </li>
        ))}
      </ul>
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
