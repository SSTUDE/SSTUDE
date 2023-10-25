package com.sstude.account.dto.response;

import com.sstude.account.entity.Account;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupResponseDto {
    private Long memberId;

    public SignupResponseDto(Account account) {
        this.memberId = account.getMemberId();
    }
}
