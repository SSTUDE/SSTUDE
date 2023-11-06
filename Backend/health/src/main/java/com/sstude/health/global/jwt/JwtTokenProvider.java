package com.sstude.health.global.jwt;


import com.sstude.health.dto.response.MobileResponseDto;
import com.sstude.health.entity.Mobile;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;


@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;
    private final StringRedisTemplate stringRedisTemplate; // Redis 연동을 위한 객체

    private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;            // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, StringRedisTemplate stringRedisTemplate) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.stringRedisTemplate = stringRedisTemplate; // Redis 연동 객체 초기화
    }


    public String getMember(String accessToken) {
        checkLength(accessToken);
        String token = accessToken.substring(7);
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    public MobileResponseDto generateToken(Mobile mobile) {
        long now = (new Date()).getTime();

        // Access Token 생성
        String accessToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setHeaderParam("typ","JWT")
                .setSubject(mobile.getMemberId().toString())
                .setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setHeaderParam("typ","JWT")
                .setSubject(mobile.getMemberId().toString())
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .compact();


        return MobileResponseDto.builder()
                .memberId(mobile.getMemberId())
                .status(true)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }


    public void checkLength(String token){
        if(token.length() < 7) throw new JwtException("올바르지 않은 토큰 유형입니다.");
    }

}
