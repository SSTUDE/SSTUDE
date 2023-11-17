package com.sstude.health.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
@Setter
@Entity(name = "healths")
public class Health {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    @Temporal(TemporalType.DATE)
    private Date recordDate;

    private int burntKcal;
    private int consumedKcal;

    private int sleepTime;
    private int steps;

    @Builder
    public Health(Long id, Long memberId, Date recordDate, int burntKcal, int consumedKcal, int sleepTime, int steps) {
        this.id = id;
        this.memberId = memberId;
        this.recordDate = recordDate;
        this.burntKcal = burntKcal;
        this.consumedKcal = consumedKcal;
        this.sleepTime = sleepTime;
        this.steps = steps;
    }
}
