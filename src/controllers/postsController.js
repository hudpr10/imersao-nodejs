import fs from "fs";
import { getAllPosts, createNewPost, putPost, deletePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function criarPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await createNewPost(novoPost); // coloca la no banco de dados
        res.status(200).json(postCriado);
    } catch (error) {
        console.error("Ocorreu um erro: ", error.message);
        res.status(500).json({"erro": "falha na requisição."});
    }
}

export async function enviarComImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        imgAlt: ""
    };

    try {
        const postCriado = await createNewPost(novoPost); // coloca la no banco de dados

        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg` // novo nome da imagem
        fs.renameSync(req.file.path, imagemAtualizada); // renomeando a imagem quando inserida na pasta
        
        res.status(200).json(postCriado);
    } catch (error) {
        console.error("Ocorreu um erro: ", error.message);
        res.status(500).json({"erro": "falha na requisição."});
    }
}

export async function atualizarPost(req, res) {
    const id = req.params.id
    const postNovo = req.body

    try {
        const resultado = await putPost(id, postNovo);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Ocorreu um erro: ", error.message);
        res.status(500).json({"erro": "falha na requisição."});
    }
}

export async function atualizarComImagem(req, res) {
    const id = req.params.id
    const imgUrl = `http://localhost:3000/${id}.jpg`
 
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        
        const postAtualizado = {
            imgUrl: imgUrl,
            descricao: descricao,
            imgAlt: req.body.imgAlt
        };

        const postCriado = await putPost(id, postAtualizado);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error("Ocorreu um erro: ", error.message);
        res.status(500).json({"erro": "falha na requisição."});
    }
}

export async function apagarPost(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const resultado = await deletePost(id);
        res.status(200).json(resultado);
    } catch(erro) {
        console.log("Falha ao deletar post: ", erro);
        res.status(500).json({"erro": "Falha na requisição"})
    }
}