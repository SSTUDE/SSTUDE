package com.sstude.statistics.service;

import com.sstude.statistics.dto.request.StaticDayRequestDto;
import com.sstude.statistics.dto.request.StaticMonthRequestDto;
import com.sstude.statistics.dto.response.ClothesDetailResponseDto;
import com.sstude.statistics.dto.response.StaticAllResponseDto;
import com.sstude.statistics.entity.Clothes;
import com.sstude.statistics.entity.Makeups;
import com.sstude.statistics.repository.ClothesRepository;
import com.sstude.statistics.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StaticService {

    private final MakeupRepository makeupRepository;
    private final ClothesRepository clothesRepository;

    @Transactional(readOnly = true) // readOnly를 사용하여 조회 기능만 남겨두어 조회속도가 개선
    public StaticAllResponseDto findAllDesc(Long userid, StaticMonthRequestDto staticMonthRequestDto) {

        // makeup과 clothes기록이 있는 데이터 뽑기
        List<Makeups> makeupsList = makeupRepository.findAllByCalenderYearAndCalenderMonthAndMemberId(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth(), userid);
        List<Clothes> clothesList = clothesRepository.findAllByCalenderYearAndCalenderMonthAndMemberId(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth(), userid);

        StaticAllResponseDto responseDtoList = new StaticAllResponseDto();
        ArrayList<Integer> list = new ArrayList<>();
        for (Makeups makeup : makeupsList) {
            LocalDate calender = makeup.getCalender();
            list.add(calender.getDayOfMonth());
        }
        ArrayList<Integer> list2 = new ArrayList<>();
        for (Clothes clothes : clothesList) {
            LocalDateTime calender = clothes.getCalender();
            list2.add(calender.getDayOfMonth());
        }

        responseDtoList.setMakeup(list);
        responseDtoList.setClothes(list2);

        return responseDtoList;
    }


}
