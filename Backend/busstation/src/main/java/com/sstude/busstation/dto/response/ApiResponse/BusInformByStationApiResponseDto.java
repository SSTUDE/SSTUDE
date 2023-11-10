package com.sstude.busstation.dto.response.ApiResponse;

import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
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
public class BusInformByStationApiResponseDto implements ApiResponseDto<BusInformByStationApiResponseDto, BusInformByStationResponseDto> {
    private String routeid;
    private String routeno;
    private String routetp;

    private String startnodenm;
    private String endnodenm;

    @Override
    public List<BusInformByStationApiResponseDto> _getItems() {
        return null;
    }

    @Override
    public BusInformByStationResponseDto of(BusInformByStationApiResponseDto item) {
        return BusInformByStationResponseDto.builder()
                .routeId(item.getRouteid())
                .routeNo(item.getRouteno())
                .routeType(item.getRoutetp())
                .startNodeNum(item.getStartnodenm())
                .endNodeNum(item.getEndnodenm())
                .build();
    }
}
