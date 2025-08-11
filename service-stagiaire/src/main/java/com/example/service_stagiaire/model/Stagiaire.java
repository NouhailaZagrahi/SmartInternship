package com.example.service_stagiaire.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "stagiaires")
@AllArgsConstructor
public class Stagiaire {
    @Id
    @JsonProperty("_id")  // Permet de s'assurer que MongoDB utilise bien _id
    private String id;

    @JsonProperty("fullName")
    @Field("fullName")
    private String fullName;

    @JsonProperty("Email")
    @Field("Email")
    private String Email;

    @JsonProperty("DateNaissance")
    @Field("DateNaissance")
    private Date DateNaissance;

    @JsonProperty("phone")
    @Field("phone")
    private String phone;

    @JsonProperty("address")
    @Field("address")
    private String address;

    @JsonProperty("university")
    @Field("university")
    private String university;

    @JsonProperty("educationLevel")
    @Field("educationLevel")
    private String educationLevel;

    @JsonProperty("cv")
    @Field("cv")
    private String cv;

    @JsonProperty("description")
    @Field("description")
    private String description;

    @JsonProperty("profilePhoto")
    @Field("profilePhoto")
    private String profilePhoto;

    @JsonProperty("portfolioLink")
    @Field("portfolioLink")
    private String portfolioLink;

    @JsonProperty("domain")
    @Field("domain")
    private String domain;

    @JsonProperty("languages")
    @Field("languages")
    private List<Language> languages = new ArrayList<>(); ;

    @JsonProperty("projets")
    @Field("projets")
    private List<Projet> projets = new ArrayList<>(); ;

    @JsonProperty("competences")
    @Field("competences")
    private List<Competence> competences = new ArrayList<>(); ;

    @JsonProperty("experiences")
    @Field("experiences")
    private List<Experience> experiences = new ArrayList<>(); ;



    // 🔹 Constructeur par défaut (obligatoire pour Spring)
    public Stagiaire() {}

    // 🔹 Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    // Getter pour DateNaissance
    public Date getDateNaissance() {
        return DateNaissance;
    }

    // Setter pour DateNaissance
    public void setDateNaissance(Date DateNaissance) {
        this.DateNaissance = DateNaissance;
    }

    public String getEmail() { return Email; }
    public void setEmail(String Email) { this.Email = Email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getEducationLevel() { return educationLevel; }
    public void setEducationLevel(String educationLevel) { this.educationLevel = educationLevel; }

    public String getCv() { return cv; }
    public void setCv(String cv) { this.cv = cv; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProfilePhoto() { return profilePhoto; }
    public void setProfilePhoto(String profilePhoto) { this.profilePhoto = profilePhoto; }

    public String getPortfolioLink() { return portfolioLink; }
    public void setPortfolioLink(String portfolioLink) { this.portfolioLink = portfolioLink; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public List<Language> getLanguages() { return languages; }
    public void setLanguages(List<Language> languages) { this.languages = languages; }

    public List<Projet> getProjets() { return projets; }
    public void setProjets(List<Projet> projets) { this.projets = projets; }

    public List<Competence> getCompetences() { return competences; }
    public void setCompetences(List<Competence> competences) { this.competences = competences; }

    public List<Experience> getExperiences() { return experiences; }
    public void setExperiences(List<Experience> experiences) { this.experiences = experiences; }

}



