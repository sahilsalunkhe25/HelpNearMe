package com.example.HelpNearMe.Controllers;

import com.example.HelpNearMe.Dtos.AdminLoginRequestDto;
import com.example.HelpNearMe.Models.AdminUser;
import com.example.HelpNearMe.Repositories.AdminUserRepository;
import com.example.HelpNearMe.Repositories.HelperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminUserRepository _adminUserRepository;

    @Autowired
    private HelperRepository _helperRepository;

    @Autowired
    private PasswordEncoder _passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequestDto request) {
        Optional<AdminUser> admin = _adminUserRepository.findByUsername(request.getUsername());

        if (admin.isPresent()) {
            if (_passwordEncoder.matches(request.getPassword(), admin.get().getPasswordHash())) {
                return ResponseEntity.ok("Login successful");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @DeleteMapping("/helper/{id}")
    public ResponseEntity<String> deleteHelperById(@PathVariable Long id) {
        if (!_helperRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Helper not found");
        }
        _helperRepository.deleteById(id);
        return ResponseEntity.ok("Helper deleted");
    }
}

