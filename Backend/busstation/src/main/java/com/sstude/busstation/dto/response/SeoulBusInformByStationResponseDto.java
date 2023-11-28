package com.sstude.busstation.dto.response;

import com.sstude.busstation.entity.Bus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeoulBusInformByStationResponseDto {
    private String routeId;
    private String routeNo;
    private String routeType;

    private String startNodeNum;
    private String endNodeNum;

    public static SeoulBusInformByStationResponseDto toDto(Bus dto){
        return SeoulBusInformByStationResponseDto.builder()
                .routeId(dto.getRouteId())
                .routeNo(dto.getRouteNo())
                .routeType(dto.getRouteType())
                .startNodeNum(dto.getStartNodeNum())
                .endNodeNum(dto.getEndNodeNum())
                .build();
    }
}
