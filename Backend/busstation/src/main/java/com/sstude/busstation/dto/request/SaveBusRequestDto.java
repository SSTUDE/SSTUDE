package com.sstude.busstation.dto.request;

import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
import com.sstude.busstation.dto.response.SeoulBusInformByStationResponseDto;
import lombok.Getter;

import java.util.List;

@Getter
public class SaveBusRequestDto {
    private List<SeoulBusInformByStationResponseDto> buses;
//    private List<BusInformByStationResponseDto> buses;

}
