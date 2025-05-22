package com.example.HelpNearMe.Business;

import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.Review;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IHelperManager {

    List<Helper> getHelpersByPincode(String pincode);
    Helper addHelper(Helper helper);
    Optional<Helper> getHelperById(Long id);
    ResponseEntity<Review> addReview(Long id, Review review);
    List<Helper> getHelpersByCity(String city);
    List<Helper> getHelpersByTown(String town);
    List<Helper> getAllHelpers();
    List<Review> getReviewsByHelperId(Long helperId);
    List<Helper> getHelpersByProfession(String pincode, String profession);
    void deleteHelperById(Long helperId);
    ResponseEntity<String> reportHelperById(Long helperId, String ipAddress);
}
