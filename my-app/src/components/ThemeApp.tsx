"use client";
import React, { useEffect, useState } from "react";
import { ClassName } from "react-calendar/src/shared/types.js";

// Fonction qui définit la saison selon le mois actuel
const getSeason = () => {
  const month = new Date().getMonth() + 1; // Récupère le mois actuel (1-12)
 
  // Détermine la saison en fonction du mois
  if (month >= 3 && month <= 5) return "theme-spring"; // Printemps
  if (month >= 6 && month <= 8) return "theme-summer"; // Été
  if (month >= 9 && month <= 11) return "theme-fall";  // Automne
  return "theme-winter"; // Hiver
};

const ThemeApp: React.FC<{ children: React.ReactNode , className?: string}> = ({ children, className }) => {
  // Stocke le thème dans l'état (initialisé à une chaîne vide pour éviter SSR)
  const [theme, setTheme] = useState<string>("");

  // État pour savoir si le composant est monté (évite l'hydratation incorrecte)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté
    setIsMounted(true);

    // Vérifier si on est bien côté client
    if (typeof window !== "undefined") {
      // Récupérer le thème du localStorage ou utiliser la saison actuelle
      const storedTheme = localStorage.getItem("theme") || getSeason();

      // Mettre à jour l'état React
      setTheme(storedTheme);

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
