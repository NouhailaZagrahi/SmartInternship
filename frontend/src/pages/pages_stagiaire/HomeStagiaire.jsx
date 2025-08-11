import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStagiaire } from "../../context/StagiaireContext";

const HomeStagiaire = ({ jobs, setJobs, filteredJobs, setFilteredJobs }) => {
  const { idstagiaire } = useParams();
  const { setIdStagiaire } = useStagiaire();
  const [stagiaireCompetencies, setStagiaireCompetencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [offresPostulees, setOffresPostulees] = useState([]);
  const [entrepriseDetails, setEntrepriseDetails] = useState({}); // State to store entreprise details

  useEffect(() => {
    const fetchData = async () => {
      if (!idstagiaire) {
        console.error("idstagiaire manquant");
        return;
      }

      setIdStagiaire(idstagiaire);

      // Fetch candidatures for this stagiaire
      const candidaturesRes = await fetch(
        `http://localhost:8086/api/candidatures/stagiaire/${idstagiaire}`
      );
      if (!candidaturesRes.ok) {
        throw new Error("Erreur lors de la récupération des candidatures");
      }
      const candidatures = await candidaturesRes.json();
      const offresIds = candidatures.map((c) => c.idOffre); // ou c.offre.id si la structure est différente
      setOffresPostulees(offresIds);

      try {
        // 1. Fetch stagiaire competencies from API
        const res = await fetch(
          `http://localhost:8081/api/stagiaires/${idstagiaire}/competences`
        );
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des compétences");
        }

        const competences = await res.json();
        const competencies = competences.map(
          (c) => c.libelle || c.competenceName
        );
        setStagiaireCompetencies(competencies);

        // 2. Fetch internship offers from API
        const jobRes = await fetch("http://localhost:8083/offres"); // Assuming your API endpoint for offers is /api/offres
        if (!jobRes.ok) {
          throw new Error("Erreur lors de la récupération des offres");
        }

        const jobsData = await jobRes.json();

        // 3. Calculate scores based on matching competencies
        const scoredJobs = jobsData.map((job) => {
          const matchedSkills = job.requiredSkills.filter((skill) =>
            competencies.includes(skill.nomSkill)
          );
          const score = matchedSkills.length; // Score based on the number of matched skills
          return { ...job, score };
        });

        // 4. Sort the jobs by score in descending order
        scoredJobs.sort((a, b) => b.score - a.score);

        // Update the state with fetched jobs
        setJobs(jobsData);
        setFilteredJobs(scoredJobs);

        // Fetch entreprise details for each job
        const entrepriseRes = await fetch(
          `http://localhost:8082/api/entreprises/${scoredJobs[0]?.idEntreprise}` // Assuming the job has an idEntreprise field
        );
        if (!entrepriseRes.ok) {
          throw new Error("Erreur lors de la récupération des informations de l'entreprise");
        }
        const entrepriseData = await entrepriseRes.json();
        setEntrepriseDetails(entrepriseData); // Set entreprise details in state
      } catch (error) {
        console.error("Erreur dans fetchData :", error);
      }
    };

    fetchData();
  }, [idstagiaire, setIdStagiaire, setJobs, setFilteredJobs]);

  // Function to filter and search jobs based on the search term
  const filterAndSearchJobs = () => {
    const filtered = filteredJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some((skill) =>
          skill.nomSkill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    return filtered;
  };

  const handlePostuler = async (idOffre) => {
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

    try {
      const response = await fetch("http://localhost:8086/api/candidatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idOffre: idOffre,
          idStagiaire: idstagiaire,
          statut: "en attente",
          datePostulation: today,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la candidature");
      }

      alert("Candidature envoyée avec succès !");
      setOffresPostulees((prev) => [...prev, idOffre]);
    } catch (error) {
      console.error("Erreur lors de la candidature :", error);
      alert("Erreur lors de la candidature.");
    }
  };

  return (
    <div className="content-body">
      <div className="card-grid">
        {filterAndSearchJobs().map((job) => (
          <div className="job-card" key={job.idOffre}>
            <a href="/entreprise" className="job-card-link">
              <div className="job-left">
                <img  src="/img/default-image.jpeg" alt="Auteur" />
                <h6>{entrepriseDetails.name || "Nom de l'entreprise"}</h6>
                <span className="category-tag">{job.domaineDeStage}</span>
                <div className="location">
                  <i className="fa-solid fa-location-dot" /> {job.location}
                </div>
                <div className="type">
                  <i className="fa-solid fa-laptop-house" /> {job.typeDeStage}
                </div>
              </div>
            </a>
            <div className="job-right">
              <h2>
                <i className="fa-solid fa-briefcase"></i> {job.title}
              </h2>
              <p>{job.description}</p>
              <div className="tags">
                <span>
                  <i className="fa-solid fa-circle-check green-icon" />{" "}
                  Pr-Embauche : {job.preEmbauche ? "Oui" : "Non"}
                </span>

                <span>
                  <i className="fa-solid fa-circle-check green-icon" />{" "}
                  Rémunération :{" "}
                  {job.remuneration && job.remuneration > 0
                    ? `${job.remuneration} DH`
                    : "Non"}
                </span>

                <span>
                  <i className="fa-regular fa-calendar gray-icon" /> Durée :{" "}
                  {job.duration} mois
                </span>
                <span>
                  <i className="fa-regular fa-calendar gray-icon" /> Début :{" "}
                  {job.dateStart}
                </span>
              </div>

              <div className="Requiredskills">
                <strong>Compétences requises :</strong>
                <ul>
                  {job.requiredSkills?.map((skill, index) => (
                    <li key={index}>{skill.nomSkill}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <button
                  className={`apply-btn ${offresPostulees.includes(job.idOffre) ? "applied" : ""}`}
                  onClick={() => handlePostuler(job.idOffre)}
                  disabled={offresPostulees.includes(job.idOffre)}
                >
                  {offresPostulees.includes(job.idOffre)
                    ? "Déjà postulé"
                    : "Postuler"}
                </button>

                <i
                  className="fa-regular fa-bookmark save-icon"
                  title="Enregistrer l'offre"
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeStagiaire;
