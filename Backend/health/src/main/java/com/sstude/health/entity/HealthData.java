package com.sstude.health.entity;

import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    private int burntKcal;
    private int consumedKcal;

    private int sleepTime;
    private int steps;

}
