"use client";
import Image from "next/image";
import { useState } from "react";

const Home_after_auth = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
        setImageSelected(true);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-auto flex items-center justify-center gap-4 m-8">
      <div className="h-96 w-2/5 border border-neutral-700 rounded-xl relative p-8">
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
          <div className="relative flex items-center justify-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <p
                className="text-neutral-600 text-6xl"
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
      <div className="h-96 w-1/6 block border border-neutral-700 rounded-xl flex flex-col">
        <div className="basis-5/6 w-auto m-4 rounded-xl text-black bg-neutral-900 text-white">
          <textarea
            placeholder="Quick brown fox jumps over the lazy dog"
            className=" resize-none w-full h-full p-4 bg-transparent border-none text-black outline-none text-white"
          ></textarea>
        </div>
        <button className="bg-neutral-900 basis-1/6 w-auto m-4 mt-0 text-neutral-200 font-bold py-2 px-4 rounded-xl">
          Generate
        </button>
        {/* <button className="bg-neutral-200 basis-1/6 w-auto m-4 mt-0 text-neutral-800 font-bold py-2 px-4 rounded-xl">
          Generate
        </button> */}
      </div>
    </div>
  );
};

export default Home_after_auth;
