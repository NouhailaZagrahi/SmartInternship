package com.keycloakadmin.keycloak_admin.controller;

import com.keycloakadmin.keycloak_admin.dto.RegisterRequest;
import com.keycloakadmin.keycloak_admin.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final KeycloakService keycloakService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            keycloakService.registerUser(request);
            return ResponseEntity.ok("Utilisateur inscrit avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur: " + e.getMessage());
        }
    }

    //google
    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRole(@RequestBody RegisterRequest request) {
        try {
            keycloakService.assignRoleToExistingUser(request.getUsername(), request.getRole());
            return ResponseEntity.ok("Rôle attribué avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur: " + e.getMessage());
        }
    }

}
