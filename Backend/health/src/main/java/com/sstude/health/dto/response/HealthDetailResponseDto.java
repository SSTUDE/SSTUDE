package com.sstude.health.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HealthDetailResponseDto {
    private int burntKcal;
    private int consumedKcal;
    private int sleepTime;
    private int steps;
}
