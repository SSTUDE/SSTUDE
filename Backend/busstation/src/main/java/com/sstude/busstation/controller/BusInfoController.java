package com.sstude.busstation.controller;

import com.sstude.busstation.dto.request.SaveBusRequestDto;
import com.sstude.busstation.dto.request.SaveBusStationRequestDto;
import com.sstude.busstation.dto.request.StationRequestDto;
import com.sstude.busstation.dto.response.*;
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
    public ResponseEntity<List<SeoulBusStationResponseDto>> findBusListInform(
            @RequestBody @Validated GpsRequestDto gpsRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        log.info("feedback log");
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<SeoulBusStationResponseDto> response = busInfoService.findBusStationListInform(gpsRequestDto,memberId);
        log.info("라마바");
        return ResponseEntity.ok(response);
    }

//    @Operation(summary = "주변정류장 확인", description = "버스 정류장 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 라즈베리파이 GPS 를 바탕으로, 해당 위치를 조회하고, 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. Json에 위도[latitude] 경도[longitude]로 JSON으로 넘겨주세요. \n\n")
//    @CustomApi
//    @PostMapping("/near")
//    public ResponseEntity<List<BusStationResponseDto>> findBusListInform(
//            @RequestBody @Validated GpsRequestDto gpsRequestDto,
//            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
//    ) {
//        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
//        List<BusStationResponseDto> response = busInfoService.findBusStationListInform(gpsRequestDto,memberId);
//
//        return ResponseEntity.ok(response);
//    }


    @Operation(summary = "원하는 정류장 저장", description = "버스 정류장 정보 저장 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 라즈베리파이 GPS 를 바탕으로, 해당 위치를 조회하고, 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. Json에 버스정류장 정보를 Array로 담아주세요 담는 Object class는 제공한 Object DTO와 동일합니다. [ {object},{object},... ]으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/near/save")
    public ResponseEntity<String> saveBusStationInform(
            @RequestBody @Validated SaveBusStationRequestDto saveBusStationRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        String response = busInfoService.saveBusStationInform(memberId, saveBusStationRequestDto);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "저장된 정류장 불러오기", description = "버스 정류장 정보를 불러오는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 라즈베리파이 GPS 를 바탕으로, 해당 위치를 조회하고, 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. 넘겨줄 정보는 없습니다. accessToken에 담긴 memberId를 바탕으로 데이터를 조회합니다. \n\n")
    @CustomApi
    @PostMapping("/near/load")
    public ResponseEntity<List<BusStationResponseDto>> loadBusStationInform(
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<BusStationResponseDto> response = busInfoService.loadBusStationInform(memberId);

        return ResponseEntity.ok(response);
    }
    
    @Operation(summary = "버스 도착정보 확인", description = "버스 도착 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들의 도착시간을 찾습니다. 조회받은 데이터를 활용해 버스의 도착 예정 정보를 줍니다. Json에 도시정보[cityCode] 정류소ID[nodeId]를 JSON으로 넘겨주세요. \n\n")
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
    public ResponseEntity<List<SeoulBusInformByStationResponseDto>> findBusListAtStation(
            @RequestBody @Validated StationRequestDto stationRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<SeoulBusInformByStationResponseDto> response = busInfoService.findBusListAtStation(stationRequestDto,memberId);

        return ResponseEntity.ok(response);
    }

//    @Operation(summary = "버스 정류장별 버스 번호 조회", description = "버스 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들을 찾습니다. 조회받은 데이터를 활용해 버스의 정보를 줍니다. Json에 도시정보[cityCode] 정류소ID[nodeId]를 JSON으로 넘겨주세요. \n\n")
//    @CustomApi
//    @PostMapping("/bus-inform")
//    public ResponseEntity<List<BusInformByStationResponseDto>> findBusListAtStation(
//            @RequestBody @Validated StationRequestDto stationRequestDto,
//            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
//    ) {
//        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
//        List<BusInformByStationResponseDto> response = busInfoService.findBusListAtStation(stationRequestDto,memberId);
//
//        return ResponseEntity.ok(response);
//    }

    @Operation(summary = "원하는 버스 번호 저장", description = "버스 정보 저장 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들을 찾습니다. 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. Json에 버스정류장 정보를 Array로 담아주세요 담는 Object class는 제공한 Object DTO와 동일합니다. [ {object},{object},... ]으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/bus-inform/save")
    public ResponseEntity<String> saveBusListAtStation(
            @RequestBody @Validated SaveBusRequestDto saveBusRequestDto,
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        String response = busInfoService.saveBusListAtStation(memberId, saveBusRequestDto);

        return ResponseEntity.ok(response);
    }


    @Operation(summary = "버스 번호 불러오기", description = "버스 정보 조회 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 버스정류장 ID와 도시정보를 바탕으로 해당정류장의 버스들을 찾습니다. 조회받은 데이터를 활용해 버스 정류장 정보를 줍니다. 넘겨줄 정보는 없습니다. accessToken에 담긴 memberId를 바탕으로 데이터를 조회합니다. \n\n")
    @CustomApi
    @PostMapping("/bus-inform/load")
    public ResponseEntity<List<BusInformByStationResponseDto>> loadBusListAtStation(
            @RequestHeader("Authorization") @Parameter(hidden = true) final String token
    ) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        List<BusInformByStationResponseDto> response = busInfoService.loadBusListAtStation(memberId);

        return ResponseEntity.ok(response);
    }


}
