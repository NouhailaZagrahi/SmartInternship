package com.example.service_stagiaire.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.UUID;

@AllArgsConstructor
public class Projet {
    @Id
    @JsonProperty("idProjet")
    private String idProjet;

    @JsonProperty("title")
    @Field("title")
    private String title;

    @JsonProperty("description")
    @Field("description")
    private String description;

    @JsonProperty("projetImg")
    @Field("projetImg")
    private String projetImg;

    // Constructeur
    public Projet() {
        this.idProjet = UUID.randomUUID().toString(); // Génère un ID unique pour chaque projet
    }

    // Getters et Setters
    public String getIdProjet() { return idProjet; }
    public void setIdProjet(String idProjet) { this.idProjet = idProjet; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProjetImg() { return projetImg; }
    public void setProjetImg(String projetImg) { this.projetImg = projetImg; }
}

