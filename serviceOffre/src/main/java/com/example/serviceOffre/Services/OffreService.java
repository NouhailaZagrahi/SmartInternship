package com.example.serviceOffre.Services;

import com.example.serviceOffre.Model.Offre;
import com.example.serviceOffre.Model.RequiredSkill;
import com.example.serviceOffre.Repositories.OffreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
public class OffreService {
    @Autowired
    private OffreRepository offreRepository;

    private  RequiredSkillService requiredSkillService;


    public OffreService(RequiredSkillService requiredSkillService) {
        this.requiredSkillService = requiredSkillService;
    }



    //public Offre saveOffre(Offre offre) {
    //    return offreRepository.save(offre);
    //}

    public List<Offre> getOffresByEntrepriseId(Long idEntreprise) {
        return offreRepository.findByIdEntreprise(idEntreprise);
    }
    public Offre saveWithSkills(Offre offre) {
        Offre savedOffre = offreRepository.save(offre);

        offre.getRequiredSkills().forEach(skill -> {
            skill.setOffre(savedOffre);
            requiredSkillService.saveSkill(skill);
        });

        return savedOffre;
    }


    public Offre getOffreById(Long id) {
        return offreRepository.findById(id).orElse(null);
    }

    public void deleteOffre(Long id) {
        offreRepository.deleteById(id);
    }
    // Dans OffreService.java
    public Long countOffresByEntreprise(Long idEntreprise) {
        return offreRepository.countByEntreprise(idEntreprise);
    }


    public Map<String, Long> countOffresByDomaine(Long idEntreprise) {
        List<Object[]> results = offreRepository.countByDomaineDeStage(idEntreprise);
        return results.stream()
                .filter(arr -> arr[0] != null) // Filtrer les domaines null
                .collect(Collectors.toMap(
                        arr -> ((String) arr[0]).trim(),
                        arr -> (Long) arr[1],
                        (oldVal, newVal) -> oldVal,
                        LinkedHashMap::new
                ));
    }
    public Map<String, Long> countOffresByType(Long idEntreprise) {
        return offreRepository.countByTypeDeStage(idEntreprise).stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }

    public Map<String, Map<String, Long>> countStatusByDomain(Long idEntreprise) {
        return offreRepository.countStatusByDomain(idEntreprise).stream()
                .collect(Collectors.groupingBy(
                        arr -> (String) arr[0],
                        Collectors.toMap(
                                arr -> (String) arr[1],
                                arr -> (Long) arr[2]
                        )
                ));
    }

    public Map<String, Long> countByLocation(Long idEntreprise) {
        return offreRepository.countByLocation(idEntreprise).stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }

    public void deleteAllOffres() {
        offreRepository.deleteAll();
    }

}

