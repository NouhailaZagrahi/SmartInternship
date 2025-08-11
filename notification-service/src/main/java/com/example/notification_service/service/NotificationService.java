package com.example.notification_service.service;

import com.example.notification_service.model.Notification;
import com.example.notification_service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public Notification notifyCandidature(String idScandidature) {
        // Appel au service candidature pour récupérer la candidature
        String candidatureUrl = "http://localhost:8087/api/candidatures/" + idScandidature;
        Map candidature = restTemplate.getForObject(candidatureUrl, Map.class);

        Notification notif = new Notification();
        notif.setIdScandidature(idScandidature);
        notif.setHeure(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        notif.setLu(false);

        // Récupère l'id du stagiaire depuis la candidature
        if (candidature != null && candidature.get("idStagiaire") != null) {
            notif.setIdStagiaire(candidature.get("idStagiaire").toString());
        }

        return notificationRepository.save(notif);
    }

    public List<Notification> getNotificationsByCandidature(String idScandidature) {
        return notificationRepository.findByIdScandidatureOrderByHeureDesc(idScandidature);
    }

    public List<Notification> getNotificationsByStagiaire(String idStagiaire) {
        return notificationRepository.findByIdStagiaireOrderByHeureDesc(idStagiaire);
    }
    public void markAllAsReadByStagiaire(String idStagiaire) {
        notificationRepository.markAllAsReadByStagiaire(idStagiaire);
    }
}