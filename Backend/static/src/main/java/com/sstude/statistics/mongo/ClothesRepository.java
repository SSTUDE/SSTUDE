package com.sstude.statistics.mongo;

import com.sstude.statistics.entity.Clothes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClothesRepository extends ReactiveMongoRepository<Clothes, Long> {

    Flux<Clothes> findAllByCalenderBetweenAndMemberId(LocalDateTime startday, LocalDateTime endday, Long memberId);

//    List<Clothes> findAllByMemberId(Long memberId);
}
