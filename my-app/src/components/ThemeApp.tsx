"use client"
import React, { useEffect, useState } from "react";

const getSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "theme-spring"; // Printemps
  if (month >= 6 && month <= 8) return "theme-summer";  // Été
  if (month >= 9 && month <= 11) return "theme-fall";   // Automne
  return "theme-winter";                                // Hiver
};

const ThemeApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(getSeason());

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  return (
    <div>
        {children}
    </div>
  );
};

export default ThemeApp;
