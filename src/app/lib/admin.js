// Acesso ao painel /admin: senha em ADMIN_SENHA (variável de ambiente).
// Depois do login, o navegador guarda um cookie assinado com a própria senha;
// trocar a ADMIN_SENHA desconecta todo mundo. Só roda no servidor.
import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE_ADMIN = 'votamostra_admin';
export const DURACAO_LOGIN = 60 * 60 * 24 * 7; // 7 dias, em segundos

const senhaConfigurada = () => process.env.ADMIN_SENHA || '';
export const adminConfigurado = () => senhaConfigurada().length > 0;

const assinar = (valor) => createHmac('sha256', senhaConfigurada()).update(valor).digest();

function iguais(a, b) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function senhaCorreta(senha) {
  if (!adminConfigurado() || typeof senha !== 'string') return false;
  // Compara as assinaturas (mesmo tamanho), sem revelar nada pelo tempo de resposta
  return iguais(assinar(`senha:${senha}`), assinar(`senha:${senhaConfigurada()}`));
}

export function gerarToken() {
  return assinar('painel-votamostra').toString('hex');
}

export function tokenValido(token) {
  if (!adminConfigurado() || typeof token !== 'string') return false;
  return iguais(Buffer.from(token), Buffer.from(gerarToken()));
}

// Para as rotas /api/admin/*
export function requisicaoAutorizada(request) {
  return tokenValido(request.cookies.get(COOKIE_ADMIN)?.value);
}
