package com.example.service_stagiaire.service;

import com.example.service_stagiaire.model.*;
import com.example.service_stagiaire.repository.StagiaireRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class StagiaireService {
    private final StagiaireRepository repository;

    public StagiaireService(StagiaireRepository repository) {
        this.repository = repository;
    }

    public List<Stagiaire> getAllStagiaires() {
        return repository.findAll();
    }

    public Optional<Stagiaire> getStagiaireById(String id) {
        return repository.findById(id);
    }

    public Stagiaire createStagiaire(Stagiaire stagiaire) {
        return repository.save(stagiaire);
    }

    public Stagiaire updateStagiaire(String id, Stagiaire stagiaireDetails) {
        return repository.findById(id)
                .map(stagiaire -> {
                    // Mise à jour conditionnelle en fonction des attributs non nulls dans stagiaireDetails
                    if (stagiaireDetails.getFullName() != null) {
                        stagiaire.setFullName(stagiaireDetails.getFullName());
                    }
                    if (stagiaireDetails.getEmail() != null) {
                        stagiaire.setEmail(stagiaireDetails.getEmail());
                    }
                    if (stagiaireDetails.getDateNaissance() != null) {
                        stagiaire.setDateNaissance(stagiaireDetails.getDateNaissance());
                    }
                    if (stagiaireDetails.getPhone() != null) {
                        stagiaire.setPhone(stagiaireDetails.getPhone());
                    }
                    if (stagiaireDetails.getAddress() != null) {
                        stagiaire.setAddress(stagiaireDetails.getAddress());
                    }
                    if (stagiaireDetails.getUniversity() != null) {
                        stagiaire.setUniversity(stagiaireDetails.getUniversity());
                    }
                    if (stagiaireDetails.getEducationLevel() != null) {
                        stagiaire.setEducationLevel(stagiaireDetails.getEducationLevel());
                    }
                    if (stagiaireDetails.getCv() != null) {
                        stagiaire.setCv(stagiaireDetails.getCv());
                    }
                    if (stagiaireDetails.getDescription() != null) {
                        stagiaire.setDescription(stagiaireDetails.getDescription());
                    }
                    if (stagiaireDetails.getProfilePhoto() != null) {
                        stagiaire.setProfilePhoto(stagiaireDetails.getProfilePhoto());
                    }
                    if (stagiaireDetails.getPortfolioLink() != null) {
                        stagiaire.setPortfolioLink(stagiaireDetails.getPortfolioLink());
                    }
                    if (stagiaireDetails.getDomain() != null) {
                        stagiaire.setDomain(stagiaireDetails.getDomain());
                    }
                    if (stagiaireDetails.getLanguages() != null) {
                        stagiaire.setLanguages(stagiaireDetails.getLanguages());
                    }
                    if (stagiaireDetails.getProjets() != null) {
                        stagiaire.setProjets(stagiaireDetails.getProjets());
                    }
                    if (stagiaireDetails.getCompetences() != null) {
                        stagiaire.setCompetences(stagiaireDetails.getCompetences());
                    }
                    if (stagiaireDetails.getExperiences() != null) {
                        stagiaire.setExperiences(stagiaireDetails.getExperiences());
                    }
                    return repository.save(stagiaire);
                })
                .orElseThrow(() -> new RuntimeException("Stagiaire non trouvé"));
    }

    public Stagiaire updateProfile(String id, Stagiaire stagiaireDetails, MultipartFile cvFile, MultipartFile profilePhotoFile) {
        return repository.findById(id)
                .map(stagiaire -> {
                    if (cvFile != null && !cvFile.isEmpty()) {
                        String cvPath = saveFile(cvFile);
                        stagiaire.setCv(cvPath);
                    }
                    if (profilePhotoFile != null && !profilePhotoFile.isEmpty()) {
                        String profilePhotoPath = saveFile(profilePhotoFile);
                        stagiaire.setProfilePhoto(profilePhotoPath);
                    }
                    if (stagiaireDetails.getFullName() != null) {
                        stagiaire.setFullName(stagiaireDetails.getFullName());
                    }
                    if (stagiaireDetails.getEmail() != null) {
                        stagiaire.setEmail(stagiaireDetails.getEmail());
                    }
                    return repository.save(stagiaire);
                })
                .orElseThrow(() -> new RuntimeException("Stagiaire non trouvé"));
    }

    private String saveFile(MultipartFile file) {
        try {
            String uploadsDir = "uploads/";
            Path uploadsPath = Paths.get(uploadsDir);
            if (!Files.exists(uploadsPath)) {
                Files.createDirectories(uploadsPath);
            }
            String filePath = uploadsDir + file.getOriginalFilename();
            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement du fichier", e);
        }
    }

    public void deleteStagiaire(String id) {
        repository.deleteById(id);
    }
}