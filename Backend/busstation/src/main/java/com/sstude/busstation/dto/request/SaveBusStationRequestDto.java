package com.sstude.busstation.dto.request;

import com.sstude.busstation.dto.response.BusStationResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class SaveBusStationRequestDto {
    private List<BusStationResponseDto> busStations;
}
