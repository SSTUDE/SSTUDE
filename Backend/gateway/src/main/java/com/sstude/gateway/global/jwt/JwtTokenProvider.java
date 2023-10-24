package com.sstude.gateway.global.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String resolveToken(ServerHttpRequest request) {
        HttpHeaders requestHeader = request.getHeaders();
        String accessToken = requestHeader.get(AUTHORIZATION_HEADER).get(0);

        if (StringUtils.hasText(accessToken) && accessToken.startsWith(BEARER_TYPE)) {
            return accessToken.substring(7);
        }
        return null;
    }


    public boolean validateToken(String token,String tokenType) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
