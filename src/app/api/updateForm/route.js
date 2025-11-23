import clientPromise from "../../mongodb";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("votos-2025");

    const data = await request.json();
    const { cpf, form } = data;

    if (!cpf || !form) {
      return new Response("CPF e form são obrigatórios", { status: 400 });
    }

    // Atualiza apenas o campo "form", filtrando pelo CPF
    const update = await db.collection("23-11").updateOne(
      { cpf },             // filtro
      { $set: { form } }   // atualização do campo
    );

    if (update.matchedCount === 0) {
      return new Response("CPF não encontrado", { status: 404 });
    }

    return new Response("Formulário atualizado com sucesso!", { status: 200 });

  } catch (error) {
    console.error("Erro ao atualizar formulário:", error);
    return new Response("Erro interno no servidor", { status: 500 });
  }
}
