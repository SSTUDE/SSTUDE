package com.sstude.health.dto.request;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class HealthDataRequestDto {
    private int BurntKcal;
    private int ConsumedKcal;

    private int sleepTime;
    private int steps;
}
