package com.example.enregistrement_service.service;

import com.example.enregistrement_service.model.Favoris;
import com.example.enregistrement_service.repository.FavorisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavorisService {

    private final FavorisRepository favorisRepository;

    @Autowired
    public FavorisService(FavorisRepository favorisRepository) {
        this.favorisRepository = favorisRepository;
    }

    public Favoris addFavori(Favoris favoris) {
        return favorisRepository.save(favoris);
    }

    public List<Favoris> getAllFavoris() {
        return favorisRepository.findAll();
    }

    public Optional<Favoris> getFavoriById(String id) {
        return favorisRepository.findById(id);
    }

    public void deleteFavori(String id) {
        favorisRepository.deleteById(id);
    }


    public List<Favoris> getFavorisByStagiaire(String idStagiaire) {
        return favorisRepository.findByIdStagiaire(idStagiaire);
    }

    public void deleteFavoriByStagiaireAndOffre(String idStagiaire, String idOffre) {
        favorisRepository.deleteByIdStagiaireAndIdOffre(idStagiaire, idOffre);
    }
}