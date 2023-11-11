package com.sstude.account.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupResponseDto {
    private Long memberId;

    public SignupResponseDto(Long memberId) {
        this.memberId = memberId;
    }
}
