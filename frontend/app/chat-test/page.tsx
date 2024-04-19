"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import enhancePrompt from "./chat"; // Import Chat component

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const Home_after_auth = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... image upload logic (unchanged)
  };

  // Fix: Use function call syntax for Chat.enhancePrompt
  const handleEnhancePrompt = async () => {
    if (!inputRef.current || !inputRef.current.value) return; // Handle empty input gracefully

    const prompt = inputRef.current.value;
    const enhancedPrompt = await enhancePrompt(prompt); // Call Chat.enhancePrompt
    console.log(enhancedPrompt)
    inputRef.current.value = enhancedPrompt; // Update input with enhanced version
  };

  return (
    <div className="w-auto flex items-center justify-center gap-4 m-20">
      <div className="h-96 w-2/5 border border-neutral-700 rounded-xl relative p-8 backdrop-blur-[1px]">
        {/* ... image upload section (unchanged) */}
      </div>
      <div className="h-96 w-1/6 block border border-neutral-700 rounded-xl flex flex-col backdrop-blur-[3px]">
        <div className="relative basis-5/6 w-auto m-4 rounded-xl bg-neutral-900 text-white">
          <textarea
            placeholder="Image of a golden retriever dog looking out the window into the autumn seasoned forest"
            className="resize-none w-full h-full p-4 bg-transparent border-non outline-none text-white"
            ref={inputRef} // Assign the ref to the input element
          />
          <button className="absolute gemini-button" onClick={handleEnhancePrompt}>
          <img // Replace with your logo filename
            src="/assets/gemini.png" // Adjust the path if your logo has a different extension
            alt="Enhance with Gemini"
            className="h-6 w-6 mr-2"
          />
          </button>
        </div>
        <button
          className="gradient-button basis-1/6 w-auto m-4 mt-0 font-bold py-2 px-4 rounded-xl text-zinc-900 flex items-center justify-center hover:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% transition-colors duration-200"
        >
            Generate
        </button>
      </div>
    </div>
  );
};

export default Home_after_auth;
