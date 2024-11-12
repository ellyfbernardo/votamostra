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

    const { latitude, longitude } = data; // Supondo que as coordenadas estejam sendo enviadas do front-end

    // Chave de API da OpenCage (substitua pela sua chave)
    const apiKey = '097f8b8e3eb84efb943bfc47259c32bf';

    // Fazendo chamada para OpenCage Geocoder para obter o nome da cidade
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);

    const city = response.data.results[0].components.city || response.data.results[0].components.town || response.data.results[0].components.village;

    if (!city) {
      throw new Error('Não foi possível encontrar o nome da cidade.');
    }

    // Insere os dados no banco de dados, incluindo a cidade

    // COLEÇÃO DE TESTE ('votes')
    // COLEÇÕES DE PRODUÇÃO ('votes-23-11', 'votes-24-11', 'votes-25-11')
    const result = await db.collection('votes').insertOne({
      ...data, // Inclui os dados do voto (CPF, filmes, etc.)
      cidade: city, // Adiciona o nome da cidade
      horarioVoto: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), // Adiciona o horário do voto
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
