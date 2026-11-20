'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './admin.module.css';

export function Login() {
  const router = useRouter();
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setErro('');
    setEntrando(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      setErro(res.status === 401 ? 'Senha incorreta.' : 'Não foi possível entrar. Tente de novo.');
    } catch {
      setErro('Sem conexão. Verifique a internet.');
    }
    setEntrando(false);
  };

  return (
    <form className={style.caixaLogin} onSubmit={entrar}>
      <h1 className={style.tituloLogin}>PAINEL DA VOTAÇÃO</h1>
      <p className={style.textoLogin}>13ª Mostra de Cinema de Gostoso</p>

      <label className={style.rotuloLogin} htmlFor="senha">
        Senha
      </label>
      <div className={style.campoSenha}>
        <input
          id="senha"
          type={mostrar ? 'text' : 'password'}
          className={style.campoLogin}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          required
        />
        <button
          type="button"
          className={style.verSenha}
          onClick={() => setMostrar((m) => !m)}
          aria-label={mostrar ? 'Esconder senha' : 'Mostrar senha'}
          aria-pressed={mostrar}
          title={mostrar ? 'Esconder senha' : 'Mostrar senha'}
        >
          {mostrar ? <IconeOlhoFechado /> : <IconeOlho />}
        </button>
      </div>

      {erro && (
        <p className={style.erro} role="alert">
          {erro}
        </p>
      )}

      <button type="submit" className="btn-verde" disabled={entrando || !senha} aria-busy={entrando}>
        {entrando ? 'ENTRANDO…' : 'ENTRAR'}
      </button>
    </form>
  );
}

function IconeOlho() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconeOlhoFechado() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M2 2l20 20" />
    </svg>
  );
}
