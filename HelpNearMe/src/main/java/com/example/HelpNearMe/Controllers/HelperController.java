package com.example.HelpNearMe.Controllers;

import com.example.HelpNearMe.Business.IHelperManager;
import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.Review;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/helpers")
public class HelperController {

    private final IHelperManager helperManager;

    @Autowired
    public HelperController(IHelperManager helperManager) {
        this.helperManager = helperManager;
    }

    @GetMapping("/pincode/{pincode}")
    public List<Helper> getHelpersByPincode(@PathVariable String pincode) {
        return helperManager.getHelpersByPincode(pincode);
    }

    @PostMapping("/addhelper")
    public Helper addHelper(@RequestBody Helper helper) {
        return helperManager.addHelper(helper);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Helper> getHelperById(@PathVariable Long id) {
        return helperManager.getHelperById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/review")
    public ResponseEntity<Review> addReview(@PathVariable Long id, @RequestBody Review review) {
        return helperManager.addReview(id, review);
    }

    @GetMapping("/city/{city}")
    public List<Helper> getHelpersByCity(@PathVariable String city) {
        return helperManager.getHelpersByCity(city);
    }

    @GetMapping("/town/{town}")
    public List<Helper> getHelpersByTown(@PathVariable String town) {
        return helperManager.getHelpersByTown(town);
    }

    @GetMapping("/getAllHelpers")
    public List<Helper> getAllHelpers() {
        return helperManager.getAllHelpers();
    }

    @GetMapping("/{helperId}/reviews")
    public List<Review> getReviewsByHelperId(@PathVariable Long helperId) {
        return helperManager.getReviewsByHelperId(helperId);
    }

    @GetMapping("/pincode/{pincode}/profession/{profession}")
    public List<Helper> getHelpersByProfession(@PathVariable String pincode, @PathVariable String profession) {
        return helperManager.getHelpersByProfession(pincode, profession);
    }

    @DeleteMapping("/delete/{helperId}")
    public void deleteHelperById(@PathVariable Long helperId) {
        helperManager.deleteHelperById(helperId);
    }

    @PostMapping("/report/{helperId}")
    public ResponseEntity<String> reportHelperById(@PathVariable Long helperId, @RequestHeader(value = "X-Forwarded-For", required = false) String xForwardedFor, HttpServletRequest request) {

        String ipAddress;
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            ipAddress = xForwardedFor.split(",")[0].trim(); // In case of multiple proxies
        }
        else {
            ipAddress = request.getRemoteAddr(); // Fallback
        }

        return helperManager.reportHelperById(helperId, ipAddress);
    }
}
