package com.example.demo.service;

import com.example.demo.dto.request.StaticMonthRequestDto;
import com.example.demo.dto.response.StaticAllResponseDto;
import com.example.demo.entity.Clothes;
import com.example.demo.entity.Makeups;
import com.example.demo.repository.ClothesRepository;
import com.example.demo.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BeautyService {

    private final MakeupRepository makeupRepository;
    private final ClothesRepository clothesRepository;

    @Transactional(readOnly = true) // readOnly를 사용하여 조회 기능만 남겨두어 조회속도가 개선
    public StaticAllResponseDto findAllDesc(int userid, StaticMonthRequestDto staticMonthRequestDto) {
        //어떻게 맴버 정보를 가져오는거지??
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 없습니다. id =" + memberId));

        // makeup과 clothes기록이 있는 데이터 뽑기
        List<Makeups> makeupsList = makeupRepository.findAllByCalenderYearAndCalenderMonth(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth());
        List<Clothes> clothesList = clothesRepository.findAllByCalenderYearAndCalenderMonth(staticMonthRequestDto.getYear(), staticMonthRequestDto.getMonth());




        return responseDtoList;
    }

}
