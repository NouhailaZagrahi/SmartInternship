package com.example.Entreprisev1.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("name")
    private String name;
    private String description;
    @JsonProperty("domaine")
    private String domaine;
    private String phone;
    private String adresse;
    private String website;
    private String logo;
    private Integer nombreEmployes;
    private String taille;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Integer getNombreEmployes() {
        return nombreEmployes;
    }

    public void setNombreEmployes(Integer nombreEmployes) {
        this.nombreEmployes = nombreEmployes;
    }

    public String getTaille() {
        return taille;
    }

    public void setTaille(String taille) {
        this.taille = taille;
    }

    // Constructeur sans arguments (nécessaire pour JPA)
    public Entreprise() {
    }

    // Constructeur avec tous les arguments (facultatif)
    public Entreprise(String name, String description, String domaine, String phone, String adresse, String website, String logo, Integer nombreEmployes, String taille) {
        this.name = name;
        this.description = description;
        this.domaine = domaine;
        this.phone = phone;
        this.adresse = adresse;
        this.website = website;
        this.logo = logo;
        this.nombreEmployes = nombreEmployes;
        this.taille = taille;
    }
}

