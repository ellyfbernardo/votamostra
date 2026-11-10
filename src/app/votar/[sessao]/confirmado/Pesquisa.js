'use client';

import { useEffect, useRef, useState } from 'react';
import style from './Pesquisa.module.css';
import { BotoesNota } from '../../../components/BotoesNota/BotoesNota';
import { marcarPesquisaRespondida } from '../../../lib/votosLocais';

const FAIXAS = [
  ['-18', 'Menos de 18'],
  ['18-24', '18 – 24'],
  ['25-34', '25 – 34'],
  ['35-44', '35 – 44'],
  ['45-54', '45 – 54'],
  ['55+', '+55'],
];

const MOTIVOS = [
  ['mostra', 'A Mostra'],
  ['turismo', 'Turismo'],
  ['trabalho', 'Trabalho'],
  ['moro', 'Moro aqui'],
  ['outro', 'Outro'],
];

const COMO_SOUBE = [
  ['redes', 'Redes sociais'],
  ['ads', 'Publicidade online'],
  ['sites', 'Sites especializados'],
  ['indicacao', 'Indicação'],
  ['midia', 'Mídia tradicional'],
  ['outros', 'Outros'],
];

const AVALIACOES = [
  ['estrutura', 'Estrutura'],
  ['organizacao', 'Organização'],
  ['programacao', 'Programação'],
  ['acessibilidade', 'Acessibilidade'],
];

const ETAPAS = ['QUEREMOS TE CONHECER!', 'SUA VISITA', 'AVALIE A MOSTRA'];

const INICIAL = {
  nome: '',
  faixa: '',
  pais: 'Brasil',
  estado: '',
  cidade: '',
  primeiraVez: '',
  motivo: '',
  motivoOutro: '',
  soube: [],
  soubeOutro: '',
  estrutura: null,
  organizacao: null,
  programacao: null,
  acessibilidade: null,
  recomendacao: '',
  comentario: '',
};

// Retorna a mensagem do primeiro campo obrigatório faltando na etapa, ou ''.
function validar(etapa, f) {
  if (etapa === 0) {
    if (!f.nome.trim()) return 'Informe seu nome.';
    if (!f.faixa) return 'Escolha sua faixa etária.';
    if (!f.pais.trim() || !f.estado.trim() || !f.cidade.trim()) return 'Informe país, estado e cidade.';
  }
  if (etapa === 1) {
    if (!f.primeiraVez) return 'Responda se é sua primeira vez em São Miguel do Gostoso.';
    if (!f.motivo || (f.motivo === 'outro' && !f.motivoOutro.trim())) return 'Conte o motivo da sua visita.';
    if (f.soube.length === 0 || (f.soube.includes('outros') && !f.soubeOutro.trim())) return 'Conte como ficou sabendo da Mostra.';
  }
  if (etapa === 2) {
    if (AVALIACOES.some(([campo]) => !f[campo])) return 'Avalie todos os itens de 1 a 5.';
    if (!f.recomendacao) return 'Responda se recomendaria a Mostra.';
  }
  return '';
}

