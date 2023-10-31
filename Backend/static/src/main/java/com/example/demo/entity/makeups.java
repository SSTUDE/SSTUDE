package com.example.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Table(name="makeups")
public class makeups {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myId;

    // memberid는 join??
    private Long memberId;
    private Long resultId;
    private String imgUri;

    private LocalDateTime calender;

}
