package com.sstude.statistics.service;

import com.sstude.statistics.dto.request.StaticDayRequestDto;
import com.sstude.statistics.dto.response.ColorDetailResponseDto;
import com.sstude.statistics.entity.Makeups;
import com.sstude.statistics.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class BeautyService {
    private final MakeupRepository makeupRepository;

    // 날짜의 컬러값, 이미지 반환
    @Transactional(readOnly = true)
    public ColorDetailResponseDto getColorDetail(Long memberId, StaticDayRequestDto requestDto) {

        LocalDate dateTime = LocalDate.of(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay());
        // 이미지, result, 상세보기
        Makeups makeups = makeupRepository.findByCalender(dateTime);

        String result;
        if (makeups.getResultId()==1) result="봄 웜";
        else if (makeups.getResultId()==2) result="여름 쿨";
        else if (makeups.getResultId()==3) result="가을 웜";
        else result="겨울 쿨";

        return new ColorDetailResponseDto(result, makeups.getImgUri());
    }


    // 퍼스널컬러 설명


}
