package com.sstude.health.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    private int totalKcal;
    private int sleepTime;
    private int bloodPressure;

}
