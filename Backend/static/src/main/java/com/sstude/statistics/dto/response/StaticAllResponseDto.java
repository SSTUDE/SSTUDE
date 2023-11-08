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


    @Builder
    public static StaticAllResponseDto of(ArrayList<Integer> makeup, ArrayList<Integer> clothes){
        return StaticAllResponseDto.builder()
                .makeup(makeup)
                .clothes(clothes)
                .build();
    }
}
