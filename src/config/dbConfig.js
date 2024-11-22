import { MongoClient } from "mongodb";

export default async function conectarAoBanco(url) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(url);
        console.log("Conectando ao cluster do banco de dados...");

        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        return mongoClient;
    } catch (error) {
        console.error("Ocorreu um erro: ", error);
        process.exit();
    }
};