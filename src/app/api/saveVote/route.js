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
    const db = client.db('votamostra');

    if (!db) {
      throw new Error('Banco de dados não definido.');
    }

    const data = await request.json();
    const { cpf, latitude, longitude, colecao } = data; // Inclui CPF e Coleção para verificação

    // Obter data atual (horário de Brasília)
    const today = getBrasiliaTime();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Verificar se o CPF já votou hoje na mesma coleção
    const existingVote = await db.collection('votes-25-11').findOne({
      cpf,
      colecao, // Verifica se votou na coleção específica
      horarioVoto: { $gte: startOfDay, $lte: endOfDay }, // Verifica votos no intervalo do dia
    });

    if (existingVote) {
      return new Response("CPF já votou nesta coleção hoje", { status: 409 });
    }

    // Chave de API da OpenCage (substitua pela sua chave)
    const apiKey = '097f8b8e3eb84efb943bfc47259c32bf';

    // Fazendo chamada para OpenCage Geocoder para obter o nome da cidade
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);

    const city = response.data.results[0].components.city || response.data.results[0].components.town || response.data.results[0].components.village;

    if (!city) {
      throw new Error('Não foi possível encontrar o nome da cidade.');
    }

    // Insere os dados no banco de dados, incluindo a cidade, horário do voto e coleção
    const result = await db.collection('votes-25-11').insertOne({
      ...data, // Inclui os dados do voto (CPF, filmes, etc.)
      cidade: city, // Adiciona o nome da cidade
      horarioVoto: getBrasiliaTime(), // Adiciona o horário do voto em horário de Brasília
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    if (error.code === 11000) {
      return new Response("CPF já votou", { status: 409 });
    }
    return new Response("Erro ao salvar o voto", { status: 500 });
  }
};