import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Experience = ({
  stagiaire,
  isEditingExperience,
  handleEditExperienceClick,
  handleChangeExperience, // Fonction pour gérer les changements dans l'expérience
  editExperience, // Expérience en cours de modification
  handleSaveExperience, // Fonction pour sauvegarder l'expérience modifiée
  handleCancel, // Fonction pour annuler la modification
  setEditExperience, // Fonction pour définir une nouvelle expérience
  setIsEditingExperience, // Fonction pour activer le mode édition
  handleAddExperience, // Fonction pour ajouter une nouvelle expérience
  handleDeleteExperience, // Fonction pour supprimer une expérience
  successMessage, // Message de succès
  errorMessage, // Message d'erreur
}) => {
  if (isEditingExperience && editExperience) {
    return (
      <div className="edit-experience-form card shadow-lg p-4">
        <h4 className="text-center mb-4">
          {editExperience.idExperience
            ? "Modifier l'expérience"
            : "Ajouter une expérience"}
        </h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editExperience.idExperience) {
              handleSaveExperience(
                stagiaire._id,
                editExperience.idExperience,
                editExperience
              );
            } else {
              handleAddExperience(editExperience);
            }
          }}
        >
          <div className="form-group mb-3">
            <label>Titre</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={editExperience.title}
              onChange={handleChangeExperience}
              placeholder="Entrez le titre de l'expérience"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Entreprise</label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={editExperience.company}
              onChange={handleChangeExperience}
              placeholder="Entrez le nom de l'entreprise"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={editExperience.description}
              onChange={handleChangeExperience}
              placeholder="Entrez une description"
              rows="3"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Date de début</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={editExperience.startDate}
              onChange={handleChangeExperience}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Date de fin</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={editExperience.endDate}
              onChange={handleChangeExperience}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              {editExperience.idExperience ? "Sauvegarder" : "Ajouter"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleCancel("Experience")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* Affichage des messages */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="col-lg-11">
     

        {stagiaire?.experiences?.map((experience, index) => (
          <div key={index} className="experience-card position-relative">
            {/* Menu déroulant discret */}
            <div className="dropdown menu-action position-absolute top-0 end-0 m-2">

              <button
                className="btn btn-light btn-sm rounded-circle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleEditExperienceClick(experience)}
                  >
                    ✏️ Modifier
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() =>
                      handleDeleteExperience(experience.idExperience)
                    }
                  >
                    🗑️ Supprimer
                  </button>
                </li>
              </ul>
            </div>

            {/* Contenu expérience */}
            <div className="experience-timeline-dot"></div>
            <div className="experience-content">
              <h5 className="mb-1 fw-bold">{experience.title}</h5>
              <h6 className="text-muted mb-1">{experience.company}</h6>
              <p className="text-muted small mb-2">
                {experience.startDate} - {experience.endDate || "Aujourd'hui"}
              </p>
              <p className="mb-0">{experience.description}</p>
            </div>
          </div>
        ))}

<button
          className="btn btn-success mb-4"
          onClick={() => {
            setEditExperience({
              title: "",
              company: "",
              description: "",
              startDate: "",
              endDate: "",
            });
            setIsEditingExperience(true);
          }}
        >
          Ajouter une expérience
        </button>
      </div>
    </>
  );
};

export default Experience;
