package com.sstude.health.repository;

import com.sstude.health.entity.HealthData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HealthRepository extends MongoRepository<HealthData, String> {
    Optional<HealthData> findByMemberId(Long memberId);
}
