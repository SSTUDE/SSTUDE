package com.sstude.statistics.service;

import com.sstude.statistics.dto.request.StaticMonthRequestDto;
import com.sstude.statistics.dto.response.StaticAllResponseDto;
import com.sstude.statistics.entity.Clothes;
import com.sstude.statistics.entity.Makeups;
import com.sstude.statistics.mongo.ClothesRepository;
import com.sstude.statistics.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Slf4j
public class StaticService {

    private final MakeupRepository makeupRepository;
    private final ClothesRepository clothesRepository;
    static Set<LocalDate> st;

    @Transactional(readOnly = true) // readOnly를 사용하여 조회 기능만 남겨두어 조회속도가 개선
    public StaticAllResponseDto findAllDesc(Long userid, StaticMonthRequestDto staticMonthRequestDto) {
        // makeup과 clothes기록이 있는 데이터 뽑기
        LocalDateTime startday = LocalDateTime.of(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth(), 1, 0, 0);
        LocalDateTime endday = LocalDate.of(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth(), 1)
                .plusMonths(1)
                .atStartOfDay()
                .minusSeconds(1);

        List<Makeups> makeupsList = makeupRepository.findAllByCalenderBetweenAndMemberId(startday, endday, userid);
        List<Clothes> clothesList = clothesRepository.findAllByCalenderBetweenAndMemberId(startday, endday, userid)
                .collectList()
                .block();


        st= new HashSet<>();
        for (Makeups makeup : makeupsList) {
            LocalDateTime calender = makeup.getCalender();
            st.add(calender.toLocalDate());
        }
        ArrayList<LocalDate> list = new ArrayList<>(st);

        st= new HashSet<>();
        for (Clothes clothes : clothesList) {
            LocalDateTime calender = clothes.getCalender();
            System.out.println(calender);
            calender = calender.minusDays(1);
            st.add(calender.toLocalDate());
        }
        ArrayList<LocalDate> list2 = new ArrayList<>(st);

        StaticAllResponseDto responseDtoList = StaticAllResponseDto.of(list, list2);

        return responseDtoList;
    }


}
