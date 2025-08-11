package com.example.service_stagiaire.controller;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.service.ProjetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/stagiaires/{stagiaireId}/projets")
public class ProjetController {

    private final ProjetService service;

    public ProjetController(ProjetService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Projet> addProjet(
        @PathVariable String stagiaireId,
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam(value = "projetImg", required = false) MultipartFile projetImgFile
    ) {
        try {
            // Log pour vérifier les données reçues
            System.out.println("Titre : " + title);
            System.out.println("Description : " + description);
            if (projetImgFile != null) {
                System.out.println("Fichier reçu : " + projetImgFile.getOriginalFilename());
            }

            // Appel à la méthode corrigée
            Projet newProjet = service.addProjetToStagiaire(stagiaireId, title, description, projetImgFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(newProjet);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Projet>> getProjets(@PathVariable String stagiaireId) {
        List<Projet> projets = service.getProjetsOfStagiaire(stagiaireId);
        if (projets != null) {
            return ResponseEntity.ok(projets);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/{projetId}")
    public ResponseEntity<Projet> updateProjet(
        @PathVariable String stagiaireId,
        @PathVariable String projetId,
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam(value = "projetImg", required = false) MultipartFile projetImgFile
    ) {
        try {
            Projet updatedProjet = service.updateProjetOfStagiaire(
                stagiaireId, projetId, title, description, projetImgFile
            );
            return ResponseEntity.ok(updatedProjet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{projetId}")
    public ResponseEntity<Void> deleteProjet(@PathVariable String stagiaireId, @PathVariable String projetId) {
        Stagiaire updatedStagiaire = service.removeProjetFromStagiaire(stagiaireId, projetId);
        if (updatedStagiaire != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(404).build();
    }
}
