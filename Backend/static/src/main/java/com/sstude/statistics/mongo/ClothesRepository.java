package com.sstude.statistics.mongo;

import com.sstude.statistics.entity.Clothes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClothesRepository extends MongoRepository<Clothes, Long> {

    List<Clothes> findAllByCalenderBetweenAndMemberId(LocalDateTime startday, LocalDateTime endday, Long memberId);

//    @Query("SELECT c FROM Clothes c WHERE YEAR(c.calender) = :year AND MONTH(c.calender) = :month AND DAY(c.calender) = :day AND c.memberId = :memberId ORDER BY c.calender")
//    List<Clothes> findClothesByYearMonthDayAndMemberId(@Param("year") int year, @Param("month") int month, @Param("day") int day, @Param("memberId") Long memberId);


}
