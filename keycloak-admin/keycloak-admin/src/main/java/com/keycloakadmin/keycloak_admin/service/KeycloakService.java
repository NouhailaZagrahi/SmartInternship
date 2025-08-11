package com.keycloakadmin.keycloak_admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.keycloakadmin.keycloak_admin.dto.RegisterRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class KeycloakService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String keycloakBaseUrl = "http://localhost:8080";
    private final String realm = "realm1";
    private final String clientId = "admin-cli";
    private final String adminUsername = "admin";
    private final String adminPassword = "admin";
    private final String clientAppId = "client1"; // le nom de ton client dans Keycloak

    public void registerUser(RegisterRequest request) throws Exception {
        String token = getAdminToken();

        // 1. Create user
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> userPayload = new HashMap<>();
        userPayload.put("username", request.getUsername());
        userPayload.put("email", request.getEmail());
        userPayload.put("enabled", true);
        userPayload.put("credentials", List.of(Map.of(
                "type", "password",
                "value", request.getPassword(),
                "temporary", false
        )));

        HttpEntity<String> userRequest = new HttpEntity<>(objectMapper.writeValueAsString(userPayload), headers);
        restTemplate.postForEntity(keycloakBaseUrl + "/admin/realms/" + realm + "/users", userRequest, String.class);

        // 2. Get User ID
        String searchUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/users?username=" + request.getUsername();
        ResponseEntity<UserRepresentation[]> usersResponse = restTemplate.exchange(
                searchUrl, HttpMethod.GET, new HttpEntity<>(headers), UserRepresentation[].class);
        String userId = usersResponse.getBody()[0].getId();

        // 3. Get client UUID
        String clientUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/clients?clientId=" + clientAppId;
        ResponseEntity<ClientRepresentation[]> clientResponse = restTemplate.exchange(
                clientUrl, HttpMethod.GET, new HttpEntity<>(headers), ClientRepresentation[].class);
        String clientUuid = clientResponse.getBody()[0].getId();

        // 4. Get role from client
        String roleUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/clients/" + clientUuid + "/roles";
        ResponseEntity<RoleRepresentation[]> rolesResponse = restTemplate.exchange(
                roleUrl, HttpMethod.GET, new HttpEntity<>(headers), RoleRepresentation[].class);
        RoleRepresentation selectedRole = Arrays.stream(rolesResponse.getBody())
                .filter(r -> r.getName().equals(request.getRole()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Rôle non trouvé"));

        // 5. Assign role to user
        String assignUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/clients/" + clientUuid;
        HttpEntity<String> assignRequest = new HttpEntity<>(objectMapper.writeValueAsString(List.of(selectedRole)), headers);
        restTemplate.postForEntity(assignUrl, assignRequest, String.class);
    }

    private String getAdminToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "username=" + adminUsername +
                "&password=" + adminPassword +
                "&grant_type=password" +
                "&client_id=" + clientId;

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                keycloakBaseUrl + "/realms/master/protocol/openid-connect/token", request, Map.class);

        return response.getBody().get("access_token").toString();
    }

    @Data
    static class UserRepresentation {
        private String id;
    }

    @Data
    static class ClientRepresentation {
        private String id;
    }

    @Data
    static class RoleRepresentation {
        private String id;
        private String name;
    }

    //google
    public void assignRoleToExistingUser(String username, String roleName) throws Exception {
        String token = getAdminToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        // Get user ID
        String searchUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/users?username=" + username;
        //String searchUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/users?email=" + username; // <-- par email si besoin
        ResponseEntity<UserRepresentation[]> usersResponse = restTemplate.exchange(
                searchUrl, HttpMethod.GET, new HttpEntity<>(headers), UserRepresentation[].class);

        String userId = usersResponse.getBody()[0].getId();

        // Get client UUID
        String clientUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/clients?clientId=" + clientAppId;
        ResponseEntity<ClientRepresentation[]> clientResponse = restTemplate.exchange(
                clientUrl, HttpMethod.GET, new HttpEntity<>(headers), ClientRepresentation[].class);
        String clientUuid = clientResponse.getBody()[0].getId();

        // Get role
        String roleUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/clients/" + clientUuid + "/roles";
        ResponseEntity<RoleRepresentation[]> rolesResponse = restTemplate.exchange(
                roleUrl, HttpMethod.GET, new HttpEntity<>(headers), RoleRepresentation[].class);
        RoleRepresentation selectedRole = Arrays.stream(rolesResponse.getBody())
                .filter(r -> r.getName().equals(roleName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Rôle non trouvé"));

        // Assign role
        String assignUrl = keycloakBaseUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/clients/" + clientUuid;
        HttpHeaders assignHeaders = new HttpHeaders();
        assignHeaders.setBearerAuth(token);
        assignHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> assignRequest = new HttpEntity<>(objectMapper.writeValueAsString(List.of(selectedRole)), assignHeaders);
        restTemplate.postForEntity(assignUrl, assignRequest, String.class);
    }

}
