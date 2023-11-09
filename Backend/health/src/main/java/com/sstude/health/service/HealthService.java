package com.sstude.health.service;

import com.sstude.health.dto.request.DayRequestDto;
import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.request.MonthRequestDto;
import com.sstude.health.dto.response.HealthDetailResponseDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.dto.response.CertificationResponseDto;
import com.sstude.health.dto.response.MonthResponseDto;
import com.sstude.health.entity.Health;
import com.sstude.health.entity.HealthData;
import com.sstude.health.entity.Mobile;
import com.sstude.health.global.error.BusinessException;
import com.sstude.health.global.error.ErrorCode;
import com.sstude.health.repository.HealthDataRepository;
import com.sstude.health.repository.HealthRepository;
import com.sstude.health.repository.MobileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
//import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class HealthService {
    private final HealthDataRepository healthDataRepository;
    private final HealthRepository healthRepository;
    private final MobileRepository mobileRepository;

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
        healthData = healthDataRepository.save(healthData);

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
        mobileRepository.save(mobile);

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
        Optional<HealthData> optionalHealthData = healthDataRepository.findFirstByMemberIdOrderByCreatedAtDesc(memberId);

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

//    @Scheduled(cron = "0 0 0 * * *")  // 매일 밤 12시에 실행
    @Scheduled(cron = "0 21 2 * * *")  // 매일 밤 12시에 실행
    @Transactional
    public void saveLatestHealthData() {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();

        // 어제 날짜로 저장된 데이터를 가져오기
        List<HealthData> healthDataList = healthDataRepository.findByCreatedAtBetween(start, end);

        for (HealthData healthData : healthDataList) {
            // memberId 별로 가장 최신의 값을 가져오기
            Optional<HealthData> latestHealthDataOpt = healthDataRepository.findFirstByMemberIdOrderByCreatedAtDesc(healthData.getMemberId());

            if (!latestHealthDataOpt.isPresent()) {
                // 가장 최신의 데이터가 없는 경우, 다음 회원의 데이터 처리로 넘어감
                continue;
            }

            HealthData latestHealthData = latestHealthDataOpt.get();

            Health health = Health.builder()
                    .memberId(latestHealthData.getMemberId())
                    .recordDate(Date.from(LocalDateTime.now().minusDays(1).atZone(ZoneId.systemDefault()).toInstant()))
                    .burntKcal(latestHealthData.getBurntKcal())
                    .consumedKcal(latestHealthData.getConsumedKcal())
                    .sleepTime(latestHealthData.getSleepTime())
                    .steps(latestHealthData.getSteps())
                    .build();

            healthRepository.save(health);
        }
    }

    @Transactional
    public MonthResponseDto month(Long memberId, MonthRequestDto requestDto){
        // 해당하는 년도, 월의 첫날과 마지막날을 가져옴
        LocalDate startDate = LocalDate.of(requestDto.getYear(), requestDto.getMonth(), 1);
        LocalDate endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());

        // DB에서 해당 기간의 데이터를 가져옴
        List<Health> healthDataList = healthRepository.findByMemberIdAndRecordDateBetween(memberId, java.sql.Date.valueOf(startDate), java.sql.Date.valueOf(endDate));

        List<Integer> dateList = healthDataList.stream()
                .map(health -> new java.sql.Date(health.getRecordDate().getTime()).toLocalDate().getDayOfMonth())
                .collect(Collectors.toList());

        return new MonthResponseDto(dateList);
    }

    @Transactional
    public HealthDetailResponseDto day(Long memberId, DayRequestDto requestDto){
        LocalDate date = LocalDate.of(requestDto.getYear(), requestDto.getMonth(), requestDto.getDay());

        Optional<Health> healthDataOptional = healthRepository.findByMemberIdAndRecordDate(memberId, java.sql.Date.valueOf(date));

        if (!healthDataOptional.isPresent()) {
            throw new BusinessException(ErrorCode.HEALTH_DATA_NOT_EXISTS);
        }

        Health healthData = healthDataOptional.get();

        return HealthDetailResponseDto.builder()
                .burntKcal(healthData.getBurntKcal())
                .consumedKcal(healthData.getConsumedKcal())
                .sleepTime(healthData.getSleepTime())
                .steps(healthData.getSteps())
                .build();
    }
}