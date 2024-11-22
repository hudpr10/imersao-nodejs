import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conectar ao banco de dados
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Funcão assincrôna para buscar todos os dados
export async function getAllPosts() {
    const db = conexao.db("imersao-instabytes"); // Conecta a tabela do banco
    const colecao = db.collection("posts"); // Conecta a coleção da tabela
  
    return colecao.find().toArray();
};

export async function createNewPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost); // o banco retorna algo...
} 

export async function putPost(id, updates) {
    const objId = ObjectId.createFromHexString(id);

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: updates });
} 

export async function deletePost(id) {
    const objId = ObjectId.createFromHexString(id);

    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    return colecao.deleteOne({ _id: new ObjectId(objId)})
}