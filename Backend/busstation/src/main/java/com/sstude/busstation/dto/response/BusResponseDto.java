package com.sstude.busstation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusResponseDto {
    private Integer arrivalPrevStationCount;
    private Integer arrivalTime;

    private String nodeId;
    private String nodeName;

    private String routeId;
    private String routeNo;
    private String routeType;
    private String vehicleType;
}
