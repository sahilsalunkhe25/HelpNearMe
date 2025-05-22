package com.example.HelpNearMe.Controllers;

import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.Review;
import com.example.HelpNearMe.Repositories.HelperRepository;
import com.example.HelpNearMe.Repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/helpers")
public class HelperController
{
    @Autowired
    private HelperRepository _helperRepository;
    @Autowired
    private ReviewRepository _reviewRepository;

    // Get helpers by pincode
    @GetMapping("/pincode/{pincode}")
    public List<Helper> getHelpersByPincode(@PathVariable String pincode) {
        List<Helper> helpers = _helperRepository.findByPincode(pincode);

        // Sort helpers by average rating in descending order
        helpers.sort((h1, h2) -> {
            double avg1 = (h1.getRatingCount() == 0) ? 0 : (double) h1.getRatingTotal() / h1.getRatingCount();
            double avg2 = (h2.getRatingCount() == 0) ? 0 : (double) h2.getRatingTotal() / h2.getRatingCount();
            return Double.compare(avg2, avg1); // Descending order
        });

        return helpers;

    }

    //  Add new helper
    @PostMapping("/addhelper")
    public Helper addHelper(@RequestBody Helper helper) {
        return _helperRepository.save(helper);
    }

    //  Get helper details with reviews
    @GetMapping("/{id}")
    public ResponseEntity<Helper> getHelperById(@PathVariable Long id) {
        return _helperRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Add review to helper
    @PostMapping("/{id}/review")
    public ResponseEntity<Review> addReview(@PathVariable Long id, @RequestBody Review review) {
        Optional<Helper> helperOpt = _helperRepository.findById(id);
        if (helperOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Helper helper = helperOpt.get();
        review.setHelper(helper);
        _reviewRepository.save(review);

        // Update rating
        helper.setRatingTotal(helper.getRatingTotal() + review.getRating());
        helper.setRatingCount(helper.getRatingCount() + 1);
        _helperRepository.save(helper);

        return ResponseEntity.ok(review);
    }

    // Get helpers by city
    @GetMapping("/city/{city}")
    public List<Helper> getHelpersByCity(@PathVariable String city) {
        return _helperRepository.findByCityIgnoreCase(city);
    }

    // Get helpers by town
    @GetMapping("/town/{town}")
    public List<Helper> getHelpersByTown(@PathVariable String town) {
        return _helperRepository.findByTownIgnoreCase(town);
    }

    @GetMapping("/getAllHelpers")
    public List<Helper> getAllHelpers() {
        return _helperRepository.findAll();
    }

    // Get all reviews by helper id
    @GetMapping("/{helperId}/reviews")
    public List<Review> getReviewsByHelperId(@PathVariable Long helperId) {
        return _reviewRepository.findByHelperId(helperId);
    }

    // Get helpers by profession
    @GetMapping("/pincode/{pincode}/profession/{profession}")
    public List<Helper> getHelpersByProfession(@PathVariable String pincode, @PathVariable String profession) {
        return _helperRepository.findByPincode(pincode).stream()
                .filter(helper -> Arrays.asList(helper.getProfession().split(","))
                        .stream().map(String::trim)
                        .anyMatch(p -> p.equalsIgnoreCase(profession)))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/delete/{helperId}")
    public void deleteHelperById(@PathVariable Long helperId) {
         _helperRepository.deleteById(helperId);
    }

    @PostMapping("/report/{helperId}")
    public ResponseEntity<String> reportHelperById(@PathVariable Long helperId) {
        Optional<Helper> optionalHelper = _helperRepository.findById(helperId);

        if (optionalHelper.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Helper with ID " + helperId + " not found.");
        }

        Helper helper = optionalHelper.get();
        int currentReports = helper.getNumberOfReports();

        if (currentReports + 1 > 5) {
            _helperRepository.deleteById(helperId);
            return ResponseEntity.ok("Helper deleted due to excessive reports.");
        }

        helper.setNumberOfReports(currentReports + 1);
        _helperRepository.save(helper);

        return ResponseEntity.ok("Report recorded. Current report count: " + helper.getNumberOfReports());
    }
}
