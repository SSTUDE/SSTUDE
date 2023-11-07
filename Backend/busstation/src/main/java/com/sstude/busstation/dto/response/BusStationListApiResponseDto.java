package com.sstude.busstation.dto.response;

import com.sstude.busstation.utils.ApiResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusStationListApiResponseDto implements ApiResponseDto<BusStationListApiResponseDto.Response.Body.Items.Item, BusStationResponseDto> {
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
                    private Integer citycode;
                    private String gpslati;
                    private String gpslong;
                    private String nodeid;
                    private String nodenm;
                    private Integer nodeno;
                }
            }
        }
    }

    @Override
    public List<Response.Body.Items.Item> _getItems() {
        // 위와 같이 해당 DTO 구조에 맞게 구현
        return this.getResponse().getBody().getItems().getItem();
    }

    @Override
    public BusStationResponseDto of(Response.Body.Items.Item item) {
        return BusStationResponseDto.builder()
                            .cityCode(item.getCitycode())
                            .latitude(item.getGpslati())
                            .longitude(item.getGpslong())
                            .nodeName(item.getNodenm())
                            .nodeId(item.getNodeid())
                            .nodeNo(item.getNodeno())
                            .build();
    }
}
