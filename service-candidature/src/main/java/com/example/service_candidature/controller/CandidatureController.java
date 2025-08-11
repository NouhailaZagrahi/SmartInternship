package com.example.service_candidature.controller;

import com.example.service_candidature.model.Candidature;
import com.example.service_candidature.repository.CandidatureRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    private final CandidatureRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public CandidatureController(CandidatureRepository repository) {
        this.repository = repository;
    }

    private void notifyCandidature(Long idCandidature) {
        String url = "http://localhost:8090/api/notifications/" + idCandidature;
        restTemplate.postForObject(url, null, Void.class);
    }

    @GetMapping("/stagiaire/{idStagiaire}")
    public List<Candidature> getByIdStagiaire(@PathVariable String idStagiaire) {
        return repository.findByIdStagiaire(idStagiaire);
    }

    @GetMapping("/{id}")
    public Candidature getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée avec l'ID : " + id));
    }

    @GetMapping
    public List<Candidature> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Candidature save(@RequestBody Candidature candidature) {
        return repository.save(candidature);
    }

    @PutMapping("/{id}/statut")
    public Candidature updateStatut(@PathVariable Long id, @RequestBody String statut) {
        return repository.findById(id).map(candidature -> {
            candidature.setStatut(statut);
            Candidature saved = repository.save(candidature);
            notifyCandidature(id); // Notifie ici
            return saved;
        }).orElseThrow(() -> new RuntimeException("Candidature non trouvée avec l'ID : " + id));
    }

    @PutMapping("/stagiaire/{idStagiaire}/statut")
    public List<Candidature> updateStatutByStagiaire(@PathVariable String idStagiaire, @RequestBody String statut) {
        List<Candidature> candidatures = repository.findByIdStagiaire(idStagiaire);

        if (candidatures.isEmpty()) {
            throw new RuntimeException("Aucune candidature trouvée pour le stagiaire avec l'ID : " + idStagiaire);
        }

        candidatures.forEach(c -> {
            c.setStatut(statut);
            repository.save(c);
            notifyCandidature(c.getIdCandidature()); // Notifie ici
        });
        return candidatures;
    }

    @PutMapping("/annuler/{id}")
    public Candidature annulerCandidature(@PathVariable("id") Long idCandidature) {
        Optional<Candidature> candidatureOpt = repository.findById(idCandidature);
        if (candidatureOpt.isPresent()) {
            Candidature candidature = candidatureOpt.get();
            candidature.setStatut("annulée");
            Candidature saved = repository.save(candidature);
            notifyCandidature(idCandidature); // Notifie ici
            return saved;
        } else {
            throw new RuntimeException("Candidature non trouvée avec l'ID: " + idCandidature);
        }
    }

    @PutMapping("/{id}/stageEffectue")
    public Candidature updateStageEffectue(@PathVariable Long id, @RequestBody boolean stageEffectue) {
        return repository.findById(id).map(c -> {
            c.setStageEffectue(stageEffectue);
            return repository.save(c);
        }).orElseThrow(() -> new RuntimeException("Candidature non trouvée avec l'ID : " + id));
    }
}