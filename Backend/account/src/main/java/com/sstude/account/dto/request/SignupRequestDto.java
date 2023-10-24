package com.sstude.account.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private Long memberId;
    private String deviceNum;
}
