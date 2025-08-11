import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStagiaire } from "../../context/StagiaireContext";

const PostEnregistres = () => {
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



  return (
<div className="content-body">
  <div className="card-grid">
   
    {/* Card 1 */}
    <a href="/offre/stage-dev-front" className="job-card-link">
  <div className="job-card">
    <div className="job-left">
      <img src="https://i.pravatar.cc/80?img=20" alt="Auteur" />
      <h6>Nom de l'entreprise</h6>
      <span className="category-tag">Développement</span>
      <div className="location"><i className="fa-solid fa-location-dot" /> Lyon, France</div>
      <div className="type"><i className="fa-solid fa-laptop-house" /> Télétravail</div>
    </div>

    <div className="job-right">
      <h2><i className="fa-solid fa-briefcase"></i> Stage - Développeur Web Front-End</h2>
      <p>
        Intègre notre équipe tech pour développer de nouvelles interfaces web avec React et Tailwind.
        Intègre notre équipe tech pour développer de nouvelles interfaces web avec React et Tailwind.
      </p>

      <div className="tags">
        <span><i className="fa-solid fa-circle-check green-icon" /> Rémunéré : 1000€/mois</span>
        <span><i className="fa-solid fa-user-check" /> Pré-embauche : <i className="fa-solid fa-circle-check" /></span>
        <span><i className="fa-regular fa-calendar gray-icon" /> Durée : 4 mois</span>
        <span><i className="fa-regular fa-calendar gray-icon" /> Début : 4 mai</span>
      </div>

      <div className="Requiredskills">
        <strong>Compétences requises :</strong>
        <ul>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>API REST</li>
        </ul>
      </div>

      <div className="card-footer">
        <button className="apply-btn">Postuler</button>
        <i className="fa-regular fa-bookmark save-icon" title="Enregistrer l'offre"></i>
      </div>
    </div>
  </div>
</a>

 
    {/* Card 1 */}
    <a href="/offre/stage-dev-front" className="job-card-link">
  <div className="job-card">
    <div className="job-left">
      <img src="https://i.pravatar.cc/80?img=20" alt="Auteur" />
      <h6>Nom de l'entreprise</h6>
      <span className="category-tag">Développement</span>
      <div className="location"><i className="fa-solid fa-location-dot" /> Lyon, France</div>
      <div className="type"><i className="fa-solid fa-laptop-house" /> Télétravail</div>
    </div>

    <div className="job-right">
      <h2><i className="fa-solid fa-briefcase"></i> Stage - Développeur Web Front-End</h2>
      <p>
        Intègre notre équipe tech pour développer de nouvelles interfaces web avec React et Tailwind.
        Intègre notre équipe tech pour développer de nouvelles interfaces web avec React et Tailwind.
      </p>

      <div className="tags">
        <span><i className="fa-solid fa-circle-check green-icon" /> Rémunéré : 1000€/mois</span>
        <span><i className="fa-solid fa-user-check" /> Pré-embauche : <i className="fa-solid fa-circle-check" /></span>
        <span><i className="fa-regular fa-calendar gray-icon" /> Durée : 4 mois</span>
        <span><i className="fa-regular fa-calendar gray-icon" /> Début : 4 mai</span>
      </div>

      <div className="Requiredskills">
        <strong>Compétences :</strong>
        <ul>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>API REST</li>
        </ul>
      </div>

      <div className="card-footer">
        <button className="apply-btn">Postuler</button>
        <i className="fa-regular fa-bookmark save-icon" title="Enregistrer l'offre"></i>
      </div>
    </div>
  </div>
</a>


    {/* Ajoute d'autres cartes ici si besoin */}
  </div>
</div>

  
  );
};

export default PostEnregistres;
