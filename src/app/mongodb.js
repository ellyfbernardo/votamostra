import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // A URI deve ser uma variável de ambiente
const options = {};

if (!uri) {
  throw new Error('Por favor, adicione sua URI do MongoDB ao arquivo .env');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Cache da conexão durante o desenvolvimento
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Cria uma nova conexão em produção
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;