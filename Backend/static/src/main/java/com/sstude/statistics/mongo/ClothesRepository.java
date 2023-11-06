package com.sstude.statistics.mongo;

import com.sstude.statistics.entity.Clothes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClothesRepository extends MongoRepository<Clothes, Long> {

    List<Clothes> findAllByCalenderBetweenAndMemberId(LocalDateTime startday, LocalDateTime endday, Long memberId);

    List<Clothes> findAllByMemberId(Long memberId);

}
