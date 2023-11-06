package com.sstude.health.repository;

import com.sstude.health.entity.Health;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthRepository extends MongoRepository<Health, String> {
}
