package com.example.service_candidature.repository;


import com.example.service_candidature.model.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    List<Candidature> findByIdStagiaire(String idStagiaire);
}

