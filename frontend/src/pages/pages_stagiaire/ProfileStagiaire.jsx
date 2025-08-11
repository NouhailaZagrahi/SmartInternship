import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import AboutMe from "../../components/components_stagiaire/AboutMe";
import Experience from "../../components/components_stagiaire/Experience";
import Projet from "../../components/components_stagiaire/Projet";
import ProfileSettings from "../../components/components_stagiaire/Profile_settings";
import { useStagiaire } from "../../context/StagiaireContext";

const StagiairesList = () => {
  // Context and State Management
  const { idstagiaire } = useStagiaire();
  
  // Main Data States
  const [stagiaire, setStagiaire] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editing States
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingProjet, setIsEditingProjet] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Form States
  const [editForm, setEditForm] = useState({
    description: "",
    fullName: "",
    Email: "",
    university: "",
    educationLevel: "",
    DateNaissance: "",
    address: "",
    phone: "",
    competences: [],
    languages: [],
  });
  
  const [tempLanguages, setTempLanguages] = useState([]);
  const [tempCompetences, setTempCompetences] = useState([]);
  const [editExperience, setEditExperience] = useState(null);
  const [editProjet, setEditProjet] = useState(null);
  
  const [profileForm, setProfileForm] = useState({
    email: "",
    fullName: "",
    cv: null,
    profilePhoto: null,
  });

  // Message States
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Helper Functions
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Modal Handlers
  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  // Data Fetching
  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/stagiaires/${idstagiaire}`
        );
        setStagiaire(response.data);
        setLoading(false);

        setProfileForm({
          email: response.data.Email || "",
          fullName: response.data.fullName || "",
          cv: null,
          profilePhoto: null,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        setError("Impossible de charger les stagiaires.");
        setLoading(false);
      }
    };

    fetchStagiaires();
  }, [idstagiaire]);

  // Form Initialization
  useEffect(() => {
    if (stagiaire) {
      const languages = [...(stagiaire.languages || [])];
      const competences = [...(stagiaire.competences || [])];

      setEditForm({
        description: stagiaire.description || "",
        fullName: stagiaire.fullName || "",
        Email: stagiaire.Email || "",
        university: stagiaire.university || "",
        educationLevel: stagiaire.educationLevel || "",
        DateNaissance: stagiaire.DateNaissance || "",
        address: stagiaire.address || "",
        phone: stagiaire.phone || "",
        competences,
        languages,
      });

      setTempLanguages(languages);
      setTempCompetences(competences);
    }
  }, [stagiaire]);

  // Message Timeout
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Language and Competence Handlers
  const handleAddLanguage = (languageName, level) => {
    if (languageName.trim() !== "" && level.trim() !== "") {
      const newLanguage = { language: languageName, level };
      const languageExists = tempLanguages.some(
        (lang) => lang.language === newLanguage.languageName && lang.level === newLanguage.level
      );

      if (!languageExists) {
        setTempLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
      }
    }
  };

  const handleAddCompetence = (competenceName) => {
    if (competenceName.trim() !== "") {
      const level = "A+";
      const newComp = { competenceName, level };
      setTempCompetences((prev) => [...prev, newComp]);
    }
  };

  const handleRemoveLanguage = (lang) => {
    setTempLanguages((prev) => prev.filter((l) => l !== lang));
  };

  const handleRemoveCompetence = (comp) => {
    setTempCompetences((prev) => prev.filter((c) => c !== comp));
  };

  // Edit Mode Handlers
  const handleEditClick = () => setIsEditingAboutMe(true);

  const handleEditExperienceClick = (experience) => {
    setIsEditingExperience(true);
    setEditExperience(experience);
  };

  const handleEditProjetClick = (projet) => {
    setIsEditingProjet(true);
    setEditProjet(projet);
  };

  const handleAddProjetClick = () => {
    setEditProjet({ title: "", description: "", projetImg: null });
    setIsEditingProjet(true);
  };

  // Save Handlers
  const handleSaveExperience = async (stagiaireId, experienceId, updatedExperience) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/stagiaires/${stagiaireId}/experiences/${experienceId}`,
        updatedExperience
      );

      setStagiaire((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.idExperience === experienceId ? response.data : exp
        ),
      }));

      setSuccessMessage("Expérience modifiée avec succès !");
      setIsEditingExperience(false);
    } catch (error) {
      setErrorMessage("Erreur lors de la modification de l'expérience.");
      console.error("Erreur lors de la modification de l'expérience :", error);
    }
  };

  const handleAddExperience = async (newExperience) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/stagiaires/${stagiaire._id}/experiences`,
        newExperience
      );

      setStagiaire((prev) => ({
        ...prev,
        experiences: [...prev.experiences, response.data],
      }));

      setSuccessMessage("Expérience ajoutée avec succès !");
      setIsEditingExperience(false);
      setEditExperience(null);
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout de l'expérience.");
      console.error("Erreur lors de l'ajout de l'expérience :", error);
    }
  };

  const handleSaveProjet = async (stagiaireId, projetId, updatedProjet) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedProjet.title);
      formData.append("description", updatedProjet.description);
      if (updatedProjet.imageFile) {
        formData.append("projetImg", updatedProjet.imageFile);
      }

      const response = await axios.put(
        `http://localhost:8081/api/stagiaires/${stagiaireId}/projets/${projetId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStagiaire((prev) => ({
        ...prev,
        projets: prev.projets.map((projet) =>
          projet.idProjet === projetId ? response.data : projet
        ),
      }));
      setIsEditingProjet(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du projet :", error);
    }
  };

  const handleAddProjet = async (newProjet) => {
    try {
      const formData = new FormData();
      formData.append("title", newProjet.title);
      formData.append("description", newProjet.description);
      if (newProjet.imageFile) {
        formData.append("projetImg", newProjet.imageFile);
      }

      const response = await axios.post(
        `http://localhost:8080/api/stagiaires/${stagiaire._id}/projets`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStagiaire((prev) => ({
        ...prev,
        projets: [...prev.projets, response.data],
      }));

      setSuccessMessage("Projet ajouté avec succès !");
      setIsEditingProjet(false);
      setEditProjet(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  };

  // Delete Handlers
  const handleDeleteExperience = async (experienceId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
      try {
        await axios.delete(
          `http://localhost:8081/api/stagiaires/${stagiaire._id}/experiences/${experienceId}`
        );

        setStagiaire((prev) => ({
          ...prev,
          experiences: prev.experiences.filter(
            (exp) => exp.idExperience !== experienceId
          ),
        }));

        setSuccessMessage("Expérience supprimée avec succès !");
      } catch (error) {
        setErrorMessage("Erreur lors de la suppression de l'expérience.");
        console.error("Erreur lors de la suppression de l'expérience :", error);
      }
    }
  };

  const handleDeleteProjet = async (projetId) => {
    try {
      await axios.delete(
        `http://localhost:8081/api/stagiaires/${stagiaire._id}/projets/${projetId}`
      );

      setStagiaire((prev) => ({
        ...prev,
        projets: prev.projets.filter((projet) => projet.idProjet !== projetId),
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  // Cancel Handlers
  const handleCancel = (sectionName) => {
    if (sectionName === "AboutMe") {
      setTempLanguages(stagiaire.languages || []);
      setTempCompetences(stagiaire.competences || []);
      setIsEditingAboutMe(false);
    } else if (sectionName === "Experience") {
      setIsEditingExperience(false);
    } else if (sectionName === "Projet") {
      setIsEditingProjet(false);
    }
  };

  // Change Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeExperience = (e) => {
    const { name, value } = e.target;
    setEditExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProjet = (e) => {
    const { name, value } = e.target;
    setEditProjet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProfileForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit Handlers
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "stagiaire",
      JSON.stringify({
        email: profileForm.email,
        fullName: profileForm.fullName,
      })
    );
    if (profileForm.cv) {
      formData.append("cv", profileForm.cv);
    }
    if (profileForm.profilePhoto) {
      formData.append("profilePhoto", profileForm.profilePhoto);
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/api/stagiaires/${stagiaire._id}/profile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStagiaire((prev) => ({
        ...prev,
        Email: response.data.Email,
        fullName: response.data.fullName,
        profilePhoto: response.data.profilePhoto,
        cv: response.data.cv,
      }));

      setSuccessMessage("Mise à jour réussie !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedForm = {
      ...editForm,
      languages: tempLanguages,
      competences: tempCompetences,
      projets: stagiaire.projets,
      experiences: stagiaire.experiences || [],
    };

    try {
      const response = await axios.put(
        `http://localhost:8081/api/stagiaires/${stagiaire._id}`,
        updatedForm
      );
      setStagiaire(response.data);
      setIsEditingAboutMe(false);
    } catch (error) {
      console.error("Error updating stagiaire:", error);
      setError("An error occurred while updating the information.");
    }
  };

  // Loading and Error States
  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>{error}</p>;

  // Main Render
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile">
                <div className="profile-head">
                  <div className="photo-content">
                    <div className="cover-photo" />
                    <div className="profile-photo">
                      <img
                        src={
                          stagiaire && stagiaire.profilePhoto
                            ? `http://localhost:8081/${stagiaire.profilePhoto}`
                            : "images/profile/profile.png"
                        }
                        className="img-fluid rounded-circle"
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div className="profile-info">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div className="row">
                          <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                            <div className="profile-name">
                              <h4 className="text-primary">
                                {stagiaire.fullName}
                              </h4>
                              <p>{stagiaire.domain}</p>
                            </div>
                          </div>
                          <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                            <div className="profile-email">
                              <h4 className="text-muted">{stagiaire.Email}</h4>
                              <p>Email</p>
                            </div>
                          </div>
                          <div className="col-xl-4 col-sm-4 prf-col">
                            <div className="profile-cv">
                              {stagiaire && stagiaire.cv ? (
                                <>
                                  <button
                                    className="btn btn-modern"
                                    onClick={openCvModal}
                                    style={{
                                      position: 'absolute',
                                      right: '20px',
                                      top: '20px',
                                      padding: '10px 20px',
                                      backgroundColor: '#4CAF50',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '5px',
                                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                      transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                                  >
                                    Voir le CV
                                  </button>

                                  {isCvModalOpen && (
                                    <div className="modal-overlay">
                                      <div className="modal-content">
                                        <button
                                          className="close-button"
                                          onClick={closeCvModal}
                                        >
                                          &times;
                                        </button>
                                        <iframe
                                          src={`http://localhost:8081/${stagiaire.cv}`}
                                          title="CV"
                                          className="cv-iframe"
                                        ></iframe>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className="text-muted">CV non disponible</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="profile-tab">
                    <div className="custom-tab-1">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#about-me"
                            data-toggle="tab"
                            className="nav-link active show"
                          >
                            About Me
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#Experience"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            Experience
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#projets"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            projets
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#profileSettings"
                            data-toggle="tab"
                            className="nav-link"
                          >
                            profile Settings
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div id="Experience" className="tab-pane fade mt-4">
                          <Experience
                            stagiaire={stagiaire}
                            isEditingExperience={isEditingExperience}
                            editExperience={editExperience}
                            handleChangeExperience={handleChangeExperience}
                            handleSaveExperience={handleSaveExperience}
                            handleCancel={handleCancel}
                            setEditExperience={setEditExperience}
                            setIsEditingExperience={setIsEditingExperience}
                            handleAddExperience={handleAddExperience}
                            handleDeleteExperience={handleDeleteExperience}
                            handleEditExperienceClick={handleEditExperienceClick}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                          />
                        </div>

                        <div id="about-me" className="tab-pane fade active show">
                          <AboutMe
                            stagiaire={stagiaire}
                            isEditingAboutMe={isEditingAboutMe}
                            editForm={editForm}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleCancel={handleCancel}
                            handleEditClick={handleEditClick}
                            tempLanguages={tempLanguages}
                            tempCompetences={tempCompetences}
                            handleAddLanguage={handleAddLanguage}
                            handleRemoveLanguage={handleRemoveLanguage}
                            handleAddCompetence={handleAddCompetence}
                            handleRemoveCompetence={handleRemoveCompetence}
                            calculateAge={calculateAge}
                          />
                        </div>
                        <div id="projets" className="tab-pane fade">
                          <Projet
                            stagiaire={stagiaire}
                            isEditingProjet={isEditingProjet}
                            handleEditProjetClick={handleEditProjetClick}
                            handleChangeProjet={handleChangeProjet}
                            editProjet={editProjet}
                            handleSaveProjet={handleSaveProjet}
                            handleCancel={handleCancel}
                            setEditProjet={setEditProjet}
                            handleAddProjet={handleAddProjet}
                            handleDeleteProjet={handleDeleteProjet}
                            setIsEditingProjet={setIsEditingProjet}
                            successMessage={successMessage}
                          />
                        </div>
                        <div id="profileSettings" className="tab-pane fade">
                          <ProfileSettings
                            profileForm={profileForm}
                            handleProfileChange={handleProfileChange}
                            handleProfileSubmit={handleProfileSubmit}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StagiairesList;