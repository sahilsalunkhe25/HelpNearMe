package com.example.HelpNearMe.Models;

import jakarta.persistence.*;

// This is used to track if any IP address has already reported a helper.
@Entity
public class HelperReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long helperId;

    private String ipAddress;

    // Constructors, Getters, Setters
    public HelperReport() {}

    public HelperReport(Long helperId, String ipAddress) {
        this.helperId = helperId;
        this.ipAddress = ipAddress;
    }
}