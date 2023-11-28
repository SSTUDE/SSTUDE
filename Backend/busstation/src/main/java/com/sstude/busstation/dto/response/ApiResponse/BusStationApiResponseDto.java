package com.sstude.busstation.dto.response.ApiResponse;

import com.sstude.busstation.dto.response.BusStationResponseDto;
import com.sstude.busstation.dto.response.SeoulBusStationResponseDto;
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
public class BusStationApiResponseDto implements ApiResponseDto<BusStationApiResponseDto, SeoulBusStationResponseDto> {
    private Integer citycode; // cityCode
    private String gpslati; // gpsY
    private String gpslong; // gpsX
    private String nodeid;  // arsId
    private String nodenm;  // stationNm
    private Integer nodeno; // stationId

    private String gpsY; // gpslati
    private String gpsX; // gpslong
    private String arsId;  // nodeid
    private String stationNm;  // nodenm
    private Integer stationId; // nodeno

    // "nodenm", "nodeno", "gpslati", "gpslong", "citycode", "nodeid",
    // "gpsX", "gpsY", "stationNm", "arsId", "stationId"


    @Override
    public List<BusStationApiResponseDto> _getItems() {
        return null;
    }

    @Override
    public SeoulBusStationResponseDto of(BusStationApiResponseDto item) {
        return SeoulBusStationResponseDto.builder()
                .cityCode(25)
                .latitude(item.getGpsY())
                .longitude(item.getGpsX())
                .nodeName(item.getStationNm())
                .nodeId(item.getArsId())
                .nodeNo(item.getStationId())
                .build();
    }

//    @Override
//    public BusStationResponseDto of(BusStationApiResponseDto item) {
//        return BusStationResponseDto.builder()
//                .cityCode(item.getCitycode())
//                .latitude(item.getGpslati())
//                .longitude(item.getGpslong())
//                .nodeName(item.getNodenm())
//                .nodeId(item.getNodeid())
//                .nodeNo(item.getNodeno())
//                .build();
//    }
}
