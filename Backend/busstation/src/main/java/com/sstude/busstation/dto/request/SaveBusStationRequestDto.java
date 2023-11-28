package com.sstude.busstation.dto.request;

import com.sstude.busstation.dto.response.BusStationResponseDto;
import com.sstude.busstation.dto.response.SeoulBusStationResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class SaveBusStationRequestDto {
    private List<SeoulBusStationResponseDto> busStations;
//    private List<BusStationResponseDto> busStations;
}
