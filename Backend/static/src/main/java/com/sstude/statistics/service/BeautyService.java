package com.sstude.statistics.service;

import com.sstude.statistics.dto.request.StaticDayRequestDto;
import com.sstude.statistics.dto.response.ClothesDetailResponseDto;
import com.sstude.statistics.dto.response.ColorDetailResponseDto;
import com.sstude.statistics.entity.Clothes;
import com.sstude.statistics.entity.Makeups;
import com.sstude.statistics.mongo.ClothesRepository;
import com.sstude.statistics.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BeautyService {
    private final MakeupRepository makeupRepository;
    private final ClothesRepository clothesRepository;

    // 날짜의 컬러값, 이미지 반환
    @Transactional(readOnly = true)
    public ColorDetailResponseDto getColorDetail(Long memberId, StaticDayRequestDto requestDto) {
        // 이미지, result, 상세보기
        Makeups makeups = makeupRepository.findMakeupsByYearMonthDayAndMemberId(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay(), memberId);

        return new ColorDetailResponseDto(makeups.getResult(), makeups.getImgUri());
    }

    // 전체 의상 반환
    @Transactional(readOnly = true)
    public List<ClothesDetailResponseDto> getClothesDetail(Long memberId, StaticDayRequestDto requestDto) {

        LocalDateTime startday = LocalDateTime.of(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay(), 0, 0);
        LocalDateTime endday = LocalDateTime.of(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay(), 23, 59);

        // 이미지 점수
        List<Clothes> clothesList = clothesRepository.findAllByCalenderBetweenAndMemberId(startday, endday, memberId);

        List<ClothesDetailResponseDto> clothesDetailList = clothesList.stream()
                .map(clothes -> new ClothesDetailResponseDto(clothes.getScore(), clothes.getImg_uri()))
                .collect(Collectors.toList());

        return clothesDetailList;
    }

//    public ColorDetailResponseDto getPersonalDetail(Long memberId, StaticDayRequestDto requestDto) {
//
//
//    }


//    // 퍼스널컬러 설명
//    @Transactional(readOnly = true)
//    public List<ClothesDetailResponseDto> getClothesDetail(Long memberId, StaticDayRequestDto requestDto) {
//        // 이미지 점수
//        List<Clothes> clothesList = clothesRepository.findAllByCalenderYearAndCalenderMonthAndCalender_DayOfMonthAndMemberIdOrderByCalender(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay(), memberId);
//
//        List<ClothesDetailResponseDto> recentTwoClothes = clothesList.stream()
//                .map(clothes -> new ClothesDetailResponseDto(clothes.getScore(), clothes.getImgUri()))
//                .limit(2) // 최근 2개 값만 가져옴
//                .collect(Collectors.toList());
//
//        return recentTwoClothes;
//    }


}
