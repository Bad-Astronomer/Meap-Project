"use client";
import React from "react";
import { StickyScroll } from "../_components/ui/sticky-scroll-reveal";
import Image from "next/image";

export function page() {
  const content = [
    {
      title: "Bring Black & White Photos to Life",
      description:
        "Transform your black and white photos with AI-powered colorization. Upload your image and provide detailed prompts to achieve your desired color scheme using Stable Diffusion and ControlNet technologies.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Colorize with AI
        </div>
      ),
    },
    {
      title: "Fine-tune with Prompts",
      description:
        "Go beyond basic colorization! Craft detailed prompts to guide the AI towards your vision. Specify colors, textures, and styles for a truly customized result.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Prompt Tuning for Image Colorization
        </div>
        // <div className="h-full w-full flex items-center justify-center text-white">
        //   <Image
        //     src="/prompt-tuning.svg" // Replace with an image representing prompt tuning (optional)
        //     width={300}
        //     height={300}
        //     className="h-full w-full object-cover"
        //     alt="Prompt tuning for image colorization"
        //   />
        // </div>
      ),
    },
    {
      title: "Powered by Stable Diffusion & ControlNet",
      description:
        "Leverage the cutting-edge capabilities of Stable Diffusion and ControlNet models. These AI models generate high-quality colorizations faithful to your artistic vision.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Stable Diffusion & ControlNet
        </div>
      ),
    },
    {
      title: "Unleash Creativity",
      description:
        "Breathe new life into your black and white photos. Explore endless possibilities with AI-powered colorization and bring your creative vision to reality.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Unleash Creativity
        </div>
      ),
    },
    
  ];
  return (
    <div className="p-8">
      <StickyScroll content={content} />
    </div>
  );
}

export default page;
