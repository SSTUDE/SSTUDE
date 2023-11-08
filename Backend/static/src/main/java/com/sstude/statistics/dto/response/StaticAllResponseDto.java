package com.sstude.statistics.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class StaticAllResponseDto {
    private ArrayList<Integer> makeup;
    private ArrayList<Integer> clothes;

    public StaticAllResponseDto(ArrayList<Integer> makeup, ArrayList<Integer> clothes) {
        this.makeup = makeup;
        this.clothes=clothes;
    }

    public static StaticAllResponseDto of(ArrayList<Integer> makeup, ArrayList<Integer> clothes){
        return new StaticAllResponseDto(makeup, clothes);
    }
}
