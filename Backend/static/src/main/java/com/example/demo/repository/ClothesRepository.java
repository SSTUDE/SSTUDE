package com.example.demo.repository;

import com.example.demo.entity.Clothes;
import com.example.demo.entity.Makeups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long>  {

    List<Clothes> findAllByCalenderYearAndCalenderMonth(int year, int month);


}
