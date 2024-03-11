"use client";
import React from "react";
import { Label } from "@/app/_components/ui/Label";
import { Input } from "@/app/_components/ui/Input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div>
        <div className="my-12 text-neutral-200 text-5xl font-bold flex items-center meap-header justify-center w-full">
                    Sign Up for Meap
                </div> 
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black border border-neutral-800 m-8 mb-12">
        <h2 className="font-bold text-xl text-neutral-200">
            Welcome to Meap
        </h2>
        <p className="text-sm max-w-sm mt-2 text-neutral-300">
            Login to aceternity if you can because we don&apos;t have a login flow
            yet
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
            {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Durden" type="text" />
            </LabelInputContainer>
            </div> */}
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Username</Label>
            <Input id="email" placeholder="Meap" type="username" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="meap@gmail.com" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            

            <button
            className="border border-transparent text-sm font-medium relative text-white px-4 py-2 rounded-full bg-black hover:border hover:border-neutral-500 transition-colors duration-200"
            //   className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            >
            Sign up &rarr;
            <BottomGradient />
            </button>

            {/* <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

            {/* <div className="flex flex-col space-y-4">
            <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
            >
                <IconBrandGithub className="h-4 w-4 text-neutral-300" />
                <span className="text-neutral-300 text-sm">
                GitHub
                </span>
                <BottomGradient />
            </button>
            <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
            >
                <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
                <span className="text-neutral-300 text-sm">
                Google
                </span>
                <BottomGradient />
            </button>
            <button
                className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
            >
                <IconBrandOnlyfans className="h-4 w-4 text-neutral-300" />
                <span className="text-neutral-300 text-sm">
                OnlyFans
                </span>
                <BottomGradient />
            </button>
            </div> */}
        </form>
        </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
