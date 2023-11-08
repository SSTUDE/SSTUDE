package com.sstude.busstation.dto.response;

import com.sstude.busstation.utils.ApiResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusInformApiResponseDto implements ApiResponseDto<BusInformApiResponseDto, BusResponseDto> {
    private Integer arrprevstationcnt;
    private Integer arrtime;

    private String nodeid;
    private String nodenm;

    private String routeid;
    private String routeno;
    private String routetp;
    private String vehicletp;

    @Override
    public List<BusInformApiResponseDto> _getItems() {
        return null;
    }

    @Builder
    public BusResponseDto of(BusInformApiResponseDto item) {
        return BusResponseDto.builder()
                .arrivalPrevStationCount(item.getArrprevstationcnt())
                .arrivalTime(item.getArrtime())
                .nodeId(item.getNodeid())
                .nodeName(item.getNodenm())
                .routeId(item.getRouteid())
                .routeNo(item.getRouteno())
                .routeType(item.getRoutetp())
                .vehicleType(item.getVehicletp())
                .build();
    }
}
