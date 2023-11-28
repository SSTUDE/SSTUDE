package com.sstude.busstation.dto.response;

import com.sstude.busstation.entity.BusStation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeoulBusStationResponseDto {
    private Integer cityCode;
    private String latitude;
    private String longitude;
    private String nodeId;
    private String nodeName;
    private Integer nodeNo;


    public static SeoulBusStationResponseDto toDto(BusStation dto){
        return SeoulBusStationResponseDto.builder()
                .cityCode(dto.getCityCode())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .nodeId(dto.getNodeId())
                .nodeName(dto.getNodeName())
                .nodeNo(dto.getNodeNo())
                .build();
    }
}
