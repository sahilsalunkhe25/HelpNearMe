package com.example.HelpNearMe.Repositories;

import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;

import java.util.List;

@Repository
public interface HelperRepository extends JpaRepository<Helper, Long>
{
    List<Helper> findByPincode(String pincode);
    List<Helper> findByCity(String city);
    List<Helper> findByProfession(String profession);
}
