package com.sstude.gateway.filter;

import com.sstude.gateway.global.error.BusinessException;
import com.sstude.gateway.global.error.ErrorCode;
import com.sstude.gateway.global.jwt.JwtTokenProvider;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;


@Slf4j
@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    public AuthenticationFilter(JwtTokenProvider jwtTokenProvider, StringRedisTemplate stringRedisTemplate) {
        super(Config.class);
        this.jwtTokenProvider = jwtTokenProvider;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            // RequestHeader에서 jwt 토큰 추출
            String accessToken = jwtTokenProvider.resolveToken(request);

            // 토큰의 유효성 검사
            if (accessToken != null) {
                String refreshToken = stringRedisTemplate.opsForValue().get("RT:"+accessToken);

                if (!ObjectUtils.isEmpty(refreshToken)) {
                    if (!jwtTokenProvider.validateToken(refreshToken,"ref")) {
                        throw new BusinessException(ErrorCode.REFRESH_TOKEN_EXPIRED);
                    } else if (!jwtTokenProvider.validateToken(accessToken,"ace")) {
                        throw new BusinessException(ErrorCode.ACCESS_TOKEN_EXPIRED);
                    }
                } else {
                    throw new BusinessException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
                }
                return chain.filter(exchange);
            } else {
                throw new BusinessException(ErrorCode.NOT_ACCESS_TOKEN);
            }
        });
    }

    @Getter
    @Setter
    public static class Config {

    }

}
