import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();

app.use(express.static("uploads")); // a pasta se torna publica para qualquer um acessar

routes(app);

// Inicia o servidor na porta 3000; localhost:3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});
