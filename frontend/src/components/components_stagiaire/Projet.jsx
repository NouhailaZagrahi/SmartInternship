import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const Projet = ({
  stagiaire,
  isEditingProjet,
  handleEditProjetClick,
  handleChangeProjet,
  editProjet,
  handleSaveProjet,
  handleCancel,
  setEditProjet,
  handleDeleteProjet,
  handleAddProjet,
  setIsEditingProjet,
  successMessage,
}) => {
  const [previewImage, setPreviewImage] = useState(null); // État pour l'aperçu de l'image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProjet((prev) => ({
        ...prev,
        imageFile: file,
      }));
      setPreviewImage(URL.createObjectURL(file)); // Génère un aperçu de l'image
    }
  };

  if (isEditingProjet && editProjet) {
    return (
      <div className="pt-3">
        <div className="edit-projet-form card shadow-lg p-4">
          <h4 className="text-center mb-4 text-primary">
            {editProjet.idProjet ? "Modifier le projet" : "Ajouter un projet"}
          </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editProjet.idProjet) {
                handleSaveProjet(
                  stagiaire._id,
                  editProjet.idProjet,
                  editProjet
                );
              } else {
                handleAddProjet(editProjet);
              }
            }}
          >
            {/* Ligne pour Titre et Description */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label text-secondary">Titre</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="title"
                  value={editProjet.title}
                  onChange={handleChangeProjet}
                  placeholder="Entrez le titre du projet"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-secondary">Description</label>
                <textarea
                  className="form-control form-control-lg"
                  name="description"
                  value={editProjet.description}
                  onChange={handleChangeProjet}
                  rows="2"
                  placeholder="Entrez la description du projet"
                  required
                />
              </div>
            </div>

            {/* Ligne pour Image et Aperçu */}
            <div className="row mb-4 align-items-center">
              <div className="col-md-6">
                <label className="form-label text-secondary">
                  Image du projet
                </label>
                <input
                  type="file"
                  className="form-control form-control-lg"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <div className="col-md-6 text-center">
                {previewImage ? (
                  // Affiche l'aperçu de l'image sélectionnée
                  <img
                    src={previewImage}
                    alt="Aperçu"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : editProjet.projetImg ? (
                  // Affiche l'image du projet existant lors de la modification
                  <img
                    src={`http://localhost:8081/${editProjet.projetImg}`}
                    alt="Image du projet"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  // Affiche une image par défaut si aucune image n'est disponible
                  <img
                    src="images/default-project.png"
                    alt="Image par défaut"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </div>
            </div>

            {/* Boutons */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary btn-lg">
                {editProjet.idProjet ? "Sauvegarder" : "Ajouter"}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => {
                  handleCancel("Projet");
                  setPreviewImage(null); // Réinitialise l'aperçu de l'image
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-section">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

     

      <div className="project-grid">
        {stagiaire?.projets?.map((projet, index) => (
          <div key={index} className="project-card card shadow-sm mb-4">
            <div className="project-image">
              <img
                src={
                  projet.projetImg
                    ? `http://localhost:8081/${projet.projetImg}`
                    : "images/default-project.png"
                }
                alt={projet.title || "Projet"}
                className="img-fluid rounded-top"
              />
            </div>
            <div className="project-details p-3">
              <h5 className="text-primary">
                {projet.title || "Titre du projet"}
              </h5>
              <p className="text-muted">
                {projet.description || "Description du projet"}
              </p>
              <div className="project-actions d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditProjetClick(projet)}
                >
                  <FontAwesomeIcon icon={faPen} /> Modifier
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer ce projet ?"
                      )
                    ) {
                      handleDeleteProjet(projet.idProjet);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-success add-project-btn mb-4"
        onClick={() => {
          setEditProjet({ title: "", description: "", projetImg: null });
          setIsEditingProjet(true);
          setPreviewImage(null); // Réinitialise l'aperçu de l'image
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Ajouter un projet
      </button>
    </div>
  );
};

export default Projet;
