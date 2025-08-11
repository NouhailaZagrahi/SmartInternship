package com.example.enregistrement_service.repository;

import com.example.enregistrement_service.model.Favoris;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavorisRepository extends MongoRepository<Favoris, String> {
    List<Favoris> findByIdStagiaire(String idStagiaire);
    void deleteByIdStagiaireAndIdOffre(String idStagiaire, String idOffre);
}