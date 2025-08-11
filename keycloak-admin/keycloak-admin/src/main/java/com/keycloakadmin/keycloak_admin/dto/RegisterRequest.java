package com.keycloakadmin.keycloak_admin.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String role; // "student" ou "company"
}

