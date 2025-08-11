package com.example.service_stagiaire.controller;



import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class FileUploadsProjetcsCntroller {

    @GetMapping("/uploads/projects/{filename}")
    public ResponseEntity<Resource> serveProjectImage(@PathVariable String filename) {
        try {
            // Chemin du répertoire des fichiers
            Path filePath = Paths.get("uploads/projects").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Vérifie si le fichier existe
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Définir le type MIME
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}