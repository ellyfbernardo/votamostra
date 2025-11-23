import axios from 'axios';
import clientPromise from '../../mongodb'; // Ajuste o caminho conforme sua estrutura

// Função para obter a data e hora no fuso horário de Brasília
const getBrasiliaTime = () => {
  const now = new Date();

  // Obtém o timestamp em milissegundos, ajustando para o fuso horário de Brasília (-3 horas)
  const brasiliaOffset = -3 * 60; // Brasília está em GMT-3
  const adjustedTime = new Date(now.getTime() + brasiliaOffset * 60 * 1000);

  return adjustedTime;
};

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('votos-2025');

    if (!db) {
      throw new Error('Banco de dados não definido.');
    }

    const data = await request.json();
    const { cpf, latitude, longitude, colecao } = data;

    // Obter data atual (horário de Brasília)
    const today = getBrasiliaTime();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Verificar se o CPF já votou hoje na mesma coleção
    const existingVote = await db.collection('22-11').findOne({
      cpf,
      colecao,
      horarioVoto: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingVote) {
      return new Response("CPF já votou nesta sessão hoje", { status: 409 });
    }

    // Chave de API da OpenCage
    const apiKey = '5336e6530fa54435b5caa6e2b99ffc18';

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );

    const city =
      response.data.results[0].components.city ||
      response.data.results[0].components.town ||
      response.data.results[0].components.village;

    if (!city) {
      throw new Error('Não foi possível encontrar o nome da cidade.');
    }

    // Insere os dados no banco, incluindo cidade e horário
    const result = await db.collection('22-11').insertOne({
      ...data,
      cidade: city,
      horarioVoto: getBrasiliaTime(),
      form:null,
    });

    return new Response(JSON.stringify(result), { status: 200 });

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);

    if (error.code === 11000) {
      return new Response("CPF já votou", { status: 409 });
    }

    return new Response("Erro ao salvar o voto", { status: 500 });
  }
}
