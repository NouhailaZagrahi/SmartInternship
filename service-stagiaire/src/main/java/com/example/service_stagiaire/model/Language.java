package com.example.service_stagiaire.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;

public class Language {

    @JsonProperty("language")
    @Field("language")
    @Indexed(unique = true)
    private String language;

    @JsonProperty("level")
    @Field("level")
    private String level;

    // Constructeur, getters et setters
    public Language() {}

    public Language(String idLanguage, String language, String level) {

        this.language = language;
        this.level = level;
    }


    public String getLanguage() { return language; }
    public void setLanguage(String langage) { this.language = langage; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
}
