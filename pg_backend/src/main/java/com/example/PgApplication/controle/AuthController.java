package com.example.PgApplication.controle;

import com.example.PgApplication.Jwt.JwtUtil;
import com.example.PgApplication.model.Users;
import com.example.PgApplication.repo.UserRepo;
import com.example.PgApplication.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class AuthController {


    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CustomUserDetailService userDetailService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody Users user)throws Exception{
        if(user.getUsername() == null || user.getPassword()==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user name and password required");
        }

        try{
            authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

        }
        catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username and password");
        }

        final UserDetails userDetails=userDetailService.loadUserByUsername(user.getUsername());
        final String token=jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(Map.of(
                "username",userDetails.getUsername(),
                "role",userDetails.getAuthorities().iterator().next().getAuthority(),
                "token", token

        ));

    }




    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not authenticated"));
        }

        // Get username
        String username = principal.getName();

        // Optional: load roles manually if needed
        UserDetails userDetails = userDetailService.loadUserByUsername(username);
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_UNKNOWN");

        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", role
        ));
    }





}
