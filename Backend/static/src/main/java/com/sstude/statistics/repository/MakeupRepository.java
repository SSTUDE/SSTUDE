package com.sstude.statistics.repository;

import com.sstude.statistics.entity.Makeups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MakeupRepository extends JpaRepository<Makeups, Long> {

    //
    List<Makeups> findAllByCalenderYearAndCalenderMonthAndMemberId(int year, int month, Long memberId);

    Makeups findByCalender(LocalDate calender);
}
