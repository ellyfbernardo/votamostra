import axios from 'axios';
import clientPromise from '../../mongodb'; // Ajuste o caminho conforme sua estrutura

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('votamostra');

    if (!db) {
      throw new Error('Banco de dados não definido.');
    }

    const data = await request.json();
    const { cpf, latitude, longitude, colecao } = data; // Inclui CPF e Coleção para verificação

    // Obter data atual (apenas ano, mês e dia para comparação)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Verificar se o CPF já votou hoje na mesma coleção
    const existingVote = await db.collection('votes-23-11-teste').findOne({
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
    const result = await db.collection('votes-23-11-teste').insertOne({
      ...data, // Inclui os dados do voto (CPF, filmes, etc.)
      cidade: city, // Adiciona o nome da cidade
      horarioVoto: new Date(), // Adiciona o horário do voto
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
