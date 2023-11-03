package com.sstude.account.dto.response;

import lombok.*;

//재사용성 확장
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TokenResponseDto {
    private Long memberId;
    private String accessToken;
    private String refreshToken;
    private Long refreshTokenExpirationTime;
}
