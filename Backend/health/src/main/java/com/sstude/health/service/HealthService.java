package com.sstude.health.service;

import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.response.HealthDetailResponseDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.dto.response.CertificationResponseDto;
import com.sstude.health.entity.HealthData;
import com.sstude.health.entity.Mobile;
import com.sstude.health.global.error.BusinessException;
import com.sstude.health.global.error.ErrorCode;
import com.sstude.health.repository.HealthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class HealthService {
    private final HealthRepository healthRepository;

    private HealthData createHealthData(Long memberId, HealthDataRequestDto requestDto){
        return HealthData.builder()
                .memberId(memberId)
                .burntKcal(requestDto.getBurntKcal())
                .consumedKcal(requestDto.getConsumedKcal())
                .sleepTime(requestDto.getSleepTime())
                .steps(requestDto.getSteps())
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

    @Transactional
    public CertificationResponseDto certification(Long memberId){
        String generatedCertification = generateCertification();

        Mobile mobile = Mobile.builder()
                .memberId(memberId)
                .certification(generatedCertification)
                .status(false)
                .build();

        CertificationResponseDto response = new CertificationResponseDto(mobile.getCertification());
        return  response;
    }

    private String generateCertification() {
        // 임의의 문자와 숫자가 섞인 6자리 문자열 생성
        String certification = RandomStringUtils.randomAlphanumeric(6);
        return certification;
    }

    @Transactional
    public HealthDetailResponseDto detail(Long memberId){
        //가장 최신값 가져오기
        Optional<HealthData> optionalHealthData = healthRepository.findFirstByMemberIdOrderByCreatedAtDesc(memberId);

        if (!optionalHealthData.isPresent()) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
        }

        HealthData healthData = optionalHealthData.get();

        HealthDetailResponseDto healthDataDto = HealthDetailResponseDto.builder()
                .burntKcal(healthData.getBurntKcal())
                .consumedKcal(healthData.getConsumedKcal())
                .sleepTime(healthData.getSleepTime())
                .steps(healthData.getSteps())
                .build();

        return healthDataDto;
    }


}
