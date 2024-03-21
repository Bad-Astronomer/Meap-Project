"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Home_after_auth from './Home_after_auth'; // Assuming this is your component for logged-in users

const page = () => {
 const { data: session } = useSession();

 if (session) {
    // If the user is logged in, render the Home_after_auth component
    return <Home_after_auth />;
 }

 // If the user is not logged in, render a message or a different component
 return (
    <div>
      <p>Please log in to access the home page.</p>
      {/* Optionally, include links to login or signup pages */}
    </div>
 );
};

export default page;
