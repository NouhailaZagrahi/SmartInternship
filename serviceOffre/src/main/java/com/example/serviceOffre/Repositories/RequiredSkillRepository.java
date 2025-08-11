package com.example.serviceOffre.Repositories;

import com.example.serviceOffre.Model.RequiredSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequiredSkillRepository extends JpaRepository<RequiredSkill, Long> {
    List<RequiredSkill> findByOffre_IdOffre(Long idOffre);
    @Query("SELECT s.nomSkill, COUNT(s) FROM RequiredSkill s GROUP BY s.nomSkill")
    List<Object[]> countSkillsFrequency();
}

