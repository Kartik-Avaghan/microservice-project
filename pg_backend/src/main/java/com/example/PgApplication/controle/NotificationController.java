package com.example.PgApplication.controle;

import com.example.PgApplication.model.Notification;
import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.model.Users;
import com.example.PgApplication.repo.NotificationRepo;
import com.example.PgApplication.repo.TenantRepo;
import com.example.PgApplication.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private TenantRepo tenantRepo;

    @Autowired
    private UserRepo userRepo;

    // ✅ Get all notifications (newest first)
    @GetMapping("/tenantNotification")
    @PreAuthorize("hasAuthority('ROLE_GUEST')")
    public ResponseEntity<?> getTenantNotifications(Principal principal) {
        String username = principal.getName();
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tenants tenant = tenantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        List<Notification> notifications = notificationRepo.findByTenantOrderByDateDesc(tenant);
        return ResponseEntity.ok(notifications);
    }

    // ✅ Get unread notification count (for badge)
    @GetMapping("/unreadCount")
    @PreAuthorize("hasAuthority('ROLE_GUEST')")
    public ResponseEntity<?> getUnreadCount(Principal principal) {
        String username = principal.getName();
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tenants tenant = tenantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Long count = notificationRepo.countByTenantAndReadStatusFalse(tenant);
        return ResponseEntity.ok(count);
    }

    // ✅ Mark all notifications as read when tenant opens the notification page
    @PostMapping("/markAsRead")
    @PreAuthorize("hasAuthority('ROLE_GUEST')")
    @Transactional
    public ResponseEntity<?> markNotificationsAsRead(Principal principal) {
        String username = principal.getName();
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Tenants tenant = tenantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        List<Notification> unreadNotifications = notificationRepo.findByTenantOrderByDateDesc(tenant);
        unreadNotifications.forEach(n -> n.setReadStatus(true));
        notificationRepo.saveAll(unreadNotifications);

        return ResponseEntity.ok("All notifications marked as read");
    }
}
