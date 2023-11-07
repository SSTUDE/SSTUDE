package com.sstude.busstation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusStationResponseDto {
    private Integer cityCode;
    private String latitude;
    private String longitude;
    private String nodeId;
    private String nodeName;
    private Integer nodeNo;

}
