package com.example.service_stagiaire.service;

import com.example.service_stagiaire.model.Experience;
import com.example.service_stagiaire.model.Stagiaire;
import com.example.service_stagiaire.repository.StagiaireRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    private final StagiaireRepository repository;

    public ExperienceService(StagiaireRepository repository) {
        this.repository = repository;
    }

    public Stagiaire addExperienceToStagiaire(String stagiaireId, Experience experience) {
        Optional<Stagiaire> stagiaireById = repository.findById(stagiaireId);
        if (stagiaireById.isPresent()) {
            Stagiaire stagiaire = stagiaireById.get();
            stagiaire.getExperiences().add(experience);
            return repository.save(stagiaire);
        }
        return null;
    }

    public List<Experience> getExperiencesOfStagiaire(String stagiaireId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        return stagiaireOpt.map(Stagiaire::getExperiences).orElse(null);
    }

    public Stagiaire updateExperienceOfStagiaire(String stagiaireId, String experienceId, Experience updatedExperience) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Experience> experiences = stagiaire.getExperiences();

            for (Experience experience : experiences) {
                if (experience.getIdExperience().equals(experienceId)) {
                    experience.setTitle(updatedExperience.getTitle());
                    experience.setCompany(updatedExperience.getCompany());
                    experience.setStartDate(updatedExperience.getStartDate());
                    experience.setEndDate(updatedExperience.getEndDate());
                    experience.setDescription(updatedExperience.getDescription());
                    return repository.save(stagiaire);
                }
            }
        }
        return null;
    }

    public Stagiaire removeExperienceFromStagiaire(String stagiaireId, String experienceId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Experience> experiences = stagiaire.getExperiences();
            experiences.removeIf(exp -> exp.getIdExperience().equals(experienceId));
            return repository.save(stagiaire);
        }
        return null;
    }
}
