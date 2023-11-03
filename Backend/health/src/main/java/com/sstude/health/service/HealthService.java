package com.sstude.health.service;

import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.entity.HealthData;
import com.sstude.health.repository.HealthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class HealthService {
    private final HealthRepository healthRepository;

    private HealthData createHealthData(Long memberId, HealthDataRequestDto requestDto){
        return HealthData.builder()
                .memberId(memberId)
                .stageTypeDeep(requestDto.getStageTypeDeep())
                .stageTypeLight(requestDto.getStageTypeLight())
                .stageTypeRem(requestDto.getStageTypeRem())
                .stageTotalSleeping(requestDto.getStageTotalSleeping())
                .exerciseList(requestDto.getExerciseList())
                .build();
    }

    @Transactional
    public HealthRecordResponseDto record(Long memberId, HealthDataRequestDto healthDataRequestDto) {
        HealthData healthData = createHealthData(memberId, healthDataRequestDto);

        // MongoDB에 저장
        healthData = healthRepository.save(healthData);

        // HealthRecordResponseDto 생성
        HealthRecordResponseDto response = new HealthRecordResponseDto(healthData);

        return response;
    }


}
