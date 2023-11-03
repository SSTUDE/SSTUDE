package com.sstude.gateway.global.error;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ErrorResponse {
    private int status;
    private String message;
    private String code;

    public ErrorResponse(ErrorCode errorCode){
        this.status = errorCode.getStatus();
        this.message = errorCode.getMessage();
        this.code = errorCode.getErrorCode();
    }

    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // 객체를 JSON 문자열로 변환
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            // 변환에 실패했을 때는 기본 toString 메서드를 사용
            return super.toString();
        }
    }

}