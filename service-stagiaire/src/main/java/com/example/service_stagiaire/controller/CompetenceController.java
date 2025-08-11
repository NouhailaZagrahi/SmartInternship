package com.example.service_stagiaire.controller;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.service.CompetenceService;
import com.example.service_stagiaire.service.StagiaireService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stagiaires/{stagiaireId}/competences")
public class CompetenceController {

    private final CompetenceService service;

    public CompetenceController(CompetenceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Competence> addCompetence(@PathVariable String stagiaireId, @RequestBody Competence competence) {
        Stagiaire updatedStagiaire = service.addCompetenceToStagiaire(stagiaireId, competence);
        if (updatedStagiaire != null) {
            return ResponseEntity.status(201).body(competence);
        }
        return ResponseEntity.status(404).body(null);
    }

    @GetMapping
    public ResponseEntity<List<Competence>> getCompetences(@PathVariable String stagiaireId) {
        List<Competence> competences = service.getCompetencesOfStagiaire(stagiaireId);
        if (competences != null) {
            return ResponseEntity.ok(competences);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/{competenceId}")
    public ResponseEntity<Competence> updateCompetence(@PathVariable String stagiaireId, @PathVariable String competenceId, @RequestBody Competence updatedCompetence) {
        Stagiaire updatedStagiaire = service.updateCompetenceOfStagiaire(stagiaireId, competenceId, updatedCompetence);
        if (updatedStagiaire != null) {
            return ResponseEntity.ok(updatedCompetence);
        }
        return ResponseEntity.status(404).body(null);
    }

}