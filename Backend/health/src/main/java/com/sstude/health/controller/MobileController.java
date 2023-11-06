package com.sstude.health.controller;

import com.sstude.health.dto.request.MobileRequestDto;
import com.sstude.health.dto.response.MobileResponseDto;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.global.swagger.CustomApi;
import com.sstude.health.service.MobileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Mobile", description = "삼성 헬스 연동을 위한 모바일 연동")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mobile")
public class MobileController {
    private final MobileService mobileService;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Operation(summary = "헬스 데이터 회원 등록", description = "헬스 데이터를 가져올 회원을 등록하는 메서드입니다.")
    @CustomApi
    @PostMapping("/regist")
    public ResponseEntity<?> regist(@RequestBody MobileRequestDto request){
        MobileResponseDto response = mobileService.regist(request.getCertification());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "모바일용 토큰 갱신", description = "accesstoken과 refreshtoken을 다시 발급받는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- accesstoken값이 만료되었다는 오류를 받으면 이 API를 통해 다시 발급받습니다. \n\n"+"- 응답 성공 시 발급되는 accesstoken값을 저장하여 원래 하려던 API 요청 전에 자물쇠에 넣어주세요.\n\n"+"- refreshtoken값이 만료되었다는 오류를 받았다면 다시 로그인 API를 호출해야 합니다.\n\n")
    @CustomApi
    @PostMapping("/retoken")
    public ResponseEntity<?> retoken(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
        MobileResponseDto response = mobileService.retoken(memberId);
        stringRedisTemplate.delete("RT:"+ token);
        return ResponseEntity.ok(response);
    }
}
