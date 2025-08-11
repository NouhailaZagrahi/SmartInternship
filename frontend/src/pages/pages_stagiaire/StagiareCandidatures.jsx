import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStagiaire } from "../../context/StagiaireContext";

const StagiaireCandidature = () => {
  const { idstagiaire } = useParams();
  const { setIdStagiaire } = useStagiaire();
  const [candidatures, setCandidatures] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!idstagiaire) return;

      setIdStagiaire(idstagiaire);

      try {
        const [candidaturesRes, offresRes, entreprisesRes] = await Promise.all([
          fetch(`http://localhost:8086/api/candidatures/stagiaire/${idstagiaire}`),
          fetch("http://localhost:8083/offres"),
          fetch("http://localhost:8082/api/entreprises"),
        ]);

        if (!candidaturesRes.ok || !offresRes.ok || !entreprisesRes.ok) {
          throw new Error("Erreur lors du chargement des données.");
        }

        const candidaturesData = await candidaturesRes.json();
        const offresData = await offresRes.json();
        const entreprisesData = await entreprisesRes.json();

        // Mapping des offres et des entreprises
        const offresMap = new Map(offresData.map(offre => [offre.idOffre, offre]));
        const entreprisesMap = new Map(entreprisesData.map(entreprise => [entreprise.id, entreprise]));

        // Filtrer les candidatures valides et les associer aux offres et entreprises
        const candidaturesValides = candidaturesData
          .filter(c => offresMap.has(c.idOffre))
          .map(c => {
            const offre = offresMap.get(c.idOffre);
            const entreprise = entreprisesMap.get(offre.idEntreprise);
            return { ...c, offre, entreprise };
          });

        setCandidatures(candidaturesValides);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, [idstagiaire, setIdStagiaire]);

  const getStatutClass = (statut) => {
    const statusClasses = {
      "en attente": "tag orange",
      "selectionnée": "tag yellow",
      "acceptée": "tag green",
      "non acceptée": "tag red",
      "annulée": "tag red",
    };
    return statusClasses[statut.toLowerCase()] || "tag";
  };

  const annulerCandidature = async (idCandidature) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir annuler cette candidature ?"
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:8086/api/candidatures/annuler/${idCandidature}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          // Actualiser les candidatures après annulation
          setCandidatures((prevCandidatures) =>
            prevCandidatures.map((candidature) =>
              candidature.idCandidature === idCandidature
                ? { ...candidature, statut: "annulée" }
                : candidature
            )
          );
        } else {
          console.error("Erreur lors de l'annulation de la candidature");
        }
      } catch (error) {
        console.error("Erreur lors de l'annulation de la candidature :", error);
      }
    } else {
      console.log("Annulation de la candidature annulée");
    }
  };

  const openModal = (offre) => {
    setSelectedOffre(offre);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOffre(null);
  };

  return (
    <div className="content-body">
      <div className="container2">
        <h2>Suivre mes Candidatures</h2>
        <div className="table-header">
          <div>Entreprise</div>
          <div>Stage</div>
          <div>Compétences requises</div>
          <div>Statut</div>
          <div>Date de postulation</div>
          <div>Actions</div>
        </div>

        {candidatures.map((candidature) => (
          <div key={candidature.idCandidature} className="row">
            <div className="assigned">
              <a
                href={candidature.entreprise ? `/profil-entreprise/${candidature.entreprise.id}` : "#"}
                target={candidature.entreprise ? "_blank" : undefined}
                rel={candidature.entreprise ? "noopener noreferrer" : undefined}
                className="company-link"
              >
                <img
                  src={candidature.entreprise ? `http://localhost:8082/images/${candidature.entreprise.logo}` : "/img/default-image.jpeg"}
                  alt={candidature.entreprise ? candidature.entreprise.name : "Entreprise non définie"}
                  width={50}
                  height={50}
                />
                <div style={{ paddingLeft: 10 }}>
                  <strong>{candidature.entreprise ? candidature.entreprise.name : "Entreprise non définie"}</strong>
                  <p>{candidature.entreprise && candidature.offre ? candidature.offre.domaineDeStage : "Domaine de stage non défini"}</p>
                </div>
              </a>
            </div>

            <div className="stage-info">
              {candidature.offre?.title}
              <span className="stage-badge" onClick={() => openModal(candidature.offre)}>
                Voir le stage posté
              </span>
            </div>

            <div className="skills">
              {candidature.offre?.requiredSkills?.map((skill, i) => (
                <span key={i} className="skill-badge">
                  {skill.nomSkill}
                </span>
              ))}
            </div>

            <div>
              <span className={getStatutClass(candidature.statut)}>{candidature.statut}</span>
            </div>

            <div>{candidature.datePostulation}</div>
            <div>
              {candidature.statut !== "annulée" && (
                <button className="stage-btn-annuler" onClick={() => annulerCandidature(candidature.idCandidature)}>
                  Annuler la candidature
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Modal */}
        {modalOpen && selectedOffre && (
          <div className="modal1">
            <div className="modal-content1">
              <span className="close1" onClick={closeModal}>
                &times;
              </span>
              <div className="job-card" key={selectedOffre.idOffre}>
                <a href="/entreprise" className="job-card-link">
                  <div className="job-left">
                    <img src="https://i.pravatar.cc/80?img=20" alt="Auteur" />
                    <h6>Nom de l'entreprise</h6>
                    <span className="category-tag">{selectedOffre.domaineDeStage}</span>
                    <div className="location">
                      <i className="fa-solid fa-location-dot" /> {selectedOffre.location}
                    </div>
                    <div className="type">
                      <i className="fa-solid fa-laptop-house" /> {selectedOffre.typeDeStage}
                    </div>
                  </div>
                </a>
                <div className="job-right">
                  <h2>
                    <i className="fa-solid fa-briefcase"></i> {selectedOffre.title}
                  </h2>
                  <p>{selectedOffre.description}</p>
                  <div className="tags">
                    <span>
                      <i className="fa-solid fa-circle-check green-icon" /> Pr-Embauche : {selectedOffre.preEmbauche ? "Oui" : "Non"}
                    </span>

                    <span>
                      <i className="fa-solid fa-circle-check green-icon" /> Rémunération :{" "}
                      {selectedOffre.remuneration > 0 ? `${selectedOffre.remuneration} DH` : "Non"}
                    </span>

                    <span>
                      <i className="fa-regular fa-calendar gray-icon" /> Durée : {selectedOffre.duration} mois
                    </span>
                    <span>
                      <i className="fa-regular fa-calendar gray-icon" /> Début : {selectedOffre.dateStart}
                    </span>
                  </div>

                  <div className="Requiredskills">
                    <strong>Compétences requises :</strong>
                    <ul>
                      {selectedOffre.requiredSkills?.map((skill, index) => (
                        <li key={index}>{skill.nomSkill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StagiaireCandidature;
