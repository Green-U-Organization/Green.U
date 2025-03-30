"use client"

import React from "react";

const NewUserButton = () => {
  const newUser = async () => {
    try {
      // Appel de l'API route locale
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/Users", {
        mode: "cors"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("Fetched users:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
<button onClick={newUser}>clickMe</button>
  );
};

export default NewUserButton;