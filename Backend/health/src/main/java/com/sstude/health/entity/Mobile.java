package com.sstude.health.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Setter
@Entity(name = "mobiles")
public class Mobile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private String certification;
    private boolean status;

    @Builder
    public Mobile(Long id, Long memberId, String certification, boolean status) {
        this.id = id;
        this.memberId = memberId;
        this.certification = certification;
        this.status = status;
    }
}
