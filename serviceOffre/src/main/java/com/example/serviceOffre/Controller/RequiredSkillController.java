package com.example.serviceOffre.Controller;
import com.example.serviceOffre.Model.RequiredSkill;
import com.example.serviceOffre.Repositories.RequiredSkillRepository;
import com.example.serviceOffre.Services.RequiredSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/skills")
public class RequiredSkillController {

    @Autowired
    private RequiredSkillService skillService;

    @Autowired
    private RequiredSkillRepository skillRepository; //  Injection du repo ici

    @PostMapping
    public RequiredSkill createSkill(@RequestBody RequiredSkill skill) {
        return skillService.saveSkill(skill);
    }

    @GetMapping("/offre/{idOffre}")
    public List<RequiredSkill> getSkillsByOffreId(@PathVariable Long idOffre) {
        return skillRepository.findByOffre_IdOffre(idOffre);
    }

    @GetMapping("/{id}")
    public RequiredSkill getSkill(@PathVariable Long id) {
        return skillService.getSkillById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
    @GetMapping("/stats/competences")
    public Map<String, Long> getSkillsStats() {
        return skillService.countSkillsFrequency();
    }
}
