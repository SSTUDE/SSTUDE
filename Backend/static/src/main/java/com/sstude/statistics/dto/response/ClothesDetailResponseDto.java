package com.sstude.statistics.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClothesDetailResponseDto {
    private Integer score;
    private String imgUri;


    public ClothesDetailResponseDto(Integer score, String imgUri) {
        this.score = score;
        this.imgUri = imgUri;
    }

}
