package com.sstude.gateway.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sstude.gateway.global.error.BusinessException;
import com.sstude.gateway.global.error.ErrorCode;
import com.sstude.gateway.global.error.ErrorResponse;
import com.sstude.gateway.global.jwt.JwtTokenProvider;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.springframework.http.MediaType;

import java.nio.charset.StandardCharsets;


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
                try {
                    if (ObjectUtils.isEmpty(refreshToken)) {
                        throw new BusinessException(ErrorCode.REFRESH_TOKEN_EXPIRED);
                    } else {
                         if (!jwtTokenProvider.validateToken(accessToken,"ace")) {
                            throw new BusinessException(ErrorCode.ACCESS_TOKEN_EXPIRED);
                        }
                    }
                    return chain.filter(exchange);
                } catch (BusinessException ex) {
                    return handleException(ex, exchange);
                }
            } else {
                return handleException(new BusinessException(ErrorCode.NOT_ACCESS_TOKEN), exchange);
            }
        });
    }

    private Mono<Void> handleException(Exception ex, ServerWebExchange exchange) {
        if (ex instanceof BusinessException) {
            BusinessException businessException = (BusinessException) ex;
            ErrorCode errorCode = businessException.getErrorCode();
            ErrorResponse errorResponse = new ErrorResponse(errorCode);

            // ObjectMapper를 사용하여 ErrorResponse를 JSON으로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String json;
            try {
                json = objectMapper.writeValueAsString(errorResponse);
            } catch (JsonProcessingException e) {
                json = "{}";
            }

            byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);

            // Content-Type 헤더 설정
            exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

            exchange.getResponse().setStatusCode(HttpStatus.valueOf(errorCode.getStatus()));
            return exchange.getResponse().writeWith(Mono.just(buffer));
        }
        return Mono.error(ex);
    }


    @Getter
    @Setter
    public static class Config {

    }

}
