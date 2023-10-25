package com.sstude.account.repository;

import com.sstude.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByDeviceNum(String deviceNum);
    Optional<Account> findByMemberId(Long memberId);
}