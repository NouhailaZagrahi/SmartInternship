package com.example.service_stagiaire.service;


import com.example.service_stagiaire.model.Language;
import com.example.service_stagiaire.model.Stagiaire;
import com.example.service_stagiaire.repository.StagiaireRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    private final StagiaireRepository repository;

    public LanguageService(StagiaireRepository repository) {
        this.repository = repository;
    }

    public Stagiaire addLanguageToStagiaire(String stagiaireId, Language language) {
        Optional<Stagiaire> stagiaireById = repository.findById(stagiaireId);
        if (stagiaireById.isPresent()) {
            Stagiaire stagiaire = stagiaireById.get();
            stagiaire.getLanguages().add(language);
            return repository.save(stagiaire);
        }
        return null;
    }

    public List<Language> getLanguagesOfStagiaire(String stagiaireId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        return stagiaireOpt.map(Stagiaire::getLanguages).orElse(null);
    }

    public Stagiaire updateLanguageOfStagiaire(String stagiaireId, String language, Language updatedLanguage) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Language> languages = stagiaire.getLanguages();
            for (Language lang : languages) {
                if (lang.getLanguage().equals(language)) {
                    lang.setLanguage(updatedLanguage.getLanguage());
                    lang.setLevel(updatedLanguage.getLevel());
                    return repository.save(stagiaire);
                }
            }
        }
        return null;
    }

    public Stagiaire removeLanguageFromStagiaire(String stagiaireId, String languageId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Language> languages = stagiaire.getLanguages();
            languages.removeIf(lang -> lang.getLanguage().equals(languageId));
            return repository.save(stagiaire);
        }
        return null;
    }
}

