package com.example.PgApplication.controle;


import com.example.PgApplication.model.Owner;
import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.model.Users;
import com.example.PgApplication.repo.OwnerRepo;
import com.example.PgApplication.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.PgApplication.service.OwnerService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "http://localhost:5173")
public class OwnerController {

    @Autowired
    public OwnerService ownerService;

    @Autowired
    public OwnerRepo ownerRepo;

    @Autowired
    public UserRepo userRepo;


@PostMapping("/addOwner")
 public Owner addOwner(@RequestBody Owner owner){
     return ownerService.saveOwner(owner);
 }



 @GetMapping("/getOwner")
 @PreAuthorize("hasRole('ADMIN')")
 public List<Owner> getOwner(){
    return ownerService.getOwners();
 }


    @PostMapping("/admin/upload-profile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            Principal principal) {

        String username = principal.getName();
        Users user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Owner owner = ownerRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        try {


            //  Create upload directory dynamically
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Upload directory created: " + uploadDir);
            }

            String fileName = owner.getId() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            owner.setProfileImage("/uploads/" + fileName);
            ownerRepo.save(owner);

            return ResponseEntity.ok("Profile uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }


}
