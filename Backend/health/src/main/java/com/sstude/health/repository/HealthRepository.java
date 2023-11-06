package com.sstude.health.repository;

import com.sstude.health.entity.Health;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HealthRepository extends JpaRepository<Health, String> {
    List<Health> findByMemberIdAndRecordDateBetween(Long memberId, Date startDate, Date endDate);
    Optional<Health> findByMemberIdAndRecordDate(Long memberId, Date date);
}
