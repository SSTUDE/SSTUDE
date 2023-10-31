package com.sstude.statistics.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaticDayRequestDto {
    private int year;
    private int month;
    private int day;
}
