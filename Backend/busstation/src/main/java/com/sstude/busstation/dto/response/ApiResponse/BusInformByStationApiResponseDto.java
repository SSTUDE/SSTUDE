package com.sstude.busstation.dto.response.ApiResponse;

import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
import com.sstude.busstation.dto.response.SeoulBusInformByStationResponseDto;
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
public class BusInformByStationApiResponseDto implements ApiResponseDto<BusInformByStationApiResponseDto, SeoulBusInformByStationResponseDto> {
    private String routeid;
    private String routeno;
    private String routetp;

    private String startnodenm;
    private String endnodenm;

    private String busRouteId; // routeid
    private String busRouteNm; // routeno
    private String busRouteType; // routetp

    private String stBegin; // startnodenm
    private String stEnd;   // endnodenm

    @Override
    public List<BusInformByStationApiResponseDto> _getItems() {
        return null;
    }

    @Override
    public SeoulBusInformByStationResponseDto of(BusInformByStationApiResponseDto item) {
        return SeoulBusInformByStationResponseDto.builder()
                .routeId(item.getBusRouteId())
                .routeNo(item.getBusRouteNm())
                .routeType(item.getBusRouteType())
                .startNodeNum(item.getStBegin())
                .endNodeNum(item.getStEnd())
                .build();
    }

//    @Override
//    public BusInformByStationResponseDto of(BusInformByStationApiResponseDto item) {
//        return BusInformByStationResponseDto.builder()
//                .routeId(item.getRouteid())
//                .routeNo(item.getRouteno())
//                .routeType(item.getRoutetp())
//                .startNodeNum(item.getStartnodenm())
//                .endNodeNum(item.getEndnodenm())
//                .build();
//    }
}
