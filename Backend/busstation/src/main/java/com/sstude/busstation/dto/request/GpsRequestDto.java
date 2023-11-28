package com.sstude.busstation.dto.request;

import lombok.Getter;

@Getter
public class GpsRequestDto {
    private String latitude;
    private String longitude;
    private String numOfRows;
    private String radius;
}
