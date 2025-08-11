package com.example.enregistrement_service.controller;

import com.example.enregistrement_service.model.Favoris;
import com.example.enregistrement_service.service.FavorisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoris")
public class FavorisController {

    @Autowired
    private FavorisService favorisService;

    @PostMapping
    public ResponseEntity<Favoris> createFavori(@RequestBody Favoris favoris) {
        Favoris createdFavori = favorisService.addFavori(favoris);
        return ResponseEntity.ok(createdFavori);
    }

    @GetMapping("/stagiaire/{idStagiaire}")
    public ResponseEntity<List<Favoris>> getFavorisByStagiaire(@PathVariable String idStagiaire) {
        List<Favoris> favorisList = favorisService.getFavorisByStagiaire(idStagiaire);
        return ResponseEntity.ok(favorisList);
    }

    @DeleteMapping("/stagiaire/{idStagiaire}/offre/{idOffre}")
    public ResponseEntity<Void> deleteFavori(@PathVariable String idStagiaire, @PathVariable String idOffre) {
        favorisService.deleteFavoriByStagiaireAndOffre(idStagiaire, idOffre);
        return ResponseEntity.noContent().build();
    }
}