package com.sstude.busstation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusStationRepository extends JpaRepository<com.sstude.busstation.entity.BusStation, String> {
}
