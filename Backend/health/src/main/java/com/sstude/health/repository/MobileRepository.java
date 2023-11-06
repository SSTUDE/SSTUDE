package com.sstude.health.repository;

import com.sstude.health.entity.Mobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MobileRepository extends JpaRepository<Mobile, Long> {
    Optional<Mobile> findByCertification(String certification);
    Optional<Mobile> findByMemberId(Long memberId);
}
