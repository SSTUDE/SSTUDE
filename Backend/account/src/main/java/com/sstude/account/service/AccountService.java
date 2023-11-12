package com.sstude.account.service;

import com.sstude.account.dto.request.AccountRequestDto;
import com.sstude.account.dto.response.TokenResponseDto;
import com.sstude.account.entity.Account;
import com.sstude.account.global.error.BusinessException;
import com.sstude.account.global.error.ErrorCode;
import com.sstude.account.global.jwt.JwtTokenProvider;
import com.sstude.account.repository.AccountRepository;
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
public class AccountService {
    private final AccountRepository accountRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Transactional
    public Account signUp(AccountRequestDto signupRequestDto) {
        if (accountRepository.existsByDeviceNum(signupRequestDto.getDeviceNum())) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }

        // 새 계정 생성
        Account account = Account.builder()
                .deviceNum(signupRequestDto.getDeviceNum())
                .build();

        account = accountRepository.save(account);
        return account;
    }

    @Transactional
    public TokenResponseDto login(AccountRequestDto loginRequestDto) {
        Optional<Account> optionalAccount = accountRepository.findByDeviceNum(loginRequestDto.getDeviceNum());

        //일치하는 회원이 없을경우
        if (!optionalAccount.isPresent()) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
        }

        Account account = optionalAccount.get();
        return createToken(account);
    }


    @Transactional
    public TokenResponseDto retoken(Long memberId){
        Optional<Account> optionalAccount = accountRepository.findByMemberId(memberId);

        //일치하는 회원이 없을경우
        if (!optionalAccount.isPresent()) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_EXISTS);
        }

        Account account = optionalAccount.get();
        return createToken(account);
    }


    @Transactional
    public TokenResponseDto createToken(Account account){
        TokenResponseDto response = jwtTokenProvider.generateToken(account);
        stringRedisTemplate.opsForValue()
                .set("RT:" + response.getAccessToken(), response.getRefreshToken(), response.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return response;
    }



}
