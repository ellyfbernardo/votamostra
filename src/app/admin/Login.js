'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './admin.module.css';

export function Login() {
  const router = useRouter();
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

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
      <input
        id="senha"
        type="password"
        className={style.campoLogin}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        autoComplete="current-password"
        autoFocus
        required
      />

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
