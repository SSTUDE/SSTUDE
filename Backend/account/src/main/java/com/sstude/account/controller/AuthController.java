package com.sstude.account.controller;

import com.sstude.account.dto.response.TokenResponseDto;
import com.sstude.account.global.error.BusinessException;
import com.sstude.account.global.error.ErrorCode;
import com.sstude.account.global.jwt.JwtTokenProvider;
import com.sstude.account.global.swagger.CustomApi;
import com.sstude.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    //필터 들어감(/auth) => 토큰 갱신
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountService accountService;

    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getAccounttest(token));
        return ResponseEntity.ok().body(memberId);
    }


    @PostMapping("/errortest")
    public BusinessException errortest(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        return new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
    }
}
