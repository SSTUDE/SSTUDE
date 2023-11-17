package com.sstude.health.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class MonthResponseDto {
    private List<LocalDate> dates;

    public MonthResponseDto(List<LocalDate> dates) {
        this.dates = dates;
    }
}