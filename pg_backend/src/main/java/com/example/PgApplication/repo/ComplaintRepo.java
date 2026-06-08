package com.example.PgApplication.repo;

import com.example.PgApplication.model.Complaints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepo extends JpaRepository<Complaints,Long> {

    List<Complaints> findByTenantId(Long tenantId);
    List<Complaints> findByStatus(boolean status);
}
