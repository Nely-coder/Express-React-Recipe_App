import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from your .env file");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Recipe API is running!" });
});

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      ingredients.some((item) => typeof item !== "string" || !item.trim())
    ) {
      return res.status(400).json({
        error: "Please provide a non-empty array of ingredients.",
      });
    }

    if (ingredients.length > 30) {
      return res.status(400).json({
        error: "Please provide no more than 30 ingredients.",
      });
    }

    const ingredientsString = ingredients.map((item) => item.trim()).join(", ");

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `You are a chef assistant. Create one recipe using these ingredients: ${ingredientsString}. Include a recipe title, ingredients list, and step-by-step cooking instructions. Respond in Markdown.`,
      config: {
        maxOutputTokens: 4096,
      },
    });
    console.log("Finish reason:", response.candidates?.[0]?.finishReason);
    console.log("Recipe length:", response.text?.length);

    const recipe = response.text;

    if (!recipe) {
      return res.status(502).json({
        error: "The AI did not return a recipe. Please try again.",
      });
    }

    res.json({ recipe });
  } catch (error) {
    console.error("Recipe generation failed:", error);

    res.status(500).json({
      error: "Unable to generate a recipe right now. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
