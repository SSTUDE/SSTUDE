package com.sstude.busstation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusListApiResponseDto {
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
                    private String gpslati; // gpslati가 숫자 형태로 되어 있으므로 Double로 바꿔줍니다.
                    private String gpslong; // gpslong도 숫자 형태로 되어 있으므로 Double로 바꿔줍니다.
                    private String nodeid;
                    private String nodenm;
                    private Integer nodeno;
                }
            }
        }
    }
}
