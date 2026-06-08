package com.example.PgApplication.repo;

import com.example.PgApplication.model.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepo extends JpaRepository<Rooms, Long>{


}
