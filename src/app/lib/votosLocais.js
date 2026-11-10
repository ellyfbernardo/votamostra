// Guarda no navegador os votos e o CPF de cada sessão enquanto a pessoa vota.
// O localStorage pode estar bloqueado (aba anônima etc.), então tudo fica em try/catch.

function ler(chave, padrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor === null ? padrao : JSON.parse(valor);
  } catch {
    return padrao;
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {}
}

function remover(chave) {
  try {
    localStorage.removeItem(chave);
  } catch {}
}

// Votos: { [idDoFilme]: nota }
export const lerVotos = (sessao) => ler(`votos:${sessao}`, {});
export const salvarVotos = (sessao, votos) => gravar(`votos:${sessao}`, votos);
export const limparVotos = (sessao) => remover(`votos:${sessao}`);

// CPF usado no voto, para vincular a pesquisa de satisfação
export const lerCpf = (sessao) => ler(`cpf:${sessao}`, null);
export const salvarCpf = (sessao, cpf) => gravar(`cpf:${sessao}`, cpf);

// Se a pesquisa de satisfação já foi respondida nessa sessão
export const pesquisaRespondida = (sessao) => ler(`pesquisa:${sessao}`, false);
export const marcarPesquisaRespondida = (sessao) => gravar(`pesquisa:${sessao}`, true);
