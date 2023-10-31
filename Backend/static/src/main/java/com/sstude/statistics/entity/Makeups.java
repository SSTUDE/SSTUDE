package com.sstude.statistics.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor
@Table(name="makeups")
public class Makeups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myId;

    // memberid는 join??
    private Long memberId;
    private Long resultId;
    private String imgUri;

    private LocalDate calender;

}
