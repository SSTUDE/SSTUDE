package com.sstude.busstation.entity;

import com.sstude.busstation.dto.response.BusStationResponseDto;
import com.sstude.busstation.dto.response.SeoulBusStationResponseDto;
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
@Entity(name = "station")
public class BusStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long memberId;

    private Integer cityCode;
    private String latitude;
    private String longitude;
    private String nodeId;
    private String nodeName;
    private Integer nodeNo;

    @Builder
    public BusStation(Long id, Long memberId, Integer cityCode, String latitude, String longitude, String nodeId, String nodeName, Integer nodeNo) {
        this.id = id;
        this.memberId = memberId;
        this.cityCode = cityCode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.nodeNo = nodeNo;
    }

    public static BusStation toEntity(Long memberId, SeoulBusStationResponseDto dto){
        return BusStation.builder()
                .memberId(memberId)
                .cityCode(dto.getCityCode())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .nodeId(dto.getNodeId())
                .nodeName(dto.getNodeName())
                .nodeNo(dto.getNodeNo())
                .build();
    }

//    public static BusStation toEntity(Long memberId, BusStationResponseDto dto){
//        return BusStation.builder()
//                .memberId(memberId)
//                .cityCode(dto.getCityCode())
//                .latitude(dto.getLatitude())
//                .longitude(dto.getLongitude())
//                .nodeId(dto.getNodeId())
//                .nodeName(dto.getNodeName())
//                .nodeNo(dto.getNodeNo())
//                .build();
//    }
}
