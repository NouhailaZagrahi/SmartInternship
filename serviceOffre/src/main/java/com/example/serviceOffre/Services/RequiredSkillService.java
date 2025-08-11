package com.example.serviceOffre.Services;


import com.example.serviceOffre.Model.RequiredSkill;
import com.example.serviceOffre.Repositories.RequiredSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RequiredSkillService {

    @Autowired
    private RequiredSkillRepository requiredSkillRepository;

    public RequiredSkill saveSkill(RequiredSkill skill) {
        return requiredSkillRepository.save(skill);
    }

    public List<RequiredSkill> getAllSkills() {
        return requiredSkillRepository.findAll();
    }

    public RequiredSkill getSkillById(Long id) {
        return requiredSkillRepository.findById(id).orElse(null);
    }

    public void deleteSkill(Long id) {
        requiredSkillRepository.deleteById(id);
    }
    public Map<String, Long> countSkillsFrequency() {
        return requiredSkillRepository.countSkillsFrequency().stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }
}
