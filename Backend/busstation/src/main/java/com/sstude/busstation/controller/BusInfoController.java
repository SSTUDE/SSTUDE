package com.sstude.busstation.controller;

import com.sstude.busstation.dto.request.StationRequestDto;
import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
import com.sstude.busstation.dto.response.BusStationResponseDto;
import com.sstude.busstation.global.jwt.JwtTokenProvider;
import com.sstude.busstation.global.swagger.CustomApi;
import com.sstude.busstation.dto.request.GpsRequestDto;
import com.sstude.busstation.service.BusInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "BusInfo", description = "버스 정보 조회 ")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/bus-station")
public class BusInfoController {

    private final BusInfoService busInfoService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "주변정류장 확인", description = "버스 정류장 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 라즈베리파이 GPS 를 바탕으로, 해당 위치를 조회하고, 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. Json에 위도[latitude] 경도[longitude]로 JSON으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/near")
    public ResponseEntity<List<BusStationResponseDto>> findBusListInform(
            @RequestBody @Validated GpsRequestDto gpsRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<BusStationResponseDto> response = busInfoService.findBusStationListInform(gpsRequestDto,memberId);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "버스 도착정보 확인", description = "버스 도착 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들을 찾습니다. 조회받은 데이터를 활용해 버스의 도착 예정 정보를 줍니다. Json에 도시정보[cityCode] 정류소ID[nodeId]를 JSON으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/bus-arrival-inform")
    public ResponseEntity<List<BusResponseDto>> findBusInform(
            @RequestBody @Validated StationRequestDto stationRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<BusResponseDto> response = busInfoService.findBusListInform(stationRequestDto,memberId);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "버스 정류장별 버스 번호 조회", description = "버스 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들을 찾습니다. 조회받은 데이터를 활용해 버스의 정보를 줍니다. Json에 도시정보[cityCode] 정류소ID[nodeId]를 JSON으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/bus-inform")
    public ResponseEntity<List<BusInformByStationResponseDto>> findBusListAtStation(
            @RequestBody @Validated StationRequestDto stationRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<BusInformByStationResponseDto> response = busInfoService.findBusListAtStation(stationRequestDto,memberId);

        return ResponseEntity.ok(response);
    }

}
