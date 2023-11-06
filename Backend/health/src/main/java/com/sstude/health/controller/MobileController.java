package com.sstude.health.controller;

import com.sstude.health.dto.request.MobileRequestDto;
import com.sstude.health.dto.response.MobileResponseDto;
import com.sstude.health.service.MobileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Mobile", description = "삼성 헬스 연동을 위한 모바일 연동")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mobile")
public class MobileController {
    private final MobileService mobileService;

    @PostMapping("/regist")
    public ResponseEntity<?> regist(@RequestBody MobileRequestDto request){
        MobileResponseDto response = mobileService.regist(request.getCertification());
        return ResponseEntity.ok(response);
    }
}
