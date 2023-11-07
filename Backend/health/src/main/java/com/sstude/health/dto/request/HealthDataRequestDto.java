package com.sstude.health.dto.request;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class HealthDataRequestDto {
    private int burntKcal;
    private int consumedKcal;

    private int sleepTime;
    private int steps;
}
