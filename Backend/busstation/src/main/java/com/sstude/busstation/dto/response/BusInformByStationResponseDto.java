package com.sstude.busstation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusInformByStationResponseDto {
    private String routeId;
    private String routeNo;
    private String routeType;

    private String startNodeNum;
    private String endNodeNum;
}
