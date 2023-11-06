package com.sstude.health.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Setter
@Builder
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

}
