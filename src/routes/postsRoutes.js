import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { listarPosts, criarPost, enviarComImagem, atualizarPost, atualizarComImagem, apagarPost } from '../controllers/postsController.js';

// Apenas para windows funcionar, salva o nome da imagem do jeito certo
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

const corsConfig = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

function routes(app) {
    // Permite que o servidor interprete requisições com o corpo JSON
    app.use(express.json());
    app.use(cors(corsConfig))

    app.get("/posts", listarPosts);

    app.post("/posts", criarPost);
    app.put("/posts/:id", atualizarPost);
    app.delete("/posts/:id", apagarPost);

    app.post("/upload", upload.single("imagem"), enviarComImagem);
    app.put("/upload/:id", atualizarComImagem)
};

export default routes;
