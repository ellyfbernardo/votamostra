// Validações compartilhadas. As rotas de API validam tudo que chega do navegador
// por aqui antes de gravar no banco.

export const BANCO = 'mostra-2026';
export const COLECAO_VOTOS = 'votos';

export function cpfValido(cpf) {
  if (typeof cpf !== 'string' || !/^\d{11}$/.test(cpf) || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const digito = (tamanho) => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}

export function notaValida(valor) {
  return Number.isInteger(valor) && valor >= 1 && valor <= 5;
}

export function coordenadaValida(valor, limite) {
  return typeof valor === 'number' && Number.isFinite(valor) && Math.abs(valor) <= limite;
}

// Texto curto e limpo; qualquer coisa que não seja string vira ''.
export function texto(valor, max = 200) {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

// Lista de textos (ex.: checkboxes "como ficou sabendo").
export function listaDeTextos(valor, maxItens = 10, max = 100) {
  if (!Array.isArray(valor)) return [];
  return valor.slice(0, maxItens).map((v) => texto(v, max)).filter(Boolean);
}

export function objetoSimples(valor) {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
}

// 12345678901 -> 123.456.789-01 (enquanto a pessoa digita)
export function formatarCPF(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
