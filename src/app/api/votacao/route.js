import { lerControle } from '../../lib/controle';

export const dynamic = 'force-dynamic';

// Público: qual votação está aberta. A tela inicial consulta para liberar o
// botão VOTAR sozinha, sem a pessoa precisar recarregar a página.
// Guarda a resposta por alguns segundos para não consultar o banco a cada celular.
let cache = { valor: null, ate: 0 };

export async function GET() {
  try {
    if (Date.now() > cache.ate) {
      const { aberta } = await lerControle();
      cache = { valor: aberta, ate: Date.now() + 4000 };
    }
    return Response.json({ aberta: cache.valor }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Erro ao ler a votação aberta:', error);
    return new Response('Erro', { status: 500 });
  }
}
