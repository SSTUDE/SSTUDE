package com.sstude.statistics.controller;


import com.sstude.statistics.dto.request.StaticMonthRequestDto;
import com.sstude.statistics.dto.response.StaticAllResponseDto;
import com.sstude.statistics.global.jwt.JwtTokenProvider;
import com.sstude.statistics.global.swagger.CustomApi;
import com.sstude.statistics.service.StaticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/static")
public class StatisticsController {

    private final StaticService staticService;
    private final JwtTokenProvider jwtTokenProvider;

    // 전체 통계리스트 제공(나중에 헬스정보도 같이 불러오려면 여기다가 추가 !!)
    @Operation(summary = "달력에 대략 정보 표시", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
    @CustomApi
    @PostMapping(value = "/list")
    public ResponseEntity<StaticAllResponseDto> findAllByMonth(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
                                                , @RequestBody StaticMonthRequestDto requestDto) {

        Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
        StaticAllResponseDto responseDtos = staticService.findAllDesc(memberId, requestDto);
        return new ResponseEntity<>(responseDtos, HttpStatus.OK);
    }


}
