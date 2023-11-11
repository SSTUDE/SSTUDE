package com.sstude.busstation.repository;

import com.sstude.busstation.entity.BusStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusStationRepository extends JpaRepository<BusStation, String> {

    List<BusStation> findBusStationsByMemberId(Long memberId);

}
