package com.sstude.health.dto.response;

import com.sstude.health.entity.HealthData;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class HealthRecordResponseDto {
    private String id;
    private Long memberId;
    private LocalDateTime createdAt;

    private int burntKcal;
    private int consumedKcal;

    private int sleepTime;
    private int steps;

    public HealthRecordResponseDto(HealthData healthData) {
        this.id = healthData.getId();
        this.memberId = healthData.getMemberId();
        this.createdAt = healthData.getCreatedAt();
        this.burntKcal = healthData.getBurntKcal();
        this.consumedKcal = healthData.getConsumedKcal();
        this.sleepTime = healthData.getSleepTime();
        this.steps = healthData.getSteps();
    }
}
