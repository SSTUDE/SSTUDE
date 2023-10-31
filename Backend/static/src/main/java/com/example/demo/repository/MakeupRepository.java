package com.example.demo.repository;

import com.example.demo.entity.Makeups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MakeupRepository extends JpaRepository<Makeups, Long> {

    //
    List<Makeups> findAllByCalenderYearAndCalenderMonth(int year, int month);

//    @Query("SELECT DAY(m.calender), YEAR(m.calender), MONTH(m.calender) FROM makeups m WHERE YEAR(m.calender) = :year AND MONTH(m.calender) = :month")
//    List<Object[]> findDayAndDateByYearAndMonth(@Param("year") int year, @Param("month") int month);

}
