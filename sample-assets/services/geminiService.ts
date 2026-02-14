
import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the place" },
    location: { type: Type.STRING, description: "Detailed location in Sleman/Jogja" },
    description: { type: Type.STRING, description: "Brief aesthetic description" },
    rating: { type: Type.STRING, description: "Rating score e.g. 4.8" },
    reviews: { type: Type.STRING, description: "Review count e.g. 200+" },
    image: { type: Type.STRING, description: "Search query for an image of this place" },
    pros: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of pros"
    },
    cons: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of cons"
    },
    priceRange: { type: Type.STRING, description: "Price range in IDR" },
    recommendationFor: { type: Type.STRING, description: "Target audience" },
    mapLink: { type: Type.STRING, description: "Google Maps URL search query" }
  },
  required: ["name", "location", "description", "rating", "reviews", "image", "pros", "cons", "priceRange", "recommendationFor"]
};

export const getTravelResponse = async (prompt: string): Promise<AIRecommendation | string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are Joko, an expert AI travel guide for Yogyakarta. You provide helpful, localized, and visually descriptive advice. If asked for a recommendation, return a structured JSON response about one specific place. If it's a general question, just return text.",
        responseMimeType: "application/json",
        responseSchema: recommendationSchema
      }
    });

    const text = response.text;
    if (!text) return "Maaf, saya tidak bisa menemukan informasi tersebut.";
    
    try {
      return JSON.parse(text) as AIRecommendation;
    } catch (e) {
      return text;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten AI.";
  }
};
