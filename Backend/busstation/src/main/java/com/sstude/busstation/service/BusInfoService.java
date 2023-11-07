package com.sstude.busstation.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sstude.busstation.dto.request.BusGpsRequestDto;
import com.sstude.busstation.dto.response.BusListApiResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
import com.sstude.busstation.global.error.BusinessException;
import com.sstude.busstation.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
public class BusInfoService {

    @Value("${spring.data.bus.secret}")
    private String secretKey;

    @Value("${spring.data.bus.station_inform_api}")
    private String station_inform_api;

    private final ObjectMapper objectMapper;

    public List<BusResponseDto> findBusListInform(BusGpsRequestDto gpsInform){

        Map<String, String> hashMap = buildHashMap(gpsInform);

//        String query = buildQuery(hashMap);
        String jsonResponse = apiService(station_inform_api, hashMap);
        log.info("API Response: {}", jsonResponse);

        List<BusResponseDto> responseDto = parseResponse(jsonResponse);

        return responseDto;
    }

    private List<BusResponseDto> parseResponse(String jsonResponse) {
        try {
            log.info("1");
            BusListApiResponseDto apiResponse = objectMapper.readValue(jsonResponse, BusListApiResponseDto.class);
            log.info("2");
            List<BusListApiResponseDto.Response.Body.Items.Item> busStationInforms = apiResponse.getResponse().getBody().getItems().getItem();  // 첫 번째 아이템만 가져옵니다.
            log.info("3");

            return busStationInforms.stream().map(
                    station_inform
                            -> BusResponseDto.builder()
                            .cityCode(station_inform.getCitycode())
                            .latitude(station_inform.getGpslati())
                            .longitude(station_inform.getGpslong())
                            .nodeName(station_inform.getNodenm())
                            .nodeId(station_inform.getNodeid())
                            .nodeNo(station_inform.getNodeno())
                            .build()
            ).toList();

        } catch (JsonProcessingException e) {
            System.out.println(e);
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private String apiService(String uri, Map<String, String> queryParams) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(uri);
        for (Map.Entry<String, String> entry : queryParams.entrySet()) {
            uriBuilder.queryParam(entry.getKey(), entry.getValue());
        }

        // URI 객체로 변환
        URI apiUrl = uriBuilder.build().toUri();
        log.info("사랑해요 " + apiUrl);
        return restTemplate.getForObject(apiUrl, String.class);
    }

//    private static String buildQuery(Map<String, String> params) {
//        StringBuilder result = new StringBuilder();
//        for (Map.Entry<String, String> entry : params.entrySet()) {
//            if (result.length() > 0) {
//                result.append("&");
//            }
//            result.append(entry.getKey());
//            result.append("=");
//            result.append(entry.getValue());
//        }
//        return result.toString();
//    }

    private Map<String, String> buildHashMap(BusGpsRequestDto gpsInform){
        Map<String, String> params = new HashMap<>();
        params.put("serviceKey", secretKey);
        params.put("pageNo", "1");
        params.put("numOfRows", "10");
        params.put("_type", "json");
        params.put("gpsLati", gpsInform.getLatitude());
        params.put("gpsLong", gpsInform.getLongitude());
        return params;
    }
}
