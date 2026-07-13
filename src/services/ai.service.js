const { GoogleGenerativeAI } = require("@google/generative-ai");
const ReviewPrompt = require("../services/prompt.service");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeCode(language, code) {
  const prompt = ReviewPrompt(language, code);
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

  let result;
  let text;

  try {
    result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("No response received from Gemini.");
    }

    text = result.response.text();

    if (!text || typeof text !== "string") {
      throw new Error("Empty or invalid response text from Gemini.");
    }

    
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    return parsed;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Invalid JSON received from AI: " + text);
    }
    throw new Error("Gemini analysis failed: " + err.message);
  }
}

module.exports = { analyzeCode };