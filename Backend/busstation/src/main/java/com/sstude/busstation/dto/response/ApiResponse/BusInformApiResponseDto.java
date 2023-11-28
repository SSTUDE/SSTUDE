package com.sstude.busstation.dto.response.ApiResponse;

import com.sstude.busstation.dto.response.BusResponseDto;
import com.sstude.busstation.utils.ApiResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusInformApiResponseDto implements ApiResponseDto<BusInformApiResponseDto, BusResponseDto> {
    private Integer arrprevstationcnt;
    private Integer arrtime;

    private String nodeid;
    private String nodenm;

    private String routeid;
    private String routeno;
    private String routetp;
    private String vehicletp;

    private String arrmsg1; // 없어서 arrprevstationcnt에서 가져오기
    private Integer traTime1; // arrtime
    private String arsId; // nodeid
    private String stNm; // nodeNm

    private String busRouteId; // routeid
    private String rtNm; // routeNo
    private String routeType; // routetp
    private String busType1; // vehicletp

    @Override
    public List<BusInformApiResponseDto> _getItems() {
        return null;
    }

    @Builder
    public BusResponseDto of(BusInformApiResponseDto item) {

        Pattern pattern = Pattern.compile("\\[(\\d+)번째 전]");
        Matcher matcher = pattern.matcher(item.getArrmsg1());
        int number = 0;
        if (matcher.find()) {
            // 매칭된 첫 번째 그룹(숫자)을 추출하고 정수로 변환
            number = Integer.parseInt(matcher.group(1));
            System.out.println("추출된 숫자: " + number);
        } else {
            System.out.println("숫자를 찾을 수 없음");
        }

        return BusResponseDto.builder()
                .arrivalPrevStationCount(number)
                .arrivalTime(item.getTraTime1())
                .nodeId(item.getArsId())
                .nodeName(item.getStNm())
                .routeId(item.getBusRouteId())
                .routeNo(item.getRtNm())
                .routeType(item.getRouteType())
                .vehicleType(item.getBusType1())
                .build();
    }

//    @Builder
//    public BusResponseDto of(BusInformApiResponseDto item) {
//        return BusResponseDto.builder()
//                .arrivalPrevStationCount(item.getArrprevstationcnt())
//                .arrivalTime(item.getArrtime())
//                .nodeId(item.getNodeid())
//                .nodeName(item.getNodenm())
//                .routeId(item.getRouteid())
//                .routeNo(item.getRouteno())
//                .routeType(item.getRoutetp())
//                .vehicleType(item.getVehicletp())
//                .build();
//    }
}
