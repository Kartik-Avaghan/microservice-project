package com.example.PgApplication.controle;

import com.example.PgApplication.model.Rooms;
import com.example.PgApplication.service.RoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomsController {


    @Autowired
    public RoomsService roomsService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Rooms> getAllRoomDetails(){
        return roomsService.getAllRooms();
    }



    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Rooms getRoomDetails(@PathVariable Long id){
        return roomsService.getRoomsDetails(id);
    }

//    @PostMapping("/{id}/add")
//    @PreAuthorize("hasRole('ADMIN')")
//    public Rooms addTenants(@PathVariable Long id){
//        return roomsService.addTenants(id);
//    }

    //    to calculate tenant rent
    @GetMapping("/rent/{roomId}")
//    @PreAuthorize("hasRole('ADMIN','GUEST)")
    public ResponseEntity<BigDecimal> getTenantsRent(@PathVariable Long roomId){
        return ResponseEntity.ok(roomsService.calculateTenantRent(roomId));
    }

    @PostMapping("/{id}/removeTenants")
    @PreAuthorize("hasRole('ADMIN')")
    public Rooms removeTenants(@PathVariable Long id){
        return roomsService.removeTenants(id);
    }


    @GetMapping("/totalRooms/count")
    @PreAuthorize("hasRole('ADMIN')")
    public long getTotalAvailabelRooms(){
        return roomsService.getTotalAvailabelRooms();
    }


    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public Rooms addRoom(@RequestBody Rooms room) {
        return roomsService.addRoom(room);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        roomsService.deleteRoom(id);
        return ResponseEntity.ok("Room deleted successfully");
    }


    @GetMapping("/summary")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Map<String, Object>> getRoomSummaryByCapacity() {
        return roomsService.getRoomSummaryByCapacity();
    }
}
