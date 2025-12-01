import { GoogleGenAI, Type } from "@google/genai";
import { AppItem } from "../types";

export const searchAppsWithGemini = async (query: string): Promise<AppItem[]> => {
  if (!query) return [];

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 5 mobile app ideas or existing popular apps that match this search query: "${query}". 
      Return them in strict JSON format. Use Arabic for all text fields.
      For the iconUrl, just use a placeholder text like 'Icon'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              developer: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              downloads: { type: Type.STRING },
              iconUrl: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["id", "title", "developer", "rating", "downloads", "description", "category"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const rawData = JSON.parse(jsonText);
    
    // Enrich with valid icon URLs since the AI only gives text
    return rawData.map((item: any, index: number) => ({
      ...item,
      id: `ai-${Date.now()}-${index}`,
      iconUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${item.title}&backgroundColor=22c55e`
    }));

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};