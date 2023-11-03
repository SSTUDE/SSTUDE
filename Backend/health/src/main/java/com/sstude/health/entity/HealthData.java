package com.sstude.health.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Setter
@Document(collection = "healthdatas")
@Builder
public class HealthData {
    @Id
    private String id;
    private Long memberId;

    @CreatedDate
    private LocalDateTime createdAt;

    private int stageTypeDeep;
    private int stageTypeLight;
    private int stageTypeRem;
    private int stageTotalSleeping;

    private List<Exercise> exerciseList;


}
