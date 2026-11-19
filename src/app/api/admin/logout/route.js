import { COOKIE_ADMIN } from '../../../lib/admin';

export async function POST() {
  const resposta = new Response(null, { status: 204 });
  resposta.headers.append('Set-Cookie', `${COOKIE_ADMIN}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`);
  return resposta;
}
