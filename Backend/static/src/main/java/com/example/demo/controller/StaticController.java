package com.example.demo.controller;


import com.example.demo.dto.response.StaticAllResponseDto;
import com.example.demo.service.BeautyService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/static/makeup")
public class StaticController {
    private final BeautyService beautyService;

    // 전체 통계리스트 제공
    @Operation(summary = "여행 전체 리스트 조회", description = "요청 시, 해당 달의 모든 운동, 뷰티 체크 여부를 전달합니다. ")
    @PostMapping(value = "/list")
    public ResponseEntity<StaticAllResponseDto> findAllByMonth() {

        // 유저 정보 가져오기 - 어떻게??
        int userid = 1;

        StaticAllResponseDto responseDtos = beautyService.findAllDesc(userid);
        return new ResponseEntity<>(responseDtos, HttpStatus.OK);
    }

    // 상세 뷰티 디테일 제공
}