// Tela 5.2: pesquisa de satisfação em pop-up, dividida em 3 etapas.
export function Pesquisa({ sessaoId, cpf, aoFechar, aoEnviar }) {
  const [etapa, setEtapa] = useState(0);
  const [form, setForm] = useState(INICIAL);
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [concluida, setConcluida] = useState(false);
  const cartaoRef = useRef(null);

  // Fecha com Esc e trava a rolagem da página por trás
  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && aoFechar();
    document.addEventListener('keydown', aoTeclar);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = overflow;
    };
  }, [aoFechar]);

  useEffect(() => {
    cartaoRef.current?.scrollTo({ top: 0 });
  }, [etapa]);

  const alterar = (campo, valor) => setForm((f) => ({ ...f, [campo]: valor }));

  const alternarSoube = (valor) =>
    setForm((f) => ({
      ...f,
      soube: f.soube.includes(valor) ? f.soube.filter((v) => v !== valor) : [...f.soube, valor],
    }));

  const avancar = () => {
    const mensagem = validar(etapa, form);
    setErro(mensagem);
    if (!mensagem) setEtapa((e) => e + 1);
  };

  const enviar = async () => {
    const mensagem = validar(2, form);
    setErro(mensagem);
    if (mensagem) return;

    setEnviando(true);
    try {
      const res = await fetch('/api/updateForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf,
          sessao: sessaoId,
          form: {
            nome: form.nome,
            faixa: form.faixa,
            pais: form.pais,
            estado: form.estado,
            cidade: form.cidade,
            primeiraVez: form.primeiraVez,
            motivo: form.motivo === 'outro' ? form.motivoOutro : form.motivo,
            soube: form.soube.map((v) => (v === 'outros' ? form.soubeOutro : v)),
            estrutura: String(form.estrutura),
            organizacao: String(form.organizacao),
            programacao: String(form.programacao),
            acessibilidade: String(form.acessibilidade),
            recomendacao: form.recomendacao,
            comentario: form.comentario,
          },
        }),
      });

      if (res.ok || res.status === 409) {
        marcarPesquisaRespondida(sessaoId);
        setConcluida(true);
        aoEnviar();
      } else {
        setErro('Não foi possível enviar. Tente novamente em instantes.');
      }
    } catch {
      setErro('Sem conexão. Verifique sua internet e tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={style.fundo} onClick={(e) => e.target === e.currentTarget && aoFechar()}>
      <div className={style.cartao} role="dialog" aria-modal="true" aria-labelledby="titulo-pesquisa" ref={cartaoRef}>
        <button type="button" className={style.fechar} onClick={aoFechar} aria-label="Fechar pesquisa">
          ✕
        </button>

        <header className={style.cabecalho}>
          <h2 id="titulo-pesquisa" className={style.titulo}>PESQUISA DE SATISFAÇÃO</h2>
          <p className={style.subtitulo}>13ª MOSTRA DE CINEMA DE GOSTOSO</p>
        </header>

        {concluida ? (
          <div className={style.concluida}>
            <p className={style.etapa}>OBRIGADO!</p>
            <p className={style.textoFinal}>Sua resposta foi enviada.</p>
            <button type="button" className="btn-preto" onClick={aoFechar}>
              FECHAR
            </button>
          </div>
        ) : (
          <form className={style.form} onSubmit={(e) => e.preventDefault()} noValidate>
            <p className={style.etapa}>{ETAPAS[etapa]}</p>

            {etapa === 0 && (
              <>
                <Campo numero={1} rotulo="Nome e Sobrenome" valor={form.nome} aoMudar={(v) => alterar('nome', v)} autoComplete="name" />
                <Opcoes numero={2} rotulo="Faixa Etária" nome="faixa" opcoes={FAIXAS} valor={form.faixa} aoMudar={(v) => alterar('faixa', v)} />
                <Campo numero={3} rotulo="País" valor={form.pais} aoMudar={(v) => alterar('pais', v)} autoComplete="country-name" />
                <Campo numero={4} rotulo="Estado" valor={form.estado} aoMudar={(v) => alterar('estado', v)} autoComplete="address-level1" />
                <Campo numero={5} rotulo="Cidade" valor={form.cidade} aoMudar={(v) => alterar('cidade', v)} autoComplete="address-level2" />
              </>
            )}

            {etapa === 1 && (
              <>
                <Opcoes
                  numero={6}
                  rotulo="É sua primeira vez em São Miguel do Gostoso?"
                  nome="primeiraVez"
                  opcoes={[['sim', 'Sim'], ['nao', 'Não']]}
                  valor={form.primeiraVez}
                  aoMudar={(v) => alterar('primeiraVez', v)}
                />
                <Opcoes numero={7} rotulo="Você está em Gostoso por causa de:" nome="motivo" opcoes={MOTIVOS} valor={form.motivo} aoMudar={(v) => alterar('motivo', v)} />
                {form.motivo === 'outro' && (
                  <input className={style.campo} aria-label="Qual o motivo?" placeholder="Qual?" value={form.motivoOutro} onChange={(e) => alterar('motivoOutro', e.target.value)} />
                )}
                <Opcoes
                  numero={8}
                  rotulo="Como ficou sabendo da Mostra?"
                  nome="soube"
                  multiplo
                  opcoes={COMO_SOUBE}
                  valor={form.soube}
                  aoMudar={alternarSoube}
                />
                {form.soube.includes('outros') && (
                  <input className={style.campo} aria-label="Por onde ficou sabendo?" placeholder="Onde?" value={form.soubeOutro} onChange={(e) => alterar('soubeOutro', e.target.value)} />
                )}
              </>
            )}

            {etapa === 2 && (
              <>
                {AVALIACOES.map(([campo, rotulo], i) => (
                  <div key={campo} className={style.grupo}>
                    <p className={style.rotulo}>
                      {9 + i}. {rotulo}
                    </p>
                    <BotoesNota pequeno nome={rotulo} valor={form[campo]} aoEscolher={(n) => alterar(campo, n)} />
                  </div>
                ))}
                <Opcoes
                  numero={13}
                  rotulo="Recomendaria a Mostra?"
                  nome="recomendacao"
                  opcoes={[['Sim', 'Sim'], ['Não', 'Não']]}
                  valor={form.recomendacao}
                  aoMudar={(v) => alterar('recomendacao', v)}
                />
                <label className={style.grupo}>
                  <span className={style.rotulo}>14. Comentário (opcional)</span>
                  <textarea className={`${style.campo} ${style.areaTexto}`} rows={4} value={form.comentario} onChange={(e) => alterar('comentario', e.target.value)} />
                </label>
              </>
            )}

            {erro && (
              <p className={style.erro} role="alert">
                {erro}
              </p>
            )}

            <div className={style.navegacao}>
              {etapa > 0 && (
                <button type="button" className="btn-claro" onClick={() => { setErro(''); setEtapa((e) => e - 1); }}>
                  VOLTAR
                </button>
              )}
              {etapa < ETAPAS.length - 1 ? (
                <button type="button" className="btn-preto" onClick={avancar}>
                  PRÓXIMO
                </button>
              ) : (
                <button type="button" className="btn-preto" onClick={enviar} disabled={enviando}>
                  {enviando ? 'ENVIANDO…' : 'ENVIAR'}
                </button>
              )}
            </div>

            <p className={style.progresso}>
              {etapa + 1} de {ETAPAS.length}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Campo({ numero, rotulo, valor, aoMudar, autoComplete }) {
  return (
    <label className={style.grupo}>
      <span className={style.rotulo}>
        {numero}. {rotulo}
      </span>
      <input className={style.campo} value={valor} onChange={(e) => aoMudar(e.target.value)} autoComplete={autoComplete} />
    </label>
  );
}

// Quadradinhos de escolha (única ou múltipla), no estilo da identidade
function Opcoes({ numero, rotulo, nome, opcoes, valor, aoMudar, multiplo = false }) {
  return (
    <fieldset className={style.grupo}>
      <legend className={style.rotulo}>
        {numero}. {rotulo}
      </legend>
      <div className={style.opcoes}>
        {opcoes.map(([v, texto]) => (
          <label key={v} className={style.opcao}>
            <input
              type={multiplo ? 'checkbox' : 'radio'}
              name={nome}
              value={v}
              checked={multiplo ? valor.includes(v) : valor === v}
              onChange={() => aoMudar(v)}
            />
            <span>{texto}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
