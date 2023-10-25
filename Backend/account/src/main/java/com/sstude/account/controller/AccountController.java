package com.sstude.account.controller;

import com.sstude.account.dto.request.AccountRequestDto;
import com.sstude.account.dto.response.TokenResponseDto;
import com.sstude.account.dto.response.SignupResponseDto;
import com.sstude.account.entity.Account;
import com.sstude.account.global.swagger.CustomApi;
import com.sstude.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Account", description = "access token 필요")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
    //필터 없음(/account) => 회원가입 , 로그인
    private final AccountService accountService;


    @Operation(summary = "일반 회원가입", description = "회원가입 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 얼굴 인식 파이썬에서 시리얼 넘버와 폴더 네임을 합쳐서 deviceNum 이름으로 JSON으로 넘겨주세요. \n\n")
    @CustomApi
    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signUp(@RequestBody @Validated AccountRequestDto signupRequestDto) {
        Account account = accountService.signUp(signupRequestDto);
        SignupResponseDto response = new SignupResponseDto(account);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "로그인", description = "로그인 후 accesstoken을 발급받는 메서드입니다."+"\n\n### [ 참고사항 ]\n\n"+"- 로그인을 위해서는 얼굴 인식 파이썬에서 받은 시리얼 넘버와 폴더 네임을 합쳐서 deviceNum 이름으로 JSON 값이 주어져야 합니다.  \n\n"+"- 로그인 성공 시 발급되는 accesstoken값을 자물쇠에 넣어주세요.\n\n")
    @CustomApi
    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody @Validated AccountRequestDto loginRequestDto) {
        TokenResponseDto response = accountService.login(loginRequestDto);
        return ResponseEntity.ok(response);
    }


}
