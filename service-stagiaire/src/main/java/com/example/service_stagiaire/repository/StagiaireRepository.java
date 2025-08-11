package com.example.service_stagiaire.repository;

import com.example.service_stagiaire.model.Stagiaire;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StagiaireRepository extends MongoRepository<Stagiaire, String> {
    Optional<Stagiaire> findById(String id);
}
