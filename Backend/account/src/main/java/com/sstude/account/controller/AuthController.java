package com.sstude.account.controller;

import com.sstude.account.global.error.BusinessException;
import com.sstude.account.global.error.ErrorCode;
import com.sstude.account.global.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Test", description = "서버 테스트용")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "서버 테스트용")
    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getAccounttest(token));
        return ResponseEntity.ok().body(memberId);
    }

    @Operation(summary = "서버 테스트용")
    @PostMapping("/errortest")
    public BusinessException errortest(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        return new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
    }
}
