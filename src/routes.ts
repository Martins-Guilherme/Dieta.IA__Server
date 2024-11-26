import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionControlles } from "./controllers/CreateNutritionControlles";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/test", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Guilherme",\n  "sexo": "Masculino",\n  "idade": 28,\n  "altura": 1.75,\n  "peso": 70,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "3 ovos inteiros",\n        "2 fatias de pao integral",\n        "1 colher de sopa de pasta de amendoim",\n        "1 banana"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n        "alimentos": [\n        "1 copo de iogurte grego",\n        "1/2 xicara de frutas vermelhas"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xicara de arroz integral",\n        "1 xicara de brócolis",\n        "1 colher de sopa de azeite"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "1 scoop de whey protein",\n        "1 fatia de pao integral",\n        "1 fatia de peito de peru"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de carne vermelha magra",\n        "1 xicara de batata doce",\n        "1 xicara de salada verde"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir (opcional)",\n      "alimentos":[\n        "Caseina (2 scoops)"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Whey protein",\n    "Creatina",\n    "BCAA",\n    "Multivitaminico"\n  ]\n}\n```';

    try {
      // Extrair JSON
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();
      let jsonObject = JSON.parse(jsonString);
      return reply.send({ data: jsonObject });
    } catch (error) {
      console.log(error);
    }

    reply.send({ ok: true });
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionControlles().handle(request, reply);
    }
  );
}
