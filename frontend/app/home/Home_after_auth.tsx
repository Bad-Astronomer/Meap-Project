"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from 'axios';
import enhancePrompt from "./chat"; // Import Chat component

const Home_after_auth = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file
  const [filename, setFilename] = useState<string>(""); 
  const [prompt, setPrompt] = useState<string>(""); // Store the prompt input by the user
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert("Please select an image to upload.");
            return;
        }

        setFilename(file.name); // Update the filename state
        
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (typeof reader.result === "string") {
              setPreviewUrl(reader.result);
              setImageSelected(true);
              setSelectedFile(file); // Store the file in state
            }
        };
        reader.readAsDataURL(file);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
  };

  const handleEnhancePrompt = async () => {
    if (!inputRef.current || !inputRef.current.value) return; // Handle empty input gracefully

    const prompt = inputRef.current.value;
    const enhancedPrompt = await enhancePrompt(prompt); // Call Chat.enhancePrompt
    console.log(enhancedPrompt)
    inputRef.current.value = enhancedPrompt; // Update input with enhanced version
    setPrompt(enhancedPrompt)
  };

  const handleUpload = async () => {
    console.log(prompt)
        if (!selectedFile || !filename || !prompt) {
          alert("Please fill in all fields.");
          return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('filename', filename); // Append the filename
        formData.append('prompt', prompt); // Append the prompt

        // Send the file, filename, and prompt to the Flask backend
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          setPreviewUrl(`${process.env.NEXT_PUBLIC_FLASK_URL}/result/${response.data.filename}`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
          alert(error.response.data['error']);
        }
  };

  return (
      <div className="w-auto flex items-center justify-center gap-4 m-20">
        <div className="h-96 w-2/5 border border-neutral-700 rounded-xl relative p-8 backdrop-blur-[1px]">
          {imageSelected ? (
            <div className="relative h-full w-full">
              <Image
                src={previewUrl || ""}
                alt="Uploaded"
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <div className="relative flex items-center justify-center h-full w-full">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <p
                  className="text-neutral-600 text-5xl text-center"
                >
                  Click to add <br /> your image here!
                </p>
              </label>
            </div>
          )}
          <input
            id="imageUpload"
            type="file"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
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
          <button onClick={handleUpload} className="gradient-button basis-1/6 w-auto m-4 mt-0 font-bold py-2 px-4 rounded-xl text-zinc-900">
            Generate
          </button>
        </div>
      </div>
  );
};

export default Home_after_auth;
