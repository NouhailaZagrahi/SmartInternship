import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const AboutMe = ({
  stagiaire,
  editForm,
  isEditingAboutMe,
  handleChange,
  handleSubmit,
  handleCancel,
  handleEditClick,
  tempLanguages,
  tempCompetences,
  handleAddLanguage,
  handleRemoveLanguage,
  handleAddCompetence,
  handleRemoveCompetence,
  calculateAge,
}) => {
  const [selectedLevel, setSelectedLevel] = React.useState("A1");
  const age = calculateAge(stagiaire.DateNaissance);
  const getLevelClass = (level) => {
    switch (level) {
      case "A1":
        return "bg-info"; // Bleu clair
      case "A2":
        return "bg-primary"; // Bleu
      case "B1":
        return "bg-success"; // Vert
      case "B2":
        return "bg-warning"; // Jaune
      case "C1":
        return "bg-danger"; // Rouge
      case "C2":
        return "bg-dark"; // Gris foncé
      default:
        return "bg-secondary"; // Gris neutre
    }
  };

  if (isEditingAboutMe) {
    return (
      <div className="pt-4">
        <div className="settings-form">
          <h4 className="text-primary  ml-4  mb-4">Account Update</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  value={editForm.Email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Filliere</label>
                <input
                  type="text"
                  name="domain"
                  value={stagiaire.domain || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>University</label>
                <input
                  type="text"
                  name="university"
                  value={editForm.university}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Education Level</label>
                <input
                  type="text"
                  name="educationLevel"
                  value={editForm.educationLevel}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Link Portfolio</label>
                <input
                  type="text"
                  name="portfolioLink"
                  value={stagiaire.portfolioLink || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Date de Naissance</label>
                <input
                  type="date"
                  name="DateNaissance"
                  value={editForm.DateNaissance}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-4">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={editForm.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            </div>

           

           
            {/* =======================================================================================*/}
            {/* ==========================gESTION LANGAUAGES COMPETENCES===============================*/}
            {/* =======================================================================================*/}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Langues</label>
                <div className="current-languages mb-4">
                  <div className="d-flex flex-wrap gap-2">
                    {tempLanguages.map((lang, index) => (
                      <span
                        key={index}
                        className="badge bg-primary p-2 d-flex align-items-center"
                      >
                        {lang.language} - {lang.level} {/* Affiche le niveau */}
                        <button
                          className="btn-close btn-close-white ms-2"
                          onClick={(e) => {
                            e.preventDefault(); // Empêche le comportement par défaut
                            handleRemoveLanguage(lang); // Supprime la langue
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    placeholder="Nouvelle langue"
                    className="form-control"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const languageName = e.target.value.trim(); // On prend la valeur de l'input
                        if (languageName !== "") {
                          handleAddLanguage(languageName, selectedLevel); // Ajouter la langue avec le niveau sélectionné
                          e.target.value = ""; // Réinitialise le champ de saisie
                        }
                      }
                    }}
                  />
                  <select
                    className="form-control"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label>Compétences</label>
                <div className="current-languages mb-4">
                  <div className="d-flex flex-wrap gap-2">
                    {tempCompetences.map((comp, index) => (
                      <span
                        key={index}
                        className="badge bg-primary p-2 d-flex align-items-center"
                      >
                        {comp.competenceName}
                        <button
                          className="btn-close btn-close-white ms-2"
                          
                          onClick={(e) => {
                            e.preventDefault(); // Empêche le comportement par défaut
                            handleRemoveCompetence(comp); // Supprime la langue
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nouvelle compétence"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const competenceName = e.target.value.trim();
                      if (competenceName !== "") {
                        handleAddCompetence(competenceName); // Ajouter la langue seulement si non vide
                        e.target.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>
            {/* =======================================================================================*/}
            {/* =======================================================================================*/}
            {/* =======================================================================================*/}
            <button
              className="btn btn-info  float-end"
              onClick={handleSubmit}
              type="button"
            >
              Modifier
            </button>
            <button
              className="btn btn-danger mr-2  float-end"
              type="button"
              onClick={() => handleCancel("AboutMe")}
            >
              Annuler
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
     <div className="pt-3">
      <div className="profile-about-me card border-0 shadow-sm p-4 mb-4 bg-light">
        <h4 className="text-primary fw-bold mb-3">About Me</h4>
        <p className="text-muted">{stagiaire.description}</p>
      </div>
  
      <div className="profile-skills card border-0 shadow-sm p-4 mb-4 bg-light">
        <h4 className="text-primary fw-bold mb-3">Competences</h4>
        <div className="d-flex flex-wrap gap-3">
          {(stagiaire.competences || []).map((competence, index) => (
            <button
              key={index}
              className="btn btn-outline-dark rounded-3 p-2 my-2 transition-all hover-shadow"
            >
              {competence.competenceName}
            </button>
          ))}
        </div>
      </div>
  
      <div className="profile-lang card border-0 shadow-sm p-4 mb-4 bg-light">
        <h4 className="text-primary fw-bold mb-3">Languages</h4>
        <div className="d-flex flex-wrap gap-3">
          {(stagiaire.languages || []).map((language, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <span className="me-3 text-muted f-s-16">{language.language}</span>
              <span className={`badge ${getLevelClass(language.level)} p-2 rounded-3`}>
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
  
      <div className="profile-personal-info card border-0 shadow-sm p-4 mb-4 bg-light">
        <h4 className="text-primary fw-bold mb-3">Personal Information</h4>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Name:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.fullName}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Email:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.Email}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">University:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.university}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Education Level:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.educationLevel}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Age:</h5>
          </div>
          <div className="col-9">
            <span>{age} Years</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Location:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.address}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <h5 className="f-w-500">Phone:</h5>
          </div>
          <div className="col-9">
            <span>{stagiaire.phone}</span>
          </div>
        </div>
      </div>
  
      <button
        className="btn btn-secondary btn-sm float-end px-4 py-2 mt-3 rounded-3 transition-all hover-shadow"
        type="button"
        onClick={() => handleEditClick("AboutMe")}
      >
        <i className="fa fa-edit"></i> Modify
      </button>
      </div>
    </>
  );
  
};

export default AboutMe;
