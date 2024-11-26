import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import { routes } from "./routes"

const app = Fastify({ logger: true });
dotenv.config();

app.setErrorHandler((error, request, response) => {
  response.code(400).send({ message: error.message });
});

const start = async () => {
  // Registrando a rota para todos usiarios poderem acessar
  app.register(cors);
  // Registrando a rota
  app.register(routes);

  try {
    await app.listen({port: 3333, host: "0.0.0.0"})
    console.log(`Servidor rodando no servidor http://localhost:3333`);
    
  } catch (error) {
    console.log(error);
  }
};

start();