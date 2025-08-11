package com.example.notification_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String idScandidature;
    private String idStagiaire; // Ajouté
    private String heure;
    private boolean lu = false;

    // Getters et setters...
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getIdScandidature() { return idScandidature; }
    public void setIdScandidature(String idScandidature) { this.idScandidature = idScandidature; }

    public String getIdStagiaire() { return idStagiaire; }
    public void setIdStagiaire(String idStagiaire) { this.idStagiaire = idStagiaire; }

    public String getHeure() { return heure; }
    public void setHeure(String heure) { this.heure = heure; }

    public boolean isLu() { return lu; }
    public void setLu(boolean lu) { this.lu = lu; }
}