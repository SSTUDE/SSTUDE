//package com.sstude.statistics.global.jwt;
//
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.StringRedisTemplate;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//
//@Slf4j
//@Component
//public class JwtTokenProvider {
//
//    private final Key key;
//    private final StringRedisTemplate stringRedisTemplate; // Redis 연동을 위한 객체
//
//    private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;            // 30분
//    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일
//
////    private static final long ACCESS_TOKEN_EXPIRE_TIME =  60 * 1000L;            // 1분
////    private static final long REFRESH_TOKEN_EXPIRE_TIME = 5 * 60 * 1000L;    // 2분
//
//    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, StringRedisTemplate stringRedisTemplate) {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
//        this.stringRedisTemplate = stringRedisTemplate; // Redis 연동 객체 초기화
//    }
//
//
//
//    public String getAccount(String accessToken) {
//        checkLength(accessToken);
//        String token = accessToken.substring(7);
//        return Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//
//    public void checkLength(String token){
//        if(token.length() < 7) throw new JwtException("올바르지 않은 토큰 유형입니다.");
//    }
//
//}
