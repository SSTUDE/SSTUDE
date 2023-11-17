package com.sstude.statistics.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class StaticAllResponseDto {
    private ArrayList<LocalDate> makeup;
    private ArrayList<LocalDate> clothes;

    public StaticAllResponseDto(ArrayList<LocalDate> makeup, ArrayList<LocalDate> clothes) {
        this.makeup = makeup;
        this.clothes=clothes;
    }

    public static StaticAllResponseDto of(ArrayList<LocalDate> makeup, ArrayList<LocalDate> clothes){
        return new StaticAllResponseDto(makeup, clothes);
    }
}
