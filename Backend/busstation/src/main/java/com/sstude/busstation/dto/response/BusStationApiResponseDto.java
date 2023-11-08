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
public class BusStationApiResponseDto implements ApiResponseDto<BusStationApiResponseDto, BusStationResponseDto> {
    private Integer citycode;
    private String gpslati;
    private String gpslong;
    private String nodeid;
    private String nodenm;
    private Integer nodeno;

    @Override
    public List<BusStationApiResponseDto> _getItems() {
        return null;
    }

    @Override
    public BusStationResponseDto of(BusStationApiResponseDto item) {
        return BusStationResponseDto.builder()
                .cityCode(item.getCitycode())
                .latitude(item.getGpslati())
                .longitude(item.getGpslong())
                .nodeName(item.getNodenm())
                .nodeId(item.getNodeid())
                .nodeNo(item.getNodeno())
                .build();
    }
}
