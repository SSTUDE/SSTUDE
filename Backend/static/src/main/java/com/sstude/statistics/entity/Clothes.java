package com.sstude.statistics.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Document(collection = "chatMessage")
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clothesId;

    // memberid는 join??
    private Long memberId;
    private Integer score;
    private String imgUri;

    private LocalDateTime calender;

}
