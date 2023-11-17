package com.sstude.account.controller;

import com.sstude.account.dto.request.AccountRequestDto;
import com.sstude.account.dto.request.GetIdRequestDto;
import com.sstude.account.dto.response.TokenResponseDto;
import com.sstude.account.dto.response.SignupResponseDto;
import com.sstude.account.entity.Account;
import com.sstude.account.global.jwt.JwtTokenProvider;
import com.sstude.account.global.swagger.CustomApi;
import com.sstude.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Account 테스트", description = "계정 및 토큰")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Operation(summary = "일반 회원가입", description = "회원가입 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 얼굴 인식 파이썬에서 시리얼 넘버와 폴더 네임을 합쳐서 deviceNum 이름으로 JSON으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signUp(@RequestBody @Validated AccountRequestDto signupRequestDto) {
        Account account = accountService.signUp(signupRequestDto);
        SignupResponseDto response = new SignupResponseDto(account.getMemberId());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "로그인", description = "로그인 후 accesstoken을 발급받는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 로그인을 위해서는 얼굴 인식 파이썬에서 받은 시리얼 넘버와 폴더 네임을 합쳐서 deviceNum 이름으로 JSON 값이 주어져야 합니다.  \n\n"+"- 로그인 성공 시 발급되는 accesstoken값을 자물쇠에 넣어주세요.\n\n")
    @CustomApi
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody @Validated AccountRequestDto loginRequestDto) {
        TokenResponseDto response = accountService.login(loginRequestDto);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "토큰 갱신", description = "accesstoken과 refreshtoken을 다시 발급받는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- accesstoken값이 만료되었다는 오류를 받으면 이 API를 통해 다시 발급받습니다. \n\n"+"- 응답 성공 시 발급되는 accesstoken값을 저장하여 원래 하려던 API 요청 전에 자물쇠에 넣어주세요.\n\n"+"- refreshtoken값이 만료되었다는 오류를 받았다면 다시 로그인 API를 호출해야 합니다.\n\n")
    @CustomApi
    @PostMapping("/retoken")
    public ResponseEntity<TokenResponseDto> retoken(@RequestHeader("Authorization") @Parameter(hidden = true) final String token) {
        Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
        TokenResponseDto response = accountService.retoken(memberId);
        stringRedisTemplate.delete("RT:"+ token);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "수림이용", description = "accesstoken으로 memberId 값을 반환하는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- accessToken값만 responsebody로 주세요. \n\n")
    @CustomApi
    @PostMapping("/memberId")
    public ResponseEntity<SignupResponseDto> getId(@RequestBody GetIdRequestDto getIdRequestDto){
        String token = "Bearer "+getIdRequestDto.getAccessToken();
        Long memberId = Long.valueOf(jwtTokenProvider.getAccounttest(token));
        SignupResponseDto response = new SignupResponseDto(memberId);
        return ResponseEntity.ok(response);
    }

}
