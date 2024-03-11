import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export const Navbar = () => {
  return (
    <div className="h-14 flex items-center justify-between px-8 text-white border border-neutral-800 border-b-neutral-800 ">
      {/* <div className="flex justify-between"> */}
        <div>Meapesh</div>   
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
                    "border border-transparent text-sm font-medium relative text-white px-4 py-2 rounded-full hover:border hover:border-neutral-500 transition-colors duration-200 bg-neutral-700 backdrop-blur-md "
                )}
            >
                <span>Login</span>
            </Link>
        </div> 
      {/* </div> */}
    </div>
  );
};
