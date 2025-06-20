import { DataProps } from "../controllers/CreateNutritionControlles";
import { GoogleGenAI as GoogleGenerativeAI } from "@google/genai";

class CreateNutritionService {
  async execute({
    name,
    weight,
    age,
    height,
    gender,
    level,
    objective,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI({ apiKey: process.env.API_KEY! });

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`,
      });
      console.log(JSON.stringify(response, null, 2));

      if (response && response.candidates) {
        const jsonText = response.text as string;
        // Extrair JSON
        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();
        let jsonObject = JSON.parse(jsonString);
        return { data: jsonObject };
      }
    } catch (error) {
      console.error("Erro JSON", error);
      throw new Error("Failed create");
    }
  }
}

export { CreateNutritionService };
