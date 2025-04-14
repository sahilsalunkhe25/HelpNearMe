package com.example.HelpNearMe.Repositories;

import com.example.HelpNearMe.Models.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long>
{
    Optional<AdminUser> findByUsername(String username);

}
