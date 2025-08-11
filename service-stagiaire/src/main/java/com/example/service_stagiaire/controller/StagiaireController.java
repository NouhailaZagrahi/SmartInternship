package com.example.service_stagiaire.controller;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.service.StagiaireService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/stagiaires")
public class StagiaireController {

    private final StagiaireService service;


    public StagiaireController(StagiaireService stagiaireService) {
        this.service = stagiaireService;

    }

    // Opérations CRUD de base
    @GetMapping
    public List<Stagiaire> getAll() {
        return service.getAllStagiaires();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Stagiaire> getById(@PathVariable String id) {
        return service.getStagiaireById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Stagiaire create(@RequestBody Stagiaire stagiaire) {
        return service.createStagiaire(stagiaire);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stagiaire> update(@PathVariable String id, @RequestBody Stagiaire stagiaireDetails) {
        return ResponseEntity.ok(service.updateStagiaire(id, stagiaireDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteStagiaire(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/profile", consumes = {"multipart/form-data"})
    public ResponseEntity<Stagiaire> updateProfile(
            @PathVariable String id,
            @RequestPart("stagiaire") String stagiaireJson,
            @RequestPart(value = "cv", required = false) MultipartFile cvFile,
            @RequestPart(value = "profilePhoto", required = false) MultipartFile profilePhotoFile) {
        try {
            // Convertir le JSON en objet Stagiaire
            ObjectMapper objectMapper = new ObjectMapper();
            Stagiaire stagiaireDetails = objectMapper.readValue(stagiaireJson, Stagiaire.class);

            // Appeler le service pour mettre à jour le profil
            return ResponseEntity.ok(service.updateProfile(id, stagiaireDetails, cvFile, profilePhotoFile));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}