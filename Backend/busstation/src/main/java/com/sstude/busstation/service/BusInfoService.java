package com.sstude.busstation.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sstude.busstation.dto.request.GpsRequestDto;
import com.sstude.busstation.dto.request.SaveBusRequestDto;
import com.sstude.busstation.dto.request.SaveBusStationRequestDto;
import com.sstude.busstation.dto.request.StationRequestDto;
import com.sstude.busstation.dto.response.*;
import com.sstude.busstation.dto.response.ApiResponse.BusInformApiResponseDto;
import com.sstude.busstation.dto.response.ApiResponse.BusInformByStationApiResponseDto;
import com.sstude.busstation.dto.response.ApiResponse.BusStationApiResponseDto;
import com.sstude.busstation.entity.Bus;
import com.sstude.busstation.entity.BusStation;
import com.sstude.busstation.global.error.BusinessException;
import com.sstude.busstation.global.error.ErrorCode;
import com.sstude.busstation.repository.BusRepository;
import com.sstude.busstation.repository.BusStationRepository;
import com.sstude.busstation.utils.ApiResponseDto;
import com.sstude.busstation.utils.MapFiller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class BusInfoService {

    @Value("${spring.data.bus.secret}")
    private String secretKey;

    @Value("${spring.data.bus.station_inform_api}")
    private String station_inform_api;

    @Value("${spring.data.bus.bus_arrival_inform_api}")
    private String bus_arrival_inform_api;

    @Value("${spring.data.bus.station_bus_route_api}")
    private String station_bus_route_api;


    private final ObjectMapper objectMapper;
    private final BusRepository busRepository;
    private final BusStationRepository busStationRepository;

    @Transactional
    public List<BusStationResponseDto> findBusStationListInform(GpsRequestDto gpsInform, Long memberId){

        Map<String, String> hashMap = buildHashMap(gpsInform, (map, dto) -> {
            map.put("gpsLati", dto.getLatitude());
            map.put("gpsLong", dto.getLongitude());
            map.put("numOfRows", dto.getNumOfRows());
        });

        String jsonResponse = apiService(station_inform_api, hashMap);

        List<BusStationResponseDto> responseDto = parseResponse(jsonResponse, BusStationApiResponseDto.class);

        return responseDto;
    }

    @Transactional
    public String saveBusStationInform(Long memberId, SaveBusStationRequestDto busStationsDto){

        List<BusStationResponseDto> busStationList = busStationsDto.getBusStations();



        List<BusStation> busStations = busStationList.stream()
                .map(dto -> {
                    log.info("버스 정보 인풋 정보 조회" + dto.getCityCode());
                    BusStation X = BusStation.toEntity(memberId, dto);
                    log.info("버스 정보 아웃풋 정보 조회" + X.getCityCode());
                    return X;
                })
                .collect(Collectors.toList());

        busStationRepository.saveAll(busStations);

        return "Save Bus Stations";
    }

    @Transactional
    public List<BusStationResponseDto> loadBusStationInform(Long memberId){

        List<BusStation> busStations = busStationRepository.findBusStationsByMemberId(memberId);

        List<BusStationResponseDto> busStationsList = busStations.stream()
                .map(BusStationResponseDto::toDto)
                .collect(Collectors.toList());

        return busStationsList;
    }

// ==================================================

    @Transactional
    public List<BusResponseDto> findBusListInform(StationRequestDto stationInform,Long memberId){

        Map<String, String> hashMap = buildHashMap(stationInform, (map, dto) -> {
            map.put("cityCode", dto.getCityCode());
            map.put("nodeId", dto.getNodeId());
            map.put("numOfRows", dto.getNumOfRows());
        });

        String jsonResponse = apiService(bus_arrival_inform_api, hashMap);

        List<BusResponseDto> responseDto = parseResponse(jsonResponse, BusInformApiResponseDto.class);

        return responseDto;
    }


// ==================================================
    @Transactional
    public List<BusInformByStationResponseDto> findBusListAtStation(StationRequestDto stationInform,Long memberId){

        Map<String, String> hashMap = buildHashMap(stationInform, (map, dto) -> {
            map.put("cityCode", dto.getCityCode());
            map.put("nodeid", dto.getNodeId());
            map.put("numOfRows", dto.getNumOfRows());
        });

        String jsonResponse = apiService(station_bus_route_api, hashMap);

        List<BusInformByStationResponseDto> responseDto = parseResponse(jsonResponse, BusInformByStationApiResponseDto.class);

        List<Bus> buses = responseDto.stream()
                .map(dto -> Bus.toEntity(memberId, dto))
                .collect(Collectors.toList());

        busRepository.saveAll(buses);

        return responseDto;
    }

    @Transactional
    public String saveBusListAtStation(Long memberId, SaveBusRequestDto saveBusRequestDto){
        List<BusInformByStationResponseDto> busesList = saveBusRequestDto.getBuses();

        List<Bus> buses = busesList.stream()
                .map(dto -> Bus.toEntity(memberId, dto))
                .collect(Collectors.toList());

        busRepository.saveAll(buses);

        return "Save Bus Stations";
    }

    @Transactional
    public List<BusInformByStationResponseDto> loadBusListAtStation(Long memberId){

        List<Bus> busStations = busRepository.findBusesByMemberId(memberId);

        List<BusInformByStationResponseDto> busesList = busStations.stream()
                .map(BusInformByStationResponseDto::toDto)
                .collect(Collectors.toList());

        return busesList;
    }
// ================================
    private JSONParser parser = new JSONParser();
    private String[] jsonFindPath = new String[]{"response", "body", "items"};
    private String arrayPath = "item";

    private <T extends ApiResponseDto<T, R>, R> List<R> parseResponse(String jsonResponse, Class<T> responseApiDtoClass) {
        try {
            T responseDto = responseApiDtoClass.getDeclaredConstructor().newInstance();


            // Json 정보 파싱
            JSONObject jsonObject = (JSONObject) parser.parse(jsonResponse);

            JSONObject intermediate = getJsonObject(jsonObject, jsonFindPath);

            JSONArray jsonArray = getJsonArray(intermediate);

            List<T> itemList = new ArrayList<>();

            for (Object element : jsonArray){
                JSONObject itemJson = (JSONObject) element;

                // JSONObject를 JSON 문자열로 변환
                String json = itemJson.toString();

                // JSON 문자열을 T 클래스의 인스턴스로 변환
                T test = objectMapper.readValue(json, responseApiDtoClass);

                itemList.add(test);
            }

            List<R> responseInforms = itemList.stream()
                    .map(responseDto::of)
                    .collect(Collectors.toList());

            return responseInforms;

        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private JSONObject getJsonObject(JSONObject jsonObject, String[] keyArray) {

        if(keyArray != null){
            for(String key : keyArray){
                try{
                    jsonObject = (JSONObject) jsonObject.get(key);
                }catch (Exception e){
                    return new JSONObject();
                }

            }
        }
        return jsonObject;
    }

    private JSONArray getJsonArray(JSONObject object) {
        Object obj = object.get(arrayPath);

        // obj가 이미 JSONArray인 경우 그대로 반환합니다.
        if (obj instanceof JSONArray) {
            return (JSONArray) obj;
        }

        // obj가 JSONObject 혹은 기타 다른 데이터 타입인 경우, 이를 JSONArray에 포함시켜 반환합니다.
        JSONArray jsonArray = new JSONArray();
        if (obj != null) {
            jsonArray.add(obj);
        }

        return jsonArray;
    }

    private String apiService(String uri, Map<String, String> queryParams) {
        RestTemplate restTemplate = new RestTemplate();

        // uri 생성
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(uri);

        String query = buildQuery(queryParams);


        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.ACCEPT, "application/json");

        // 헤더 삽입
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // URL 생성하기
        URI apiUrl = URI.create(uriBuilder.toUriString() + "?" + query);

        // http 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);

        // 로그 체크
        log.info("Request URL = " + apiUrl.toString());

        // Return the body of the response.
        return response.getBody();
    }

    private static String buildQuery(Map<String, String> params) {

        StringBuilder result = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (result.length() > 0) {
                result.append("&");
            }
            result.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
        }
        return result.toString();
    }

    private <T> Map<String, String> buildHashMap(T requestDto, MapFiller<T> filler){
        Map<String, String> params = new HashMap<>();
        // 기본 옵션
        params.put("serviceKey", secretKey);
        params.put("pageNo", "1");
        params.put("_type", "json");

        // DTO에 맞게 옵션을 추가하는 로직
        // Filler의 interface 를 활용해 Type에 맞는 DTO의 정보를 가져올 수 있게 함
        // 윗단에서 람다를 사용할 예정
        filler.fill(params, requestDto);
        return params;
    }

    }
