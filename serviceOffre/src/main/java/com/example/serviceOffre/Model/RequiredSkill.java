package com.example.serviceOffre.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "required_skills") // ou simplement pas de nom : JPA utilisera `requiredskill`
public class RequiredSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSkill;

    private String nomSkill;

    @ManyToOne
    @JoinColumn(name = "idoffre")
    @JsonBackReference
    private Offre offre;

    public Long getIdSkill() {
        return idSkill;
    }

    public void setIdSkill(Long idSkill) {
        this.idSkill = idSkill;
    }

    public String getNomSkill() {
        return nomSkill;
    }

    public void setNomSkill(String nomSkill) {
        this.nomSkill = nomSkill;
    }

    public Offre getOffre() {
        return offre;
    }

    public void setOffre(Offre offre) {
        this.offre = offre;
    }
}
