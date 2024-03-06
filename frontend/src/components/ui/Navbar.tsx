"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
// import Link from "next/link";
import { Link } from "react-router-dom";


export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      // let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.1) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 2,
          type: "spring", 
          stiffness: 100
        }}
        className={cn(
          "flex max-w-fit backdrop-blur-md fixed top-8 inset-x-0 mx-auto border border-neutral-700 rounded-full  bg-white/15  z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4 font-medium text-white",
          className

          //sticky top-2 w-auto mx-auto mt-4 flex gap-4 items-center rounded-full border border-white border-opacity-10 bg-white bg-opacity-8 backdrop-blur-md p-2 pl-6
        )}
      >
        {/* <span className="hidden sm:block">Meap</span> */}
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-white-600 hover:text-neutral-400 transition-colors duration-200"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <button className=" border border-transparent text-sm font-medium relative  text-white
          px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200">
          <span>Logout</span>
          {/* <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" /> */}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
