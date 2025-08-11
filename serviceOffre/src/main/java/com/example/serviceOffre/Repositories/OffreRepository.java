package com.example.serviceOffre.Repositories;


import com.example.serviceOffre.Model.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre, Long> {
    List<Offre> findByIdEntreprise(Long id); //  Correct
   @Query("SELECT DISTINCT o FROM Offre o LEFT JOIN FETCH o.requiredSkills WHERE o.idEntreprise = :idEntreprise")
        List<Offre> findByIdEntrepriseWithSkills(@Param("idEntreprise") Long idEntreprise);


    @Query("SELECT COUNT(o) FROM Offre o WHERE o.idEntreprise = :idEntreprise")
    Long countByEntreprise(@Param("idEntreprise") Long idEntreprise);

    @Query("SELECT o.domaineDeStage, COUNT(o) FROM Offre o WHERE o.idEntreprise = :idEntreprise GROUP BY o.domaineDeStage")
    List<Object[]> countByDomaineDeStage(@Param("idEntreprise") Long idEntreprise);

    @Query("SELECT o.typeDeStage, COUNT(o) FROM Offre o WHERE o.idEntreprise = :idEntreprise GROUP BY o.typeDeStage")
    List<Object[]> countByTypeDeStage(@Param("idEntreprise") Long idEntreprise);

    @Query("SELECT o.domaineDeStage, o.statut, COUNT(o) FROM Offre o WHERE o.idEntreprise = :idEntreprise GROUP BY o.domaineDeStage, o.statut")
    List<Object[]> countStatusByDomain(@Param("idEntreprise") Long idEntreprise);

    @Query("SELECT o.location, COUNT(o) FROM Offre o WHERE o.idEntreprise = :idEntreprise GROUP BY o.location")
    List<Object[]> countByLocation(@Param("idEntreprise") Long idEntreprise);
}


