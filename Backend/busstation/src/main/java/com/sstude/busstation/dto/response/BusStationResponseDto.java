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
public class BusStationResponseDto {
    private Integer cityCode;
    private String latitude;
    private String longitude;
    private String nodeId;
    private String nodeName;
    private Integer nodeNo;


    public static BusStationResponseDto toDto(BusStation dto){
        return BusStationResponseDto.builder()
                .cityCode(dto.getCityCode())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .nodeId(dto.getNodeId())
                .nodeName(dto.getNodeName())
                .nodeNo(dto.getNodeNo())
                .build();
    }
}
