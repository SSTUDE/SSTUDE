package com.sstude.health.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum ErrorCode {

    // Account 오류들
    ALREADY_REGISTERED_MEMBER(400, "A001", "이미 가입된 회원 입니다."),
    MEMBER_NOT_EXISTS(400, "A002", "해당 회원은 존재하지 않습니다."),

    //Mobile 오류들
    CERTIFICATION_NOT_EXISTS(404, "M001", "해당 인증문자열은 존재하지 않습니다."),

    // Common 오류들
    INTERNAL_SERVER_ERROR(500, "C004", "서버 에러 : 문의해주세요") ;


    private int status;
    private String errorCode;
    private String message;

}
