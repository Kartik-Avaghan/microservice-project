package com.example.PgApplication.controle;

import com.example.PgApplication.dto.TenantRequestDTO;
import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.model.Users;
import com.example.PgApplication.repo.RoomsRepo;
import com.example.PgApplication.repo.TenantRepo;
import com.example.PgApplication.repo.UserRepo;
import com.example.PgApplication.service.TenantsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.security.Principal; // for getting username of logged-in user
// or


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tenants")
@CrossOrigin(origins="http://localhost:5173")
public class TenantsController {


    @Autowired
    public TenantsService tenantsService;

    @Autowired
    public TenantRepo tenantRepo;

    @Autowired
    public UserRepo userRepo;

    @Autowired
    public RoomsRepo roomsRepo;

    @Autowired
    public PasswordEncoder passwordEncoder;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Tenants>getAllTenants(){
        return tenantsService.getAllTenants();
    }


//    @GetMapping("/tenantProfile")
//    @PreAuthorize("hasAuthority('ROLE_GUEST')")  // matches JWT authority
//
//    public ResponseEntity<?> getTenantProfile(Principal principal){
//        String username=principal.getName();
//        Users user =userRepo.findByUsername(username)
//                .orElseThrow(()-> new RuntimeException("User not found"));
//
//
//        Tenants tenants =tenantRepo.findByUser(user)
//                .orElseThrow(()-> new RuntimeException("Tenant not found"));
//        return ResponseEntity.ok(tenants);
//
//    }


    @GetMapping("/tenantProfile")
    @PreAuthorize("hasAuthority('ROLE_GUEST')")
    public ResponseEntity<?> getTenantProfile(Principal principal){

        String username = principal.getName();
        System.out.println("Logged in user: " + username);

        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Tenants> tenantOpt = tenantRepo.findByUser(user);

        if (tenantOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Tenant not found for user: " + username);
        }

        return ResponseEntity.ok(tenantOpt.get());
    }

    @PostMapping("/addTenant")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addTenant(@RequestBody TenantRequestDTO request) {
        try {
            Tenants tenant = tenantsService.addTenant(request);
            return ResponseEntity.ok("Tenant created and assigned to room successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Tenants>updateTenants(@PathVariable Long id ,@RequestBody Tenants tenantsDetails){
        try{
            return ResponseEntity.ok(tenantsService.updateTenants(id,tenantsDetails));
        }
        catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        tenantsService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active/tenants")
    @PreAuthorize("hasRole('ADMIN')")
    public long activeTotalTenants(){
        return tenantsService.activeTenants();
    }



    @PostMapping("/upload-profile")
    @PreAuthorize("hasAuthority('ROLE_GUEST')")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            Principal principal) {

        String username = principal.getName();
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tenants tenant = tenantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        try {
            String uploadDir = "uploads/";
            String fileName = tenant.getId() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            tenant.setProfileImage("/uploads/" + fileName);
            tenantRepo.save(tenant);

            return ResponseEntity.ok("Profile uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }


//    Get tenants details for payment
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN','GUEST')")
    public ResponseEntity<Tenants> getTenantsDetails(@PathVariable Long id){
        return ResponseEntity.ok(tenantsService.getTenantById(id));
    }
}
