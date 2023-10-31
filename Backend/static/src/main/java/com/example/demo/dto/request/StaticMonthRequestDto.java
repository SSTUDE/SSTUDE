package com.example.demo.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class StaticMonthRequestDto {
    private int year;
    private int month;
}
