package com.example.HelpNearMe.Repositories;

import com.example.HelpNearMe.Models.HelperReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HelperReportRepository extends JpaRepository<HelperReport, Long> {
    Optional<HelperReport> findByHelperIdAndIpAddress(Long helperId, String ipAddress);
}
