package com.example.serviceOffre.Controller;

import com.example.serviceOffre.Model.Offre;
import com.example.serviceOffre.Model.RequiredSkill;
import com.example.serviceOffre.Repositories.OffreRepository;
import com.example.serviceOffre.Services.OffreService;
import com.example.serviceOffre.Services.RequiredSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/offres")
public class OffreController {

    @Autowired
    private OffreService offreService;
    private OffreRepository offreRepository;
    @Autowired
    private RequiredSkillService requiredSkillService;

    public OffreController(OffreRepository offreRepository) {
        this.offreRepository = offreRepository;
    }

    @GetMapping
    public List<Offre> getAllOffres() {
        // Exemple : récupérer les offres depuis la base de données
        return offreRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Offre> createOffre(@RequestBody Offre offre) {

        if (offre.getRequiredSkills() != null) {
            for (RequiredSkill skill : offre.getRequiredSkills()) {
                skill.setOffre(offre);
            }
        }

        Offre saved = offreService.saveWithSkills(offre);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/entreprises/{idEntreprise}")
    public List<Offre> getOffresByEntreprise(@PathVariable Long idEntreprise) {
        return offreService.getOffresByEntrepriseId(idEntreprise);
    }


    @GetMapping("/{id}")
    public Offre getOffre(@PathVariable Long id) {
        return offreService.getOffreById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteOffre(@PathVariable Long id) {
        offreService.deleteOffre(id);
    }
    @GetMapping("/count/{idEntreprise}")
    public ResponseEntity<Long> getOffreCount(@PathVariable Long idEntreprise) {
        return ResponseEntity.ok(offreService.countOffresByEntreprise(idEntreprise));
    }

    @GetMapping("/by-domaine/{idEntreprise}")
    public ResponseEntity<Map<String, Long>> getOffresByDomaine(@PathVariable Long idEntreprise) {
        return ResponseEntity.ok(offreService.countOffresByDomaine(idEntreprise));
    }
    @GetMapping("/stats/type-stage/{idEntreprise}")
    public Map<String, Long> getStatsByType(@PathVariable Long idEntreprise) {
        return offreService.countOffresByType(idEntreprise);
    }

    @GetMapping("/stats/competences")
    public Map<String, Long> getSkillsDistribution() {
        return requiredSkillService.countSkillsFrequency();
    }

    @GetMapping("/stats/statut/{idEntreprise}")
    public Map<String, Map<String, Long>> getStatusStats(@PathVariable Long idEntreprise) {
        return offreService.countStatusByDomain(idEntreprise);
    }

    @GetMapping("/stats/localisation/{idEntreprise}")
    public Map<String, Long> getLocationStats(@PathVariable Long idEntreprise) {
        return offreService.countByLocation(idEntreprise);
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllOffres() {
        offreService.deleteAllOffres();
        return ResponseEntity.noContent().build();
    }

}
