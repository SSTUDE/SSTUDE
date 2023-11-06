package com.sstude.health.service;

import com.sstude.health.dto.response.MobileResponseDto;
import com.sstude.health.entity.Mobile;
import com.sstude.health.global.error.BusinessException;
import com.sstude.health.global.error.ErrorCode;
import com.sstude.health.global.jwt.JwtTokenProvider;
import com.sstude.health.repository.MobileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class MobileService {
    private final MobileRepository mobileRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Transactional
    public MobileResponseDto regist(String certification){
        Optional<Mobile> optionalMobile = mobileRepository.findByCertification(certification);

        // 해당하는 certification이 없으면 BusinessException을 발생
        if (!optionalMobile.isPresent()) {
            throw new BusinessException(ErrorCode.CERTIFICATION_NOT_EXISTS);
        }

        Mobile mobile = optionalMobile.get();

        return createToken(mobile);
    }

    public MobileResponseDto createToken(Mobile mobile){
        MobileResponseDto response = jwtTokenProvider.generateToken(mobile);
        stringRedisTemplate.opsForValue()
                .set("RT:" + response.getAccessToken(), response.getRefreshToken(), response.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return response;
    }

    @Transactional
    public MobileResponseDto retoken(Long memberId){
        Optional<Mobile> optionalMobile = mobileRepository.findByMemberId(memberId);

        if (!optionalMobile.isPresent()) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
        }
        Mobile mobile = optionalMobile.get();

        return createToken(mobile);
    }
}
