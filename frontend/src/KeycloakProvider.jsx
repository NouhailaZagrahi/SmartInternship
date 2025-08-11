import { useEffect, useState } from "react";
import keycloak from "../keycloak"; // Chemin vers ton fichier keycloak.js

export default function KeycloakProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak
        .init({ onLoad: "login-required" })
        .then((auth) => {
          setAuthenticated(auth);
        })
        .catch((error) => {
          console.error("Keycloak init error:", error);
        });
    }
  }, []);

  if (!authenticated) {
    return <div>Chargement...</div>;
  }

  return children;
}
