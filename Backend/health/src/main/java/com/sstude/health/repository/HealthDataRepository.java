package com.sstude.health.repository;

import com.sstude.health.entity.HealthData;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Optional;


@Repository
public interface HealthDataRepository extends ReactiveMongoRepository<HealthData, String> {
//    Optional<HealthData> findFirstByMemberIdOrderByCreatedAtDesc(Long memberId);
    Mono<HealthData> findFirstByMemberIdOrderByCreatedAtDesc(Long memberId);
    @Query("{ 'createdAt' : { $gte: ?0, $lt: ?1 } }")
    Flux<HealthData> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
//    List<HealthData> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
