"use client";
import React from "react"; // No longer needed here

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Define your specific prompt customization here (replace the placeholder)
const ENHANCE_PROMPT = "Given a user prompt, reframe it such that it gives the best prompt for a stable diffusion model with controlNet, but as short as possible in plaintext:";

export async function enhancePrompt(prompt: string) {
  if (!prompt) return prompt; // Handle empty input gracefully

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const generationConfig = {
    temperature: 0.6, // Adjust for creativity vs. coherence
    topK: 1,
    topP: 1,
    maxOutputTokens: 128, // Adjust for desired output length
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const combinedPrompt = `${ENHANCE_PROMPT}\n user prompt: ${prompt}\n answer:`; // Prepend your customization

  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(combinedPrompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    return prompt; // Fallback to original prompt on error
  }
}

export default enhancePrompt;
