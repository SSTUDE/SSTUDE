package com.sstude.busstation.entity;

import com.sstude.busstation.dto.response.BusInformByStationResponseDto;
import com.sstude.busstation.dto.response.BusResponseDto;
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
@Entity(name = "bus")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long memberId;

//    private Integer arrivalPrevStationCount;
//    private Integer arrivalTime;
//
//    private String nodeId;
//    private String nodeName;
//
//    private String routeId;
//    private String routeNo;
//    private String routeType;
//    private String vehicleType;

    private String routeId;
    private String routeNo;
    private String routeType;

    private String startNodeNum;
    private String endNodeNum;

    private Boolean status;

    @Builder
    public Bus(Long id, Long memberId, String routeId, String routeNo, String routeType,
               String startNodeNum, String endNodeNum) {
        this.id = id;
        this.memberId = memberId;
        this.routeId = routeId;
        this.routeNo = routeNo;
        this.routeType = routeType;
        this.startNodeNum = startNodeNum;
        this.endNodeNum = endNodeNum;
    }

    public static Bus toEntity(Long memberId, BusInformByStationResponseDto dto){
        return Bus.builder()
                .memberId(memberId)
                .routeId(dto.getRouteId())
                .routeNo(dto.getRouteNo())
                .routeType(dto.getRouteType())
                .startNodeNum(dto.getStartNodeNum())
                .endNodeNum(dto.getEndNodeNum())
                .build();
    }
}
