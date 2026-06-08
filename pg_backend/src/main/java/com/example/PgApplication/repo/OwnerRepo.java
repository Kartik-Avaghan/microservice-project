package com.example.PgApplication.repo;

import com.example.PgApplication.model.Owner;
import com.example.PgApplication.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepo extends JpaRepository<Owner, Long> {

    Optional<Owner>findByEmail(String email);
    Optional<Owner> findByUser(Users user);
}
