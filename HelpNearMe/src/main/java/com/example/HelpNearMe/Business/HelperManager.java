package com.example.HelpNearMe.Business;

import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.HelperReport;
import com.example.HelpNearMe.Models.Review;
import com.example.HelpNearMe.Repositories.HelperReportRepository;
import com.example.HelpNearMe.Repositories.HelperRepository;
import com.example.HelpNearMe.Repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.Arrays;

@Service
public class HelperManager implements IHelperManager {

    private final HelperRepository _helperRepository;
    private final ReviewRepository _reviewRepository;
    private HelperReportRepository _helperReportRepository;


    @Autowired
    public HelperManager(HelperRepository helperRepository, ReviewRepository reviewRepository, HelperReportRepository helperReportRepository) {
        _helperRepository = helperRepository;
        _reviewRepository = reviewRepository;
        _helperReportRepository = helperReportRepository;
    }

    public List<Helper> getHelpersByPincode(String pincode) {
        List<Helper> helpers = _helperRepository.findByPincode(pincode);
        helpers.sort((h1, h2) -> {
            double avg1 = (h1.getRatingCount() == 0) ? 0 : (double) h1.getRatingTotal() / h1.getRatingCount();
            double avg2 = (h2.getRatingCount() == 0) ? 0 : (double) h2.getRatingTotal() / h2.getRatingCount();
            return Double.compare(avg2, avg1);
        });
        return helpers;
    }

    public Helper addHelper(Helper helper) {
        return _helperRepository.save(helper);
    }

    public Optional<Helper> getHelperById(Long id) {
        return _helperRepository.findById(id);
    }

    public ResponseEntity<Review> addReview(Long id, Review review) {
        Optional<Helper> helperOpt = _helperRepository.findById(id);
        if (helperOpt.isEmpty()) return ResponseEntity.notFound().build();

        Helper helper = helperOpt.get();
        review.setHelper(helper);
        _reviewRepository.save(review);

        helper.setRatingTotal(helper.getRatingTotal() + review.getRating());
        helper.setRatingCount(helper.getRatingCount() + 1);
        _helperRepository.save(helper);

        return ResponseEntity.ok(review);
    }

    public List<Helper> getHelpersByCity(String city) {
        return _helperRepository.findByCityIgnoreCase(city);
    }

    public List<Helper> getHelpersByTown(String town) {
        return _helperRepository.findByTownIgnoreCase(town);
    }

    public List<Helper> getAllHelpers() {
        return _helperRepository.findAll();
    }

    public List<Review> getReviewsByHelperId(Long helperId) {
        return _reviewRepository.findByHelperId(helperId);
    }

    public List<Helper> getHelpersByProfession(String pincode, String profession) {
        return _helperRepository.findByPincode(pincode).stream()
                .filter(helper -> Arrays.asList(helper.getProfession().split(","))
                        .stream().map(String::trim)
                        .anyMatch(p -> p.equalsIgnoreCase(profession)))
                .collect(Collectors.toList());
    }

    public void deleteHelperById(Long helperId) {
        _helperRepository.deleteById(helperId);
    }

    @Override
    public ResponseEntity<String> reportHelperById(Long helperId, String ipAddress) {
        Optional<Helper> optionalHelper = _helperRepository.findById(helperId);
        if (optionalHelper.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("Helper with ID " + helperId + " not found.");
        }

        // Check if this IP already reported this helper
        Optional<HelperReport> existingReport =
                _helperReportRepository.findByHelperIdAndIpAddress(helperId, ipAddress);

        if (existingReport.isPresent()) {
            return ResponseEntity.status(403)
                    .body("You have already reported this helper.");
        }

        Helper helper = optionalHelper.get();
        int currentReports = helper.getNumberOfReports();

        if (currentReports + 1 > 5) {
            _helperRepository.deleteById(helperId);
            return ResponseEntity.ok("Helper deleted due to excessive reports.");
        }

        // Save report
        helper.setNumberOfReports(currentReports + 1);
        _helperRepository.save(helper);

        _helperReportRepository.save(new HelperReport(helperId, ipAddress));

        return ResponseEntity.ok("Report recorded. Current report count: " + helper.getNumberOfReports());
    }
}
