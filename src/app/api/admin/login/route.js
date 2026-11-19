import { COOKIE_ADMIN, DURACAO_LOGIN, adminConfigurado, gerarToken, senhaCorreta } from '../../../lib/admin';

export async function POST(request) {
  if (!adminConfigurado()) {
    return new Response('Defina ADMIN_SENHA nas variáveis de ambiente', { status: 503 });
  }

  let senha;
  try {
    ({ senha } = await request.json());
  } catch {
    return new Response('Requisição inválida', { status: 400 });
  }

  if (!senhaCorreta(senha)) {
    // Atrasa a resposta para dificultar tentativas em sequência
    await new Promise((r) => setTimeout(r, 1000));
    return new Response('Senha incorreta', { status: 401 });
  }

  const resposta = new Response(null, { status: 204 });
  resposta.headers.append(
    'Set-Cookie',
    [
      `${COOKIE_ADMIN}=${gerarToken()}`,
      'Path=/',
      `Max-Age=${DURACAO_LOGIN}`,
      'HttpOnly',
      'SameSite=Strict',
      ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
    ].join('; ')
  );
  return resposta;
}
