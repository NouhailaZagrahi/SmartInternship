package com.example.service_candidature.model;


import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCandidature;

    private Long idOffre;

    private String idStagiaire;

    private String statut;

    @Temporal(TemporalType.DATE)
    private Date datePostulation;

    private boolean stageEffectue;


    // Getters & Setters
    public Long getIdCandidature() {
        return idCandidature;
    }

    public void setIdCandidature(Long idCandidature) {
        this.idCandidature = idCandidature;
    }

    public Long getIdOffre() {
        return idOffre;
    }

    public void setIdOffre(Long idOffre) {
        this.idOffre = idOffre;
    }

    public String getIdStagiaire() {
        return idStagiaire;
    }

    public void setIdStagiaire(String idStagiaire) {
        this.idStagiaire = idStagiaire;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Date getDatePostulation() {
        return datePostulation;
    }

    public void setDatePostulation(Date datePostulation) {
        this.datePostulation = datePostulation;
    }

    public Boolean getStageEffectue() {
        return stageEffectue;
    }

    public void setStageEffectue(Boolean stageEffectue) {
        this.stageEffectue = stageEffectue;
    }


}

