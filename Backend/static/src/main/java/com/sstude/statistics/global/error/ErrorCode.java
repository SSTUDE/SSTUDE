package com.sstude.statistics.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@AllArgsConstructor
@Getter
public enum ErrorCode {

    INVALID_TOKEN(401, "A005", "해당 토큰은 유효한 토큰이 아닙니다."),

    // Account 오류들
    ALREADY_REGISTERED_MEMBER(400, "M001", "이미 가입된 회원 입니다."),
    MEMBER_NOT_EXISTS(400, "M002", "해당 회원은 존재하지 않습니다."),

    // Common 오류들
    INTERNAL_SERVER_ERROR(500, "C004", "서버 에러 : 문의해주세요") ;


    private int status;
    private String errorCode;
    private String message;

}
