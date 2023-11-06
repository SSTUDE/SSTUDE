package com.sstude.health.controller;

import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.response.CertificationResponseDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.service.HealthService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Health", description = "삼성 헬스 데이터 관련")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/health")
public class HealthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final HealthService healthService;

    //Mongo DB
    @PostMapping("/record")
    public ResponseEntity<?> record(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
                                    @RequestBody HealthDataRequestDto request) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        HealthRecordResponseDto response = healthService.record(memberId,request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/certification")
    public ResponseEntity<?> certification(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        CertificationResponseDto response = healthService.certification(memberId);
        return ResponseEntity.ok(response);
    }

}
