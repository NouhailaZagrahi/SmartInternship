package com.example.Entreprisev1.Service;

import com.example.Entreprisev1.Models.Entreprise;
import com.example.Entreprisev1.Repository.EntrepriseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepriseService {
    private final EntrepriseRepository entrepriseRepository;

    public EntrepriseService(EntrepriseRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    public Optional<Entreprise> getEntrepriseById(Long id) {
        return entrepriseRepository.findById(id);
    }
    public Optional<Entreprise> updateEntreprise(Long id, Entreprise entrepriseDetails) {
        return entrepriseRepository.findById(id)
                .map(entreprise -> {
                    entreprise.setName(entrepriseDetails.getName());
                    entreprise.setDescription(entrepriseDetails.getDescription());
                    entreprise.setDomaine(entrepriseDetails.getDomaine());
                    entreprise.setPhone(entrepriseDetails.getPhone());
                    entreprise.setAdresse(entrepriseDetails.getAdresse());
                    entreprise.setWebsite(entrepriseDetails.getWebsite());
                    entreprise.setLogo(entrepriseDetails.getLogo());
                    entreprise.setNombreEmployes(entrepriseDetails.getNombreEmployes());
                    entreprise.setTaille(entrepriseDetails.getTaille());
                    return entrepriseRepository.save(entreprise);
                });
    }
}

