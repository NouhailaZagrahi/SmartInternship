package com.example.notification_service.repository;

import com.example.notification_service.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String>, NotificationRepositoryCustom  {
    List<Notification> findByIdScandidatureOrderByHeureDesc(String idScandidature);
    List<Notification> findByIdStagiaireOrderByHeureDesc(String idStagiaire);
}