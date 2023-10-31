package com.example.demo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Table(name="clothes")
public class clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clothesId;

    // memberid는 join??
    private Long memberId;
    private Integer score;
    private String imgUri;

    private LocalDateTime calender;

}
