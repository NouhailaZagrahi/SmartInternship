package com.example.serviceOffre.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOffre;
    @Column(name = "identreprise")
    private Long idEntreprise;

    private String title;
    private String description;
    private String domaineDeStage;
    private String location;
    private int duration;
    private LocalDate dateStart;
    private boolean preEmbauche;
    private float remuneration;
    private String typeDeStage;
    private String statut; // en cours, terminé...//il se peut que je la supprime

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "offre")
    @JsonManagedReference
    private List<RequiredSkill> requiredSkills;


    public Long getIdOffre() {
        return idOffre;
    }

    public void setIdOffre(Long idOffre) {
        this.idOffre = idOffre;
    }

    public Long getIdEntreprise() {
        return idEntreprise;
    }

    public void setIdEntreprise(Long idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDomaineDeStage() {
        return domaineDeStage;
    }

    public void setDomaineDeStage(String domaineDeStage) {
        this.domaineDeStage = domaineDeStage;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalDate getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public boolean isPreEmbauche() {
        return preEmbauche;
    }

    public void setPreEmbauche(boolean preEmbauche) {
        this.preEmbauche = preEmbauche;
    }

    public float getRemuneration() {
        return remuneration;
    }

    public void setRemuneration(float remuneration) {
        this.remuneration = remuneration;
    }


    public String getTypeDeStage() {
        return typeDeStage;
    }

    public void setTypeDeStage(String typeDeStage) {
        this.typeDeStage = typeDeStage;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public List<RequiredSkill> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<RequiredSkill> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }
    public void addSkill(RequiredSkill skill) {
        requiredSkills.add(skill);
        skill.setOffre(this);
    }
}

