import React, { createContext, useContext, useState } from "react";

// Crée le contexte
const StagiaireContext = createContext();

// Fournisseur du contexte
export const StagiaireProvider = ({ children }) => {
  const [idstagiaire, setIdStagiaire] = useState("67f056d9d62ce10e882ad89b"); // Stocke l'ID du stagiaire

  return (
    <StagiaireContext.Provider value={{ idstagiaire, setIdStagiaire }}>
      {children}
    </StagiaireContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useStagiaire = () => useContext(StagiaireContext);
