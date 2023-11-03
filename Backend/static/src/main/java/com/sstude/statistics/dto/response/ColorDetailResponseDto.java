package com.sstude.statistics.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ColorDetailResponseDto {
    private String result;
    private String imgUri;


    public ColorDetailResponseDto(String result, String imgUri) {
        this.result = result;
        this.imgUri = imgUri;
    }

}
