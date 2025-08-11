import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStagiaire } from "../../context/StagiaireContext";

const Stagiaire_stageRealises = () => {
  const { idstagiaire } = useParams(); // Récupère l'ID depuis l'URL
  const { setIdStagiaire } = useStagiaire(); // Met à jour l'ID dans le contexte

  useEffect(() => {
    if (!idstagiaire) {
      console.error("idstagiaire est introuvable dans l'URL.");
    } else {
      console.log("idstagiaire récupéré :", idstagiaire);
    }

    if (!setIdStagiaire) {
      console.error("setIdStagiaire n'est pas défini dans le contexte.");
    } else {
      setIdStagiaire(idstagiaire); // Met à jour l'ID dans le contexte
    }
  }, [idstagiaire, setIdStagiaire]);

  // Exemple de données pour les stages réalisés
  const completedStages = [
    {
      id: 1,
      title: "Stage - Développeur Web Front-End",
      location: "Casablanca",
      domain: "Développement",
      type: "Présentiel",
      duration: "3 mois",
      acceptedDate: "15 janvier 2024",
    },
    {
      id: 2,
      title: "Stage - Marketing Digital",
      location: "Rabat",
      domain: "Marketing",
      type: "Télétravail",
      duration: "2 mois",
      acceptedDate: "10 mars 2023",
    },
  ];

  return (
    <div className="content-body">
      <div className="card-grid">
        {completedStages.map((stage) => (
          <div key={stage.id} className="job-card">
            <a href="/entreprise" className="job-card-link">
              <div className="job-left">
                <img src="https://i.pravatar.cc/80?img=20" alt="Auteur" />
                <h6>Nom de l'entreprise</h6>
                <span className="category-tag">{stage.domain}</span>
                <div className="location">
                  <i className="fa-solid fa-location-dot" /> {stage.location}
                </div>
                <div className="type">
                  <i className="fa-solid fa-laptop-house" /> {stage.type}
                </div>
                <div className="tags">
             
                <span>
                  <i className="fa-regular fa-calendar green-icon" /> Accepté le :{" "}
                  {stage.acceptedDate}
                </span>
              </div>
              </div>
            </a>
            <div className="job-right">
              <h2>
                <i className="fa-solid fa-briefcase"></i> {stage.title}
              </h2>
              <p>
                Ce stage a été réalisé avec succès dans le domaine de{" "}
                {stage.domain}. Il a permis de développer des compétences clés
                et de contribuer à des projets significatifs.
              </p>

              <div className="tags">
                <span>
                  <i className="fa-solid fa-circle-check green-icon" /> Rémunéré
                  : {}
                </span>
                <span>
                  <i className="fa-solid fa-user-check" /> Pré-embauche :{" "}
                  {stage.preHire}
                </span>
                <span>
                  <i className="fa-regular fa-calendar gray-icon" /> Durée :{" "}
                  {stage.duration}
                </span>
                <span>
                  <i className="fa-regular fa-calendar gray-icon" /> Début : 4
                  mai
                </span>
              </div>

              <div className="Requiredskills">
                <strong>Compétences développées :</strong>
                <ul>
                  <li>React</li>
                  <li>Marketing Digital</li>
                  <li>Analyse de données</li>
                </ul>
              </div>
              
            </div>
            
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Stagiaire_stageRealises;