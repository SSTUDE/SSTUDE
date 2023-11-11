package com.sstude.health.controller;

import com.sstude.health.dto.request.DayRequestDto;
import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.request.MonthRequestDto;
import com.sstude.health.dto.response.CertificationResponseDto;
import com.sstude.health.dto.response.HealthDetailResponseDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.dto.response.MonthResponseDto;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.global.swagger.CustomApi;
import com.sstude.health.service.HealthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Tag(name = "Health", description = "삼성 헬스 데이터 관련")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/health")
public class HealthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final HealthService healthService;

    //Mongo DB
    @Operation(summary = "Mongo DB 저장", description = "헬스 데이터 로그 저장 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- certification + mobile 에서 받은 accessToken을 헤더로 가져야 합니다.\n\n")
    @CustomApi
    @PostMapping("/record")
    public Mono<ResponseEntity<HealthRecordResponseDto>> record(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
                                                                @RequestBody HealthDataRequestDto request) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        return healthService.record(memberId,request)
                .map(ResponseEntity::ok);
    }
//    public ResponseEntity<?> record(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
//                                    @RequestBody HealthDataRequestDto request) {
//        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
//        HealthRecordResponseDto response = healthService.record(memberId,request);
//        return ResponseEntity.ok(response);
//    }


    @Operation(summary = "헬스 데이터 회원 검증", description = "헬스 데이터를 가져올 회원을 인증하는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 인증 문자열을 모바일에서 등록해야 해당하는 memberId의 결괏값을 얻을 수 있습니다.\n\n")
    @CustomApi
    @GetMapping("/certification")
    public ResponseEntity<?> certification(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        CertificationResponseDto response = healthService.certification(memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "오늘 헬스 데이터", description = "오늘 헬스 데이터를 가져오는 메서드입니다.")
    @CustomApi
    @GetMapping("/detail")
    public Mono<ResponseEntity<HealthDetailResponseDto>> detail(@RequestHeader("Authorization") @Parameter(hidden = true) final String token){
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        return healthService.detail(memberId)
                .map(ResponseEntity::ok);
    }
//    public ResponseEntity<?> detail(@RequestHeader("Authorization") @Parameter(hidden = true) final String token){
//        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
//        HealthDetailResponseDto response = healthService.detail(memberId);
//        return ResponseEntity.ok(response);
//    }

    @Operation(summary = "달력 1달 헬스 데이터", description = "달력 1달 전체의 헬스 데이터가 있는 날짜를 반환하는 메서드입니다.")
    @CustomApi
    @PostMapping("/month")
    public ResponseEntity<?> month(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
                                   @RequestBody MonthRequestDto request){
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        MonthResponseDto response = healthService.month(memberId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "달력 하루 헬스 데이터", description = "달력 하루의 헬스 데이터가 있는 날짜를 반환하는 메서드입니다.")
    @CustomApi
    @PostMapping("/day")
    public ResponseEntity<?> day(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
                                   @RequestBody DayRequestDto request){
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        HealthDetailResponseDto response = healthService.day(memberId, request);
        return ResponseEntity.ok(response);
    }

}
