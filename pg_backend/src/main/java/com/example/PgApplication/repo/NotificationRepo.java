package com.example.PgApplication.repo;

import com.example.PgApplication.model.Notification;
import com.example.PgApplication.model.Tenants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo  extends JpaRepository<Notification , Long> {

    List<Notification> findByTenantOrderByDateDesc(Tenants tenant);
    Long countByTenantAndReadStatusFalse(Tenants tenant);

}
