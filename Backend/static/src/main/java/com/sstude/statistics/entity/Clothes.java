package com.sstude.statistics.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Document(collection = "clothes")
public class Clothes {

    @Id
    private Long clothesId;

    // memberid는 join??
    private Long memberId;
    private Integer score;
    private String imguri;

    private LocalDateTime calender;

}
