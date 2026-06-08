package com.example.PgApplication.service;

import com.example.PgApplication.model.Rooms;
import com.example.PgApplication.dto.TenantRequestDTO;
import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.repo.RoomsRepo;
import com.example.PgApplication.repo.TenantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TenantsService {

    @Autowired
    public TenantRepo tenantRepo;


    @Autowired
    public RoomsRepo roomsRepo;

    public List<Tenants> getAllTenants(){
        return tenantRepo.findAll();

    }

    public Optional<Tenants> getTenantsById(Long id){
        return tenantRepo.findById(id);
    }





    public Tenants addTenant(TenantRequestDTO request) {
        Rooms room = roomsRepo.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Count current tenants in the room
        int occupiedCount = tenantRepo.countByRoom_Id(room.getId());

        if (occupiedCount >= room.getCapacity()) {
            throw new RuntimeException("Room is already full");
        }

//        Tenants tenant = new Tenants();
//        tenant.setName(request.getName());
//        tenant.setPhone(request.getPhone());
//        tenant.setEmail(request.getEmail());
//        tenant.setCheckin_date(LocalDate.now());
//        tenant.setStatus(true);
//        tenant.setRoom(room);

        Optional<Tenants> optionalTenant = tenantRepo.findByEmail(request.getEmail());

        Tenants tenant;

        if (optionalTenant.isPresent()) {
            tenant = optionalTenant.get(); //  update
        } else {
            tenant = new Tenants(); //  create (if needed)
            tenant.setEmail(request.getEmail());
        }

        tenant.setName(request.getName());
        tenant.setPhone(request.getPhone());
        tenant.setCheckin_date(LocalDate.now());
        tenant.setStatus(true);
        tenant.setRoom(room);

        return tenantRepo.save(tenant);
    }



    public Tenants updateTenants(Long id , Tenants tenantsDetails){
        return tenantRepo.findById(id).map(t->{
            t.setName(tenantsDetails.getName());
            t.setPhone(tenantsDetails.getPhone());
            t.setEmail(tenantsDetails.getEmail());
//            t.setRoomId(tenantsDetails.getRoomId());
            if(!tenantsDetails.isStatus()){
                t.setCheckout_date(LocalDate.now());
                t.setStatus(false);
            }
            return tenantRepo.save(t);
        }).orElseThrow(() -> new RuntimeException("Tenant not found with id" + id));
    }


    public void deleteById(Long id){
         tenantRepo.deleteById(id);
    }


//    // ✅ Total tenants (all-time, regardless of status)
//    public long getTotalTenants() {
//        return tenantRepo.count();
//    }
//
//    // ✅ Total active tenants (currently staying in PG)
//    public long getActiveTenants() {
//        return tenantRepo.findAll().stream()
//                .filter(Tenants::isStatus) // status = true means active
//                .count();
//    }

    public long activeTenants(){
        return tenantRepo.findAll().stream()
                .filter(Tenants::isStatus)
                .count();
    }

    public Tenants getTenantById(Long id){
        return tenantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found: " + id));
    }

}
