package com.example.PgApplication.service;

import com.example.PgApplication.model.Rooms;
import com.example.PgApplication.repo.RoomsRepo;
import com.example.PgApplication.repo.TenantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomsService {

    @Autowired
    public RoomsRepo roomsRepo;



    @Autowired
    private TenantRepo tenantRepo;

    public List<Rooms> getAllRooms() {
        List<Rooms> rooms = roomsRepo.findAll();

        for (Rooms room : rooms) {
            int occupiedCount = tenantRepo.countByRoom_Id(room.getId());
            room.setOccupied(occupiedCount);

            if (occupiedCount < room.getCapacity()) {
                room.setStatus("Available");
            } else {
                room.setStatus("Full");
            }
        }
        return rooms;
    }

    public Rooms getRoomsDetails(Long roomid){
        Optional<Rooms> roomOpt = roomsRepo.findById(roomid);

        if (roomOpt.isEmpty()){
            throw new RuntimeException("Room is not found with RoomId" + roomid);
        }

        Rooms room = roomOpt.get();

        if (room.getOccupied() < room.getCapacity()){
            room.setStatus("Availabel");
        }else {
            room.setStatus("Full");
        }
        return room;
    }

// get rent for tenants to pay
    public BigDecimal calculateTenantRent(Long roomId){
        Rooms rooms = roomsRepo.findById(roomId)
                .orElseThrow(()-> new RuntimeException("Room not found by:" + roomId));
        return rooms.getRentPerTenants();
    }




    public Rooms removeTenants(Long roomId) {
        Rooms room = getRoomsDetails(roomId);

        if (room.getOccupied() > 0) {
            room.setOccupied(room.getOccupied() - 1);  // 🔑 Decrease occupied
        } else {
            throw new RuntimeException("No tenants to remove from this room");
        }

        // Update status
        if (room.getOccupied() < room.getCapacity()) {
            room.setStatus("Available");
        } else {
            room.setStatus("Full");
        }

        return roomsRepo.save(room); // 🔑 Save changes to DB
    }


    public long getTotalAvailabelRooms(){
        List<Rooms> room =roomsRepo.findAll();
        return room.stream()
                .filter(r->r.getOccupied()<r.getCapacity())
                .count();
    }








    public List<Map<String, Object>> getRoomSummaryByCapacity() {
        List<Rooms> allRooms = roomsRepo.findAll();

        // Fetch occupancy for each room
        allRooms.forEach(room -> {
            int occupiedCount = tenantRepo.countByRoom_Id(room.getId());
            room.setOccupied(occupiedCount);
        });

        // Group rooms by capacity
        Map<Integer, List<Rooms>> roomsByCapacity = allRooms.stream()
                .collect(Collectors.groupingBy(Rooms::getCapacity));

        // Prepare summary as List of Map
        List<Map<String, Object>> summaryList = new ArrayList<>();
        for (Map.Entry<Integer, List<Rooms>> entry : roomsByCapacity.entrySet()) {
            int capacity = entry.getKey();
            List<Rooms> rooms = entry.getValue();

            int totalRooms = rooms.size();
            int availableRooms = (int) rooms.stream().filter(r -> r.getOccupied() < r.getCapacity()).count();
            int occupiedTenants = rooms.stream().mapToInt(Rooms::getOccupied).sum();


            // Get list of available room IDs
            List<Long> availableRoomIds = rooms.stream()
                    .filter(r -> r.getOccupied() < r.getCapacity())
                    .map(Rooms::getId)
                    .collect(Collectors.toList());

            Map<String, Object> summaryMap = new HashMap<>();
            summaryMap.put("capacity", capacity);
            summaryMap.put("totalRooms", totalRooms);
            summaryMap.put("availableRooms", availableRooms);
            summaryMap.put("occupiedTenants", occupiedTenants);
            summaryMap.put("RoomId", availableRoomIds);

            summaryList.add(summaryMap);
        }

        // Sort by capacity (optional)
        summaryList.sort(Comparator.comparingInt(m -> (Integer) m.get("capacity")));

        return summaryList;
    }





    public Rooms addRoom(Rooms room) {
        // Ensure occupied starts at 0
        room.setOccupied(0);


        // Default status to Available if not set
        if (room.getStatus() == null || room.getStatus().isEmpty()) {
            room.setStatus("Available");
        }

        return roomsRepo.save(room);
    }

    public Rooms deleteRoom(Long id) {
        Rooms room = roomsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        roomsRepo.delete(room);
        return room;
    }




}
