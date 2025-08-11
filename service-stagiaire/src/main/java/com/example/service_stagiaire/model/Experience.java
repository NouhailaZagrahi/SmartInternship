package com.example.service_stagiaire.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.UUID;

@AllArgsConstructor
public class Experience {
    @Id
    @JsonProperty("idExperience")
    private String idExperience;

    @JsonProperty("title")
    @Field("title")
    private String title;

    @JsonProperty("company")
    @Field("company")
    private String company;

    @JsonProperty("startDate")
    @Field("startDate")
    private String startDate;

    @JsonProperty("endDate")
    @Field("endDate")
    private String endDate;

    @JsonProperty("description")
    @Field("description")
    private String description;



    // Constructeur
    public Experience() {
        this.idExperience = UUID.randomUUID().toString(); // Génère un ID unique pour chaque projet
    }

    public String getIdExperience() { return idExperience; }
    public void setIdExperience(String idExperience) { this.idExperience = idExperience; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String year) { this.startDate = year; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String year) { this.endDate = year; }
}
