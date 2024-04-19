"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteCards() {
  return (
    <div className="h-[45rem] rounded-md flex flex-col antialiased items-center justify-center relative">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote: "This AI colorization tool is magical! It breathed new life into my faded family photos, bringing back vibrant memories in stunning color. The user-friendly controls made it a breeze to achieve the perfect results I envisioned.",
    name: "Sarah Jones, Photographer",
    title: "A Tale of Two Cities",
  },
  {
    quote: "As an artist, I was blown away by the level of detail and accuracy the colorization achieved. It captured the essence of the original black and white photographs while adding a whole new dimension of creativity. This tool is a game changer for restoring and reviving historical visuals.",
    name: "John Doe, Artist",
    title: "Hamlet",
  },
  {
    quote: "I'm not very tech-savvy, but this image colorization tool surprised me with its intuitive interface. Uploading and customizing colors was a breeze, and the results were incredible. Now I can easily add a pop of color to my old black and white photos and share them with family!",
    name: "Jane Smith, Hobbyist",
    title: "A Dream Within a Dream",
  },
  {
    quote: "The power of prompts in this tool is truly remarkable! I can use my artistic vision to guide the colorization and achieve unique, creative results. It's like having a virtual paintbrush that lets me explore endless possibilities for bringing my black and white photos to life in color.",
    name: "Michael Lee, Graphic Designer",
    title: "Pride and Prejudice",
  },
  // {
  //   quote:
  //     "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
  //   name: "Herman Melville",
  //   title: "Moby-Dick",
  // },
];
