package com.sstude.busstation.dto.request;

import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class SaveBusRequestDto {
    private List<BusInformByStationResponseDto> buses;

}
