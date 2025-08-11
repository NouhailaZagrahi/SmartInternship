package com.example.Entreprisev1.Controller;

import com.example.Entreprisev1.Models.Entreprise;
import com.example.Entreprisev1.Repository.EntrepriseRepository;
import com.example.Entreprisev1.Service.EntrepriseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/entreprises")
@CrossOrigin(origins = "http://localhost:5173")
public class EntrpriseController {
    private final EntrepriseService entrepriseService;

    public EntrpriseController(EntrepriseService entrepriseService) {
        this.entrepriseService = entrepriseService;
    }

    @GetMapping
    public ResponseEntity<List<Entreprise>> getAllEntreprises() {
        return ResponseEntity.ok(entrepriseService.getAllEntreprises());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        return entrepriseService.getEntrepriseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Entreprise> updateEntreprise(@PathVariable Long id, @RequestBody Entreprise entrepriseDetails) {
        return entrepriseService.updateEntreprise(id, entrepriseDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}