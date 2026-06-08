package com.example.PgApplication.controle;


import com.example.PgApplication.model.Owner;
import com.example.PgApplication.model.Tenants;
import com.example.PgApplication.model.Users;
import com.example.PgApplication.repo.OwnerRepo;
import com.example.PgApplication.repo.TenantRepo;
import com.example.PgApplication.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class RegistrationController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TenantRepo tenantRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OwnerRepo ownerRepo;


    @Transactional
    @PostMapping("/userRegister")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {

        if (user.getUsername() == null || user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");
        }

        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Allow only ADMIN manually (via Postman), else default to GUEST
//        if (user.getRole() != null && user.getRole().equalsIgnoreCase("ADMIN")) {
//            user.setRole("ADMIN");
//        } else {
//            user.setRole("GUEST");
//        }

        String role = (user.getRole() != null && user.getRole().equalsIgnoreCase("ADMIN")) ? "ADMIN" : "GUEST";
        user.setRole(role);

        Users savedUser = userRepo.save(user);

        // Link tenant if it's a guest
//        if ("GUEST".equalsIgnoreCase(savedUser.getRole())) {
//            Tenants tenant = tenantRepo.findByEmail(savedUser.getEmail())
//                    .orElseThrow(() -> new RuntimeException("No tenant record found for this email. Please contact admin."));
//            tenant.setUser(savedUser);
//            tenantRepo.save(tenant);
//        }

        if ("GUEST".equalsIgnoreCase(savedUser.getRole())) {
            Tenants tenant = new Tenants();
            tenant.setUser(savedUser);
            tenant.setName(savedUser.getUsername());
            tenant.setEmail(savedUser.getEmail());
            tenant.setPhone(null); // or set from request
            tenant.setStatus(true);

            tenantRepo.save(tenant);
        }

        if ("ADMIN".equalsIgnoreCase(savedUser.getRole())){
            Owner owner = new Owner();
            owner.setUsername(savedUser.getUsername());
            owner.setEmail(savedUser.getEmail());
            owner.setMobile(null);
            owner.setProfileImage(null);
            owner.setRole("ADMIN");
            owner.setUser(savedUser);

            ownerRepo.save(owner);
        }

        return ResponseEntity.ok("User registered successfully with role: " + savedUser.getRole());
    }

}



