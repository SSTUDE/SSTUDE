package com.sstude.account.service;

import com.sstude.account.dto.request.SignupRequestDto;
import com.sstude.account.entity.Account;
import com.sstude.account.global.error.BusinessException;
import com.sstude.account.global.error.ErrorCode;
import com.sstude.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    @Transactional
    public Account signUp(SignupRequestDto signupRequestDto) {
        if (accountRepository.existsByDeviceNum(signupRequestDto.getDeviceNum())) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }

        Account account = Account.builder()
                .deviceNum(signupRequestDto.getDeviceNum())
                .build();

        account = accountRepository.save(account);
        return account;
    }


}
