package com.example.HelpNearMe.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/getmessage")
    public String home() {
        return "Hello there from HelpNearMe!";
    }
}
