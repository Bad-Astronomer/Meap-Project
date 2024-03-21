"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";


const NavbarButtons = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Link
        href={"/login"}
        className={cn(
          "border border-transparent text-sm font-medium relative text-white px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200"
        )}
        onClick={() => signOut()}
      >
        <span>Logout</span>
      </Link>
    );
  }
  return (
      <Link
        href={"/login"}
        className={cn(
          "border border-transparent text-sm font-medium relative text-white px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200"
        )}
      >
        <span>Login</span>
      </Link>
  );
};


export const NavbarFloating = ({
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
  useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY >= 80){
          setVisible(true);
        }
        else{
          setVisible(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const [visible, setVisible] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
        }}
        transition={{
          duration: 2,
          type: "spring", 
          stiffness: 300,
          damping: 23,
        }}
        className={cn(
          "flex max-w-fit backdrop-saturate-50 backdrop-blur-md fixed top-5 inset-x-0 mx-auto border border-neutral-700 rounded-full  bg-white/15  z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4 font-medium text-white",
          className

          //sticky top-2 w-auto mx-auto mt-4 flex gap-4 items-center rounded-full border border-white border-opacity-10 bg-white bg-opacity-8 backdrop-blur-md p-2 pl-6
        )}
      >
        {/* <span className="hidden sm:block">Meap</span> */}
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-white-600 hover:text-neutral-400 transition-colors duration-200"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <NavbarButtons/>
      </motion.div>
    </AnimatePresence>
  );
};
