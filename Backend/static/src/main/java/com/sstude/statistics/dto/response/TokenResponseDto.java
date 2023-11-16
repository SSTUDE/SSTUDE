package com.sstude.statistics.dto.response;

import lombok.*;

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
