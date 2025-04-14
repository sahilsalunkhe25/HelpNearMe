package com.example.HelpNearMe.Repositories;

import com.example.HelpNearMe.Models.Helper;
import com.example.HelpNearMe.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>
{
    List<Review> findByHelper(Helper helper);

}

