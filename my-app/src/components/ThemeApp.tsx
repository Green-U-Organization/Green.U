"use client";
import React, { useEffect, useState } from "react";

// Fonction qui définit le thème selon le mois actuel
const getSeason = () => {
  const month = new Date().getMonth() + 1;
  const seasonMap = {
    1: "theme-winter", 2: "theme-winter",
    3: "theme-spring", 4: "theme-spring", 5: "theme-spring",
    6: "theme-summer", 7: "theme-summer", 8: "theme-summer",
    9: "theme-fall", 10: "theme-fall", 11: "theme-fall",
    12: "theme-winter"
  };
  return seasonMap[month as keyof typeof seasonMap];
};

const ThemeApp: React.FC<{ children: React.ReactNode , className?: string}> = ({ children, className }) => {
  // État pour savoir si le composant est monté (évite l'hydratation incorrecte)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté
    setIsMounted(true);

    // Vérifier si on est bien côté client
    if (typeof window !== "undefined") {
      // Récupérer le thème du localStorage ou utiliser la saison actuelle
      const storedTheme = localStorage.getItem("theme") || getSeason();
      
      //-------------------------------------------//
      // PEUT-ETRE ACTIVE POUR LE TEST DES SAISONS
      //const storedTheme = "theme-summer";
      //-------------------------------------------//
      // Appliquer le thème au `document.documentElement`
      document.documentElement.classList.add(storedTheme);

      // Sauvegarder le thème dans localStorage
      localStorage.setItem("theme", storedTheme);

      // Nettoyer l'ancienne classe CSS quand le composant est démonté
      return () => {
        document.documentElement.classList.remove(storedTheme);
      };
    }
  }, []); // useEffect ne s'exécute qu'une seule fois après le montage du composant

  // Éviter le rendu côté serveur pour éviter l'erreur d'hydratation
  if (!isMounted) return null;

  return <div className={className}>{children}</div>;
};

export default ThemeApp;
