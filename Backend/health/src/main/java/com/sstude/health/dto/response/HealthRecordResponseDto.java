package com.sstude.health.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class HealthRecordResponseDto {
    private String id;
    private Long memberId;
    private LocalDateTime createdAt;

    private int BurntKcal;
    private int ConsumedKcal;

    private int sleepTime;
    private int steps;

}
