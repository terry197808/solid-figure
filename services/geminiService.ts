import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, ShapeType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateShapeRiddle = async (shape: ShapeType): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Output a simple, fun riddle for a Grade 1 student (approx 7 years old) in Chinese about a "${shape}". 
    The riddle should describe its features (corners, rolling ability, flat faces) without naming it directly.
    Keep it under 30 words. Do not include the answer.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "这也是一种神奇的形状！";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "它是方方正正的，还是圆圆滚滚的呢？猜猜看！";
  }
};

// Define varied scenarios to prevent repetitive questions
const QUESTION_SCENARIOS = [
  "REAL_WORLD: Name a specific common object (e.g., soda can, dice, orange, traffic cone, shoebox, tissue box) and ask what shape it is.",
  "FEATURES: Describe specific features (e.g., 'I have 6 flat square faces', 'I have a pointy top and round bottom', 'I have no corners') and ask to identify the shape.",
  "ACTION: Ask about physical properties like 'Which shape can roll easily?', 'Which shape can stack well?', 'Which shape can roll AND stack?'.",
  "ODD_ONE_OUT: List 3 objects that are the same shape and 1 that is different, ask which one is different.",
  "COMPARE: Ask a simple comparison, e.g., 'Which shape has a round bottom like a Cylinder but a pointy top?'"
];

// Fallback pool for instant load on error or extreme latency
const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    question: "下面哪个物体是圆柱体？",
    options: ["篮球", "魔方", "可乐罐", "雪糕筒"],
    correctAnswer: "可乐罐",
    explanation: "可乐罐上下一样粗，上下都是圆圆的平面，侧面是曲面。"
  },
  {
    question: "魔方是什么形状的？",
    options: ["长方体", "正方体", "球体", "圆锥体"],
    correctAnswer: "正方体",
    explanation: "魔方的六个面都是一样大的正方形，所以它是正方体。"
  },
  {
    question: "下面哪个形状最容易滚动？",
    options: ["正方体", "长方体", "球体", "圆锥体"],
    correctAnswer: "球体",
    explanation: "球体圆圆滚滚的，没有平平的面，所以最容易滚动。"
  },
  {
    question: "生日帽通常是什么形状？",
    options: ["圆柱体", "圆锥体", "正方体", "球体"],
    correctAnswer: "圆锥体",
    explanation: "生日帽底面是圆的，上面是尖尖的，这是圆锥体的特点。"
  },
  {
    question: "牙膏盒通常是什么形状？",
    options: ["正方体", "长方体", "圆柱体", "球体"],
    correctAnswer: "长方体",
    explanation: "牙膏盒长长方方的，相对的面一样大，是长方体。"
  }
];

export const generateQuizQuestion = async (): Promise<QuizQuestion> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Randomly select a scenario
    const scenario = QUESTION_SCENARIOS[Math.floor(Math.random() * QUESTION_SCENARIOS.length)];

    const prompt = `Generate a multiple-choice math question for a 1st grader (approx 7 years old) about 3D shapes (Cube, Cuboid, Cylinder, Sphere, Cone).
    
    Current Question Scenario: "${scenario}"
    
    Ensure the language is simple Chinese suitable for a 7-year-old.
    
    Return strictly JSON matching this schema:
    {
      "question": "string (Chinese)",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string (must be one of the options)",
      "explanation": "string (short explanation for a child)"
    }`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          }
        }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response");
    
    // Sanitize
    text = text.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(text);

    // Validate
    if (!parsed.question || !Array.isArray(parsed.options) || !parsed.correctAnswer) {
        throw new Error("Invalid response format");
    }
    
    return parsed as QuizQuestion;
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    // Return a random fallback question
    return FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
  }
};