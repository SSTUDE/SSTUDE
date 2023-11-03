package com.sstude.health.dto.request;

import com.sstude.health.entity.Exercise;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class HealthDataRequestDto {
    private int stageTypeDeep;
    private int stageTypeLight;
    private int stageTypeRem;
    private int stageTotalSleeping;
    private List<Exercise> exerciseList;
}
