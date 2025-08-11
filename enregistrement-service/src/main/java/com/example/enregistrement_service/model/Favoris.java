package com.example.enregistrement_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favoris")
public class Favoris {
    
    @Id
    private String id;
    private String idStagiaire;
    private String idOffre;

    public Favoris() {
    }

    public Favoris(String idStagiaire, String idOffre) {
        this.idStagiaire = idStagiaire;
        this.idOffre = idOffre;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdStagiaire() {
        return idStagiaire;
    }

    public void setIdStagiaire(String idStagiaire) {
        this.idStagiaire = idStagiaire;
    }

    public String getIdOffre() {
        return idOffre;
    }

    public void setIdOffre(String idOffre) {
        this.idOffre = idOffre;
    }
}