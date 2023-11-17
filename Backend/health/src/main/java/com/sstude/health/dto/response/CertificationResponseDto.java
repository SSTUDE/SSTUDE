package com.sstude.health.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificationResponseDto {
    private String certification;

    public CertificationResponseDto(String certification){
        this.certification = certification;
    }
}
