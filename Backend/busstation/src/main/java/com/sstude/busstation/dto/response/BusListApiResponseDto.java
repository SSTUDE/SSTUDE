package com.sstude.busstation.dto.response;

import com.sstude.busstation.utils.ApiResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusListApiResponseDto implements ApiResponseDto<BusListApiResponseDto.Response.Body.Items.Item, BusResponseDto> {
    private Response response;


    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Header header;
        private Body body;

        @Getter
        @Builder
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Header {
            private String resultCode;
            private String resultMsg;
        }

        @Getter
        @Builder
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Body {
            private Items items;
            private Integer numOfRows;
            private Integer pageNo;
            private Integer totalCount;

            @Getter
            @Builder
            @NoArgsConstructor
            @AllArgsConstructor
            public static class Items {
                private List<Item> item;

                @Getter
                @Builder
                @NoArgsConstructor
                @AllArgsConstructor
                public static class Item {
                    private Integer arrprevstationcnt;
                    private Integer arrtime;

                    private String nodeid;
                    private String nodenm;

                    private String routeid;
                    private String routeno;
                    private String routetp;
                    private String vehicletp;
                }
            }
        }
    }

    @Override
    public List<Response.Body.Items.Item> _getItems() {
        Response.Body.Items items = this.getResponse().getBody().getItems();
        if (items == null || items.getItem() == null) {
            return Collections.emptyList(); // Return an empty list if 'items' or 'item' is null
        }
        return items.getItem();
    }

    @Override
    public BusResponseDto of(Response.Body.Items.Item item) {
        return BusResponseDto.builder()
                .arrivalPrevStationCount(item.getArrprevstationcnt())
                .arrivalTime(item.getArrtime())
                .nodeId(item.getNodeid())
                .nodeName(item.getNodenm())
                .routeId(item.getRouteid())
                .routeNo(item.getRouteno())
                .routeType(item.getRoutetp())
                .vehicleType(item.getVehicletp())
                .build();
    }
}
