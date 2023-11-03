package com.sstude.statistics.controller;

import com.sstude.statistics.dto.request.StaticDayRequestDto;
import com.sstude.statistics.dto.response.ClothesDetailResponseDto;
import com.sstude.statistics.dto.response.ColorDetailResponseDto;
import com.sstude.statistics.service.BeautyService;
import com.sstude.statistics.service.StaticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/static")
public class StatisticsBeautyController {
        private final StaticService staticService;
        private final BeautyService beautyService;
//        private final JwtTokenProvider jwtTokenProvider;

        // 그날의 퍼스널컬러 조회
        @Operation(summary = "그날의 퍼스널컬러 디테일 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
        @PostMapping(value = "/beauty/detail")
//        public ResponseEntity<ColorDetailResponseDto> findByDayColor(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
//                , @RequestBody StaticDayRequestDto requestDto) {
        public ResponseEntity<ColorDetailResponseDto> findByDayColor(@RequestBody StaticDayRequestDto requestDto) {

//            Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
            Long memberId = 2L;
            ColorDetailResponseDto colorDetail = beautyService.getColorDetail(memberId, requestDto);
            return new ResponseEntity<>(colorDetail, HttpStatus.OK);
        }

        // 그날의 의상 조회
        @Operation(summary = "그날의 의상 디테일 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
        @PostMapping(value = "/clothes/detail")
//        public ResponseEntity<List<ClothesDetailResponseDto>> findByDayClothes(@RequestHeader("Authorization") @Parameter(hidden = true) final String token
//                , @RequestBody StaticDayRequestDto requestDto) {
        public ResponseEntity<List<ClothesDetailResponseDto>> findByDayClothes(@RequestBody StaticDayRequestDto requestDto) {
            Long memberId = 2L;
//            Long memberId = Long.valueOf(jwtTokenProvider.getAccount(token));
            List<ClothesDetailResponseDto> responseDtos = beautyService.getClothesDetail(memberId, requestDto);
            return new ResponseEntity<>(responseDtos, HttpStatus.OK);
        }

        // 퍼스널컬러 상세 조회

    }