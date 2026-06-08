package com.example.PgApplication.repo;

import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TenantRepo extends JpaRepository <Tenants, Long>{

    int countByRoom_Id(Long roomId);
    Optional <Tenants> findByUser(Users user);
    Optional<Tenants> findByEmail(String email);
}
