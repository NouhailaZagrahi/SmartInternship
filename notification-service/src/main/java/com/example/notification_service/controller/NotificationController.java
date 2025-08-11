package com.example.notification_service.controller;

import com.example.notification_service.model.Notification;
import com.example.notification_service.repository.NotificationRepository;
import com.example.notification_service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    private NotificationRepository notificationRepository;


    @PostMapping("/{idScandidature}")
    public Notification notifyCandidature(@PathVariable String idScandidature) {
        System.out.println("Notification reçue pour candidature " + idScandidature);
        return notificationService.notifyCandidature(idScandidature);
    }

    @GetMapping("/stagiaire/{idStagiaire}")
    public List<Notification> getNotificationsByStagiaire(@PathVariable String idStagiaire) {
        return notificationService.getNotificationsByStagiaire(idStagiaire);
    }

    @GetMapping("/{idScandidature}")
    public List<Notification> getNotifications(@PathVariable String idScandidature) {
        return notificationService.getNotificationsByCandidature(idScandidature);
    }
    @PutMapping("/stagiaire/{idStagiaire}/read")
    public ResponseEntity<?> markAllAsRead(@PathVariable String idStagiaire) {
        notificationService.markAllAsReadByStagiaire(idStagiaire);
        return ResponseEntity.ok().build();
    }


}