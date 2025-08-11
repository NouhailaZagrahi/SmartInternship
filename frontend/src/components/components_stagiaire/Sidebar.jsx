import React from "react";
import useSidebarInit from "../../hooks/useSidebarInit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useStagiaire } from "../../context/StagiaireContext";

const Sidebar = () => {
  useSidebarInit(); // Initialise la sidebar
  const { idstagiaire } = useStagiaire(); // Récupère l'ID du stagiaire depuis le contexte

  return (
    <>
      <div className="quixnav">
        <div className="quixnav-scroll">
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>

            {/* Lien vers la page d'accueil */}
            <li>
              <a className="has-arrow" href={`/${idstagiaire}/home`} aria-expanded="false">
                <i className="icon icon-home" />
                <span className="nav-text">Home</span>
              </a>
            </li>

            {/* Lien vers le profil */}
            <li className="nav-label first">Profile</li>
            <li>
              <a className="has-arrow" href={`/${idstagiaire}/profile`} aria-expanded="false">
                <i className="icon icon-home" />
                <span className="nav-text">voir le Profile</span>
              </a>
            </li>
        

            {/* Lien vers les posts enregistrés */}
            
            <li className="nav-label">Posts enregistrés</li>
            <li>
              <a
                className="has-arrow"
                href={`/${idstagiaire}/saved-posts`}
                aria-expanded="false"
              >
                <i className="fa-solid fa-bookmark"></i>
                <span className="nav-text">Posts enregistrés</span>
              </a>
            </li>

            {/* Lien vers le tableau de bord */}
            <li className="nav-label">Dashboard</li>
            <li>
              <a
                className="has-arrow"
                href={`/${idstagiaire}/candidature`}
                aria-expanded="false"
              >
                <i className="fa-regular fa-circle-check"></i>
                <span className="nav-text">Suivre mes candidatures</span>
              </a>
            </li>
            <li>
              <a
                className="has-arrow"
                href={`/${idstagiaire}/stages`}
                aria-expanded="false"
              >
                <i className="fa-solid fa-bookmark"></i>
                <span className="nav-text">Mes stages réalisés</span>
              </a>
            </li>

            {/* Lien vers les notifications */}
            <li className="nav-label">Notifications</li>
            <li>
              <a
                className="has-arrow"
                href={`/${idstagiaire}/notifications`}
                aria-expanded="false"
              >
                <i className="fa-solid fa-bell"></i>
                <span className="nav-text">New Notifications</span>
              </a>
            </li>

            {/* Lien vers les emails */}
            <li>
              <a
                className="has-arrow"
                href={`/${idstagiaire}/emails`}
                aria-expanded="false"
              >
                <i className="fa-solid fa-envelope"></i>
                <span className="nav-text">Emails</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
