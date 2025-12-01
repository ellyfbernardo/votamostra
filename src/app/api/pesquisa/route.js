import clientPromise from '../../mongodb';

export async function POST(request) {
  try {
    const body = await request.json();

    // Conexão com o banco
    const client = await clientPromise;
    const db = client.db("votos-2025");
    const collection = db.collection("pesquisa-pos-2025");

    // Insere o documento
    await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar pesquisa:", error);
    return new Response("Erro interno", { status: 500 });
  }
}
