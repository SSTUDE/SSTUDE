package com.sstude.health.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MobileResponseDto {
    private Long memberId;
    private boolean status;
    private String accessToken;
    private String refreshToken;
    private Long refreshTokenExpirationTime;
}
