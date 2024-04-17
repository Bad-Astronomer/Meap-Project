"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { signIn, signOut, useSession } from "next-auth/react";

const NavbarButtons = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
      <div className="flex space-x-4">
        <Link href="/home" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">Home</Link>
        <Link href="/" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">Tutorial</Link>
        <Link href="/gallery" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">My Gallery</Link>
        <Link href="/about_us" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">About Us</Link>
      </div>
      <Link
        href={"/login"}
        className={cn(
          // "border border-transparent text-sm font-medium relative  text-white px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200"
          "border border-transparent text-sm font-medium relative text-white px-4 mx-8 py-2 rounded-full hover:border hover:border-neutral-500 transition-colors duration-200 bg-neutral-800"
        )}
        onClick={() => signOut()}
      >
        <span>Logout</span>
      </Link>
      </>
    );
  }
  return (
    <>
      <div className="flex space-x-4">
        <Link href="/home" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">Home</Link>
        <Link href="/" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">Tutorial</Link>
        <Link href="/gallery" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">Gallery</Link>
        <Link href="/about_us" className="relative items-center flex space-x-1 text-neutral-400 hover:text-white transition-colors duration-200">About Us</Link>
      </div>
      <div>
      <Link
        href={"/signup"}
        className={cn(
          "border border-transparent text-sm font-medium relative  text-white px-4 py-2 rounded-full  hover:text-neutral-400"
        )}
      >
        <span>Sign Up</span>
      </Link>
      <Link
        href={"/login"}
        className={cn(
          // "border border-transparent text-sm font-medium relative  text-white px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200"
          "border border-transparent text-sm font-medium relative text-white px-4 py-2 rounded-full hover:border hover:border-neutral-500 transition-colors duration-200 bg-neutral-800"
        )}
      >
        <span>Login</span>
      </Link>
      </div>
    </>
  );
};

export const Navbar = () => {
  return (
    <div className="h-20 flex items-center justify-between px-8 text-white border border-neutral-800 border-b-neutral-800 border-x-0 border-t-0 ">
      {/* <div className="flex justify-between"> */}
      <Link href={"/home"} className="font-bold text-xl px-12 meap-header">
        Meap
      </Link>
      <NavbarButtons/>
    </div>
  );
};
