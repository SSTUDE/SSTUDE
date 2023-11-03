package com.sstude.health.controller;

import com.sstude.health.dto.request.HealthDataRequestDto;
import com.sstude.health.dto.response.HealthRecordResponseDto;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.service.HealthService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Health", description = "삼성 헬스 데이터 관련")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/health")
public class HealthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final HealthService healthService;

    @PostMapping("/record")
    public ResponseEntity<?> record(@RequestHeader("Authorization") @Parameter(hidden = true) final String token,
                                    @RequestBody HealthDataRequestDto request) {
        Long memberId = Long.valueOf(jwtTokenProvider.getMember(token));
//        Account account = accountService.signUp(signupRequestDto);
//        HealthRecordResponseDto response = new HealthRecordResponseDto(memberId);
        HealthRecordResponseDto response = healthService.record(memberId,request);
        return ResponseEntity.ok(response);
    }
}
