package com.sstude.busstation.entity;

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

    private Integer arrivalPrevStationCount;
    private Integer arrivalTime;

    private String nodeId;
    private String nodeName;

    private String routeId;
    private String routeNo;
    private String routeType;
    private String vehicleType;

    @Builder
    public Bus(Long id, Long memberId, Integer arrivalPrevStationCount, Integer arrivalTime, String nodeId, String nodeName, String routeId, String routeNo, String routeType, String vehicleType) {
        this.id = id;
        this.memberId = memberId;
        this.arrivalPrevStationCount = arrivalPrevStationCount;
        this.arrivalTime = arrivalTime;
        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.routeId = routeId;
        this.routeNo = routeNo;
        this.routeType = routeType;
        this.vehicleType = vehicleType;
    }
}
