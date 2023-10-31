package com.sstude.statistics.repository;

import com.sstude.statistics.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long>  {

    List<Clothes> findAllByCalenderYearAndCalenderMonthAndMemberId(int year, int month, Long memberId);

    List<Clothes> findAllByCalenderYearAndCalenderMonthAndCalender_DayOfMonthAndMemberIdOrderByCalender(int year, int month, int day, Long memberId);

}
