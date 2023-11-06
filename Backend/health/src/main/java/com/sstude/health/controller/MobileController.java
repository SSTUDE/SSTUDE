package com.sstude.health.controller;

import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.dto.response.NumberResponseDto;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.service.HealthService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Health Member", description = "삼성 헬스 연동을 위한 모바일 연동")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/health-data")
public class HealthDataController {
    private final JwtTokenProvider jwtTokenProvider;
    private final HealthService healthService;

    @GetMapping("/number")
    public ResponseEntity<?> number(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
        NumberResponseDto response = healthService.number(memberId);
        return ResponseEntity.ok(response);
    }
}
