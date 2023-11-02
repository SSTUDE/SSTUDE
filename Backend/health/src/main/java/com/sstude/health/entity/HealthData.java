package com.sstude.health.entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Setter
@Document(collection = "healthdatas")
public class HealthData {
    @Id
    private String _id;
    private Long memberId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private int stageTypeDeep;
    private int stageTypeLight;
    private int stageTypeRem;
    private int stageTotalSleeping;

    private List<Exercise> exerciseList;
}
