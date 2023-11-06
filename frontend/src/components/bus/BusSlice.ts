import { BusState } from "./types";
import axios, { AxiosError } from "axios";
import { RootState } from "../../store/store";
import axiosToken from "../../apis/http-common";
import { BUS_API, REAL_TIME_BUS } from "../../apis/constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

//NOTE - gps 값 서버로 전달
export const sendGpsData = createAsyncThunk(
  "bus/sendGpsData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const gps = state.bus.gps;

    if (!gps) {
      return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");
    }

    try {
      // 서버에 전송할 GPS 데이터를 준비합니다.
      const body = {
        latitude: gps[0],
        longitude: gps[1],
      };

      // axiosToken 인스턴스를 사용하여 서버에 POST 요청을 보냅니다.
      const response = await axiosToken.post("/gps-endpoint", body);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(JSON.stringify(err.response?.data) || err.message);
    }
  }
);

//NOTE - TADA API 호출
const BUS_KEY = process.env.REACT_APP_BUS_KEY_IN;

export const fetchBusData = createAsyncThunk(
  "bus/fetchData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // getState의 반환 타입을 RootState로 캐스팅합니다.
    const gps = state.bus.gps;

    if (!gps) {
      return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");
    }

    try {
      const params = {
        serviceKey: BUS_KEY,
        cityCode: 25,
        nodeId: "DJB8001793",
      };

      const response = await axios.get(`${BUS_API}${REAL_TIME_BUS}`, {
        params,
      });
      // response.data가 문자열인지 확인하고, SERVICE_KEY_IS_NOT_REGISTERED_ERROR를 포함하는지 확인합니다.
      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      // 에러 응답이 문자열이 아닐 경우를 대비하여 JSON.stringify를 사용합니다.
      return rejectWithValue(JSON.stringify(err.response?.data) || err.message);
    }
  }
);

const initialState: BusState = {
  // stations: null,
  stations: [
    {
      "citycode": "37050",
      "gpslati": "36.10720185",
      "gpslong": "128.418282",
      "nodeid": "GMB383",
      "nodenm": "삼성전자후문",
      "nodeno": "10383"
    },
    {
      "citycode": "37390",
      "gpslati": "36.107202",
      "gpslong": "128.418282",
      "nodeid": "CGB383",
      "nodenm": "삼성전자후문",
      "nodeno": "10383"
    },
    {
      "citycode": "37390",
      "gpslati": "36.106965",
      "gpslong": "128.418984",
      "nodeid": "CGB704",
      "nodenm": "인동사거리",
      "nodeno": "10704"
    },
    {
      "citycode": "37050",
      "gpslati": "36.10588136",
      "gpslong": "128.4188821",
      "nodeid": "GMB771",
      "nodenm": "진미동행정복지센터앞",
      "nodeno": "10771"
    },
    {
      "citycode": "37390",
      "gpslati": "36.105881",
      "gpslong": "128.418882",
      "nodeid": "CGB771",
      "nodenm": "진미동주민센터",
      "nodeno": "10771"
    },
    {
      "citycode": "37390",
      "gpslati": "36.105877",
      "gpslong": "128.41933",
      "nodeid": "CGB772",
      "nodenm": "진미동주민센터",
      "nodeno": "10772"
    },
    {
      "citycode": "37050",
      "gpslati": "36.10587721",
      "gpslong": "128.4193304",
      "nodeid": "GMB772",
      "nodenm": "진미동행정복지센터건너",
      "nodeno": "10772"
    },
    {
      "citycode": "37390",
      "gpslati": "36.108109",
      "gpslong": "128.422248",
      "nodeid": "CGB708",
      "nodenm": "인동정류장",
      "nodeno": "10708"
    },
    {
      "citycode": "37050",
      "gpslati": "36.10810857",
      "gpslong": "128.4222485",
      "nodeid": "GMB708",
      "nodenm": "인동정류장(인동사거리방면)",
      "nodeno": "10708"
    }
  ],
  station: null,
  busData: null,
  loading: false,
  error: null,
  // gps: null,
  gps: [36.107, 128.417],
  // gps: [37.49648606, 127.02836155],
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    // GPS 상태를 업데이트하는 액션
    setGps: (state, action: PayloadAction<[number, number]>) => {
      state.gps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendGpsData에 대한 extraReducers를 추가합니다.
      .addCase(sendGpsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendGpsData.fulfilled, (state, action: PayloadAction<any>) => {
        state.stations = action.payload.stations;
        state.loading = false;
      })
      .addCase(sendGpsData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBusData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusData.fulfilled, (state, action: PayloadAction<any>) => {
        state.busData = action.payload;
        state.station = action.payload.stationNum;
        state.loading = false;
      })
      .addCase(fetchBusData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setGps } = busSlice.actions;

export default busSlice.reducer;
