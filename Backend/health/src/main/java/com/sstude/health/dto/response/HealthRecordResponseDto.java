package com.sstude.health.dto.response;

import com.sstude.health.entity.Exercise;
import com.sstude.health.entity.HealthData;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
public class HealthRecordResponseDto {
    private String id;
    private Long memberId;
    private LocalDateTime createdAt;
    private int stageTypeDeep;
    private int stageTypeLight;
    private int stageTypeRem;
    private int stageTotalSleeping;
    private List<Exercise> exerciseList;

    public HealthRecordResponseDto(HealthData healthData) {
        this.id = healthData.getId();
        this.memberId = healthData.getMemberId();
        this.createdAt = healthData.getCreatedAt();
        this.stageTypeDeep = healthData.getStageTypeDeep();
        this.stageTypeLight = healthData.getStageTypeLight();
        this.stageTypeRem = healthData.getStageTypeRem();
        this.stageTotalSleeping = healthData.getStageTotalSleeping();
        this.exerciseList = healthData.getExerciseList();
    }
}
