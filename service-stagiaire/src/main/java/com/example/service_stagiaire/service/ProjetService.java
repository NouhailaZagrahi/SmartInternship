package com.example.service_stagiaire.service;

import com.example.service_stagiaire.model.Projet;
import com.example.service_stagiaire.model.Stagiaire;
import com.example.service_stagiaire.repository.StagiaireRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjetService {

    private final StagiaireRepository repository;

    public ProjetService(StagiaireRepository repository) {
        this.repository = repository;
    }

    public Stagiaire addProjetToStagiaire(String stagiaireId, Projet projet) {
        Optional<Stagiaire> stagiaireById = repository.findById(stagiaireId);
        if (stagiaireById.isPresent()) {
            Stagiaire stagiaire = stagiaireById.get();
            if (projet.getIdProjet() == null || projet.getIdProjet().isEmpty()) {
                projet.setIdProjet(UUID.randomUUID().toString());
            }
            stagiaire.getProjets().add(projet);
            return repository.save(stagiaire);
        }
        return null;
    }

    public Projet addProjetToStagiaire(String stagiaireId, String title, String description, MultipartFile projetImgFile) throws IOException {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            Projet newProjet = new Projet();
            newProjet.setIdProjet(UUID.randomUUID().toString());
            newProjet.setTitle(title);
            newProjet.setDescription(description);

            // Enregistrer l'image si elle est présente
            if (projetImgFile != null && !projetImgFile.isEmpty()) {
                String imagePath = saveFile(projetImgFile, "uploads/projects/");
                newProjet.setProjetImg(imagePath);
            }

            stagiaire.getProjets().add(newProjet);
            repository.save(stagiaire);
            return newProjet;
        } else {
            throw new RuntimeException("Stagiaire non trouvé");
        }
    }

    public List<Projet> getProjetsOfStagiaire(String stagiaireId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        return stagiaireOpt.map(Stagiaire::getProjets).orElse(null);
    }

    public Projet updateProjetOfStagiaire(String stagiaireId, String projetId, String title, String description, MultipartFile projetImgFile) throws IOException {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Projet> projets = stagiaire.getProjets();
            for (Projet projet : projets) {
                if (projet.getIdProjet().equals(projetId)) {
                    projet.setTitle(title);
                    projet.setDescription(description);

                    if (projetImgFile != null && !projetImgFile.isEmpty()) {
                        String imagePath = saveFile(projetImgFile, "uploads/projects/");
                        projet.setProjetImg(imagePath); // Mettez à jour le chemin de l'image
                    }

                    repository.save(stagiaire);
                    return projet;
                }
            }
        }
        throw new RuntimeException("Projet ou stagiaire non trouvé");
    }

    private String saveFile(MultipartFile file, String directory) throws IOException {
        Path uploadsPath = Paths.get(directory);
        if (!Files.exists(uploadsPath)) {
            Files.createDirectories(uploadsPath);
        }
        String filePath = directory + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
        return filePath;
    }

    public Stagiaire removeProjetFromStagiaire(String stagiaireId, String projetId) {
        Optional<Stagiaire> stagiaireOpt = repository.findById(stagiaireId);
        if (stagiaireOpt.isPresent()) {
            Stagiaire stagiaire = stagiaireOpt.get();
            List<Projet> projets = stagiaire.getProjets();
            projets.removeIf(projet -> projet.getIdProjet().equals(projetId));
            return repository.save(stagiaire);
        }
        return null;
    }
}
