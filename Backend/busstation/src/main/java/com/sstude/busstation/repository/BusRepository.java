package com.sstude.busstation.repository;

import com.sstude.busstation.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, String> {
    List<Bus> findBusesByMemberId(Long memberId);
}
