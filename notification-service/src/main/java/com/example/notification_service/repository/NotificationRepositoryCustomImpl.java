package com.example.notification_service.repository;

import com.example.notification_service.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class NotificationRepositoryCustomImpl implements NotificationRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void markAllAsReadByStagiaire(String idStagiaire) {
        Query query = new Query(Criteria.where("idStagiaire").is(idStagiaire).and("lu").is(false));
        Update update = new Update().set("lu", true);
        mongoTemplate.updateMulti(query, update, Notification.class);
    }
}