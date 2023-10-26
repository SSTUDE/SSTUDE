package com.sstude.gateway.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum ErrorCode {

    // Auth 오류들
    ACCESS_TOKEN_EXPIRED(401, "A001", "access token이 만료되었습니다."),
    REFRESH_TOKEN_EXPIRED(401, "A002", "refresh token이 만료되었습니다."),
    REFRESH_TOKEN_NOT_FOUND(401, "A003", "refresh token이 존재하지 않습니다."),
    NOT_ACCESS_TOKEN(401, "A004", "access token이 존재하지 않습니다."),
    INVALID_TOKEN(401, "A005", "해당 토큰은 유효한 토큰이 아닙니다."),
    NOT_EXISTS_AUTHORIZATION(401, "A006", "Authorization Header가 없습니다."),
    NOT_MATCH_BEARER_GRANT_TYPE(401, "A007", "인증 타입이 Bearer 타입이 아닙니다."),

    // Common 오류들
    INTERNAL_SERVER_ERROR(500, "C004", "서버 에러 : 문의해주세요") ;


    private int status;
    private String errorCode;
    private String message;

}
