package com.sstude.health.repository;

import com.sstude.health.entity.HealthData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface HealthDataRepository extends MongoRepository<HealthData, String> {
    Optional<HealthData> findFirstByMemberIdOrderByCreatedAtDesc(Long memberId);
    @Query("{ 'createdAt' : { $gte: ?0, $lt: ?1 } }")
    List<HealthData> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
