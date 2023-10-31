package com.sstude.statistics.repository;

import com.sstude.statistics.entity.Makeups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MakeupRepository extends JpaRepository<Makeups, Long> {

    @Query("SELECT m FROM Makeups m WHERE YEAR(m.calender) = :year AND MONTH(m.calender) = :month AND m.memberId = :memberId")
    List<Makeups> findMakeupsByYearMonthAndMemberId(@Param("year") int year, @Param("month") int month, @Param("memberId") Long memberId);


    Makeups findByCalender(LocalDate calender);
}
