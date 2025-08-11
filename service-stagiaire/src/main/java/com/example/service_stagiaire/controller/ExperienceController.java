package com.example.service_stagiaire.controller;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.service.ExperienceService;
import com.example.service_stagiaire.service.StagiaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stagiaires/{stagiaireId}/experiences")
public class ExperienceController {

    private final ExperienceService service;

    public ExperienceController(ExperienceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Experience> addExperience(@PathVariable String stagiaireId, @RequestBody Experience experience) {
        Stagiaire updatedStagiaire = service.addExperienceToStagiaire(stagiaireId, experience);
        if (updatedStagiaire != null) {
            return ResponseEntity.status(201).body(experience);
        }
        return ResponseEntity.status(404).body(null);
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getExperiences(@PathVariable String stagiaireId) {
        List<Experience> experiences = service.getExperiencesOfStagiaire(stagiaireId);
        if (experiences != null) {
            return ResponseEntity.ok(experiences);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<Experience> updateExperience(@PathVariable String stagiaireId, @PathVariable String experienceId, @RequestBody Experience updatedExperience) {
        Stagiaire updatedStagiaire = service.updateExperienceOfStagiaire(stagiaireId, experienceId, updatedExperience);
        if (updatedStagiaire != null) {
            return ResponseEntity.ok(updatedExperience);
        }
        return ResponseEntity.status(404).body(null);
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable String stagiaireId, @PathVariable String experienceId) {
        Stagiaire updatedStagiaire = service.removeExperienceFromStagiaire(stagiaireId, experienceId);
        if (updatedStagiaire != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(404).build();
    }
}

