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
    List<Helper> findByCityIgnoreCase(String city);
    List<Helper> findByPincodeAndProfession(String pincode, String profession);
    List<Helper> findByTownIgnoreCase(String town);

}
