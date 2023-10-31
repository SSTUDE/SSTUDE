package com.sstude.statistics.controller;

import com.sstude.statistics.dto.request.StaticDayRequestDto;
import com.sstude.statistics.dto.response.ColorDetailResponseDto;
import com.sstude.statistics.global.jwt.JwtTokenProvider;
import com.sstude.statistics.service.BeautyService;
import com.sstude.statistics.service.StaticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/static")
public class StatisticsBeautyController {
        private final StaticService staticService;
        private final BeautyService beautyService;
        private final JwtTokenProvider jwtTokenProvider;

        // 상세 뷰티 디테일 제공
        @Operation(summary = "그날의 퍼스널컬러 디테일 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
        @PostMapping(value = "/beauty/detail")
        public ResponseEntity<ColorDetailResponseDto> findByDayColor(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
                , @RequestBody StaticDayRequestDto requestDto) {

            Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
            ColorDetailResponseDto colorDetail = beautyService.getColorDetail(memberId, requestDto);
            return new ResponseEntity<>(colorDetail, HttpStatus.OK);
        }

        // 상세 의상 디테일 제공
//        @Operation(summary = "그날의 의상 디테일 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
//        @PostMapping(value = "/clothes/detail")
//        public ResponseEntity<StaticAllResponseDto> findByDayClothes(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
//                ,@RequestBody StaticMonthRequestDto requestDto) {
//
//            // 유저 정보 가져오기 - DB 연결을 어떻게 하지?member 회원가입을 하면, 모든 member테이블에 데이터가 insert되는건가??
//            Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
//            StaticAllResponseDto responseDtos = staticService.findAllDesc(memberId, requestDto);
//            return new ResponseEntity<>(responseDtos, HttpStatus.OK);
//        }

        // 퍼스널컬러 상세정보 제공
//        @Operation(summary = "그날의 퍼스널컬러 디테일 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
//        @PostMapping(value = "/detail")
//        public ResponseEntity<ColorDetailResponseDto> findByDayColor(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
//                , @RequestBody StaticDayRequestDto requestDto) {
//
//            Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
//            ColorDetailResponseDto colorDetail = beautyService.getColorDetail(memberId, requestDto);
//            return new ResponseEntity<>(colorDetail, HttpStatus.OK);
//        }

    }