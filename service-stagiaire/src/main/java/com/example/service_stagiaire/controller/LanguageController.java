package com.example.service_stagiaire.controller;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.service.LanguageService;
import com.example.service_stagiaire.service.StagiaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stagiaires/{stagiaireId}/languages")
public class LanguageController {

    private final LanguageService service;

    public LanguageController(LanguageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Language> addLanguage(@PathVariable String stagiaireId, @RequestBody Language language) {
        Stagiaire updatedStagiaire = service.addLanguageToStagiaire(stagiaireId, language);
        if (updatedStagiaire != null) {
            return ResponseEntity.status(201).body(language);
        }
        return ResponseEntity.status(404).body(null);
    }

    @GetMapping
    public ResponseEntity<List<Language>> getLanguages(@PathVariable String stagiaireId) {
        List<Language> languages = service.getLanguagesOfStagiaire(stagiaireId);
        if (languages != null) {
            return ResponseEntity.ok(languages);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/{languageId}")
    public ResponseEntity<Language> updateLanguage(@PathVariable String stagiaireId, @PathVariable String languageId, @RequestBody Language updatedLanguage) {
        Stagiaire updatedStagiaire = service.updateLanguageOfStagiaire(stagiaireId, languageId, updatedLanguage);
        if (updatedStagiaire != null) {
            return ResponseEntity.ok(updatedLanguage);
        }
        return ResponseEntity.status(404).body(null);
    }

    @DeleteMapping("/{languageId}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable String stagiaireId, @PathVariable String languageId) {
        Stagiaire updatedStagiaire = service.removeLanguageFromStagiaire(stagiaireId, languageId);
        if (updatedStagiaire != null) {
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(404).build();
    }
}
