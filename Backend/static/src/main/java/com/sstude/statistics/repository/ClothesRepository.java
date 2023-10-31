package com.sstude.statistics.repository;

import com.sstude.statistics.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long>  {

    @Query("SELECT c FROM Clothes c WHERE YEAR(c.calender) = :year AND MONTH(c.calender) = :month AND c.memberId = :memberId")
    List<Clothes> findClothesByYearMonthAndMemberId(@Param("year") int year, @Param("month") int month, @Param("memberId") Long memberId);

    @Query("SELECT c FROM Clothes c WHERE YEAR(c.calender) = :year AND MONTH(c.calender) = :month AND DAY(c.calender) = :day AND c.memberId = :memberId ORDER BY c.calender")
    List<Clothes> findClothesByYearMonthDayAndMemberId(@Param("year") int year, @Param("month") int month, @Param("day") int day, @Param("memberId") Long memberId);

}
