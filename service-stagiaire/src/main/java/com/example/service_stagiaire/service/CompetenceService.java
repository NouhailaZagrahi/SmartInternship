package com.example.service_stagiaire.service;

import com.example.service_stagiaire.model.Competence;
import com.example.service_stagiaire.model.Stagiaire;
import com.example.service_stagiaire.repository.StagiaireRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompetenceService {

    private final StagiaireRepository repository;

    public CompetenceService(StagiaireRepository repository) {
        this.repository = repository;
    }

    //=============================================Competence==========================================================//
    // Ajouter une compétence à un stagiaire
    public Stagiaire addCompetenceToStagiaire(String stagiaireId, Competence competence) {
        Optional<Stagiaire> stagiaireById = repository.findById(stagiaireId);
        if (stagiaireById.isPresent()) {
            Stagiaire stagiaire = stagiaireById.get();

            // Initialisation si nécessaire
            if (stagiaire.getCompetences() == null) {
                stagiaire.setCompetences(new ArrayList<>());
            }

            stagiaire.getCompetences().add(competence);
            return repository.save(stagiaire);
        }
        return null;
    }

    // Récupérer toutes les compétences d'un stagiaire
    public List<Competence> getCompetencesOfStagiaire(String stagiaireId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        return stagiaireOpt.map(Stagiaire::getCompetences).orElse(null);
    }

    // Mettre à jour une compétence d'un stagiaire
    public Stagiaire updateCompetenceOfStagiaire(String stagiaireId, String competenceId, Competence updatedCompetence) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Competence> competences = stagiaire.getCompetences();

            for (Competence competence : competences) {
                if (competence.getIdCompetence().equals(competenceId)) {
                    // Conserve l'ID existant
                    updatedCompetence.setIdCompetence(competenceId);

                    competence.setcompetenceName(updatedCompetence.getcompetenceName());
                    competence.setLevel(updatedCompetence.getLevel());
                    return repository.save(stagiaire);
                }
            }
        }
        return null;
    }

    // Supprimer une compétence d'un stagiaire
    public Stagiaire removeCompetenceFromStagiaire(String stagiaireId, String competenceId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Competence> competences = stagiaire.getCompetences();
            competences.removeIf(comp -> comp.getIdCompetence().equals(competenceId));
            return repository.save(stagiaire);
        }
        return null;
    }
}
