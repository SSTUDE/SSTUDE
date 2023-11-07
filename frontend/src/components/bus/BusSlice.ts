import axios, { AxiosError } from "axios";
import { RootState } from "../../store/store";
import axiosToken from "../../apis/http-common";
import { BusState, busStops } from "./types";
import { BUS_API, REAL_TIME_BUS, FIND_BUS } from "../../apis/constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

//NOTE - gps 값 서버로 전달
export const gpsToServer = createAsyncThunk(
  "bus/gpsToServer",
  async (_, { getState, rejectWithValue }) => {
    console.log("서버에 GPS값 보내서 근처 정류장들 받아온다");

    const state = getState() as RootState;
    const gps = state.bus.gps;

    if (!gps) {
      return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");
    }

    try {
      const body = {
        latitude: gps[0],
        longitude: gps[1],
      };

      const response = await axiosToken.post("/gps-endpoint", body);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(JSON.stringify(err.response?.data) || err.message);
    }
  }
);

//NOTE - TADA API 버스 정거장 리스트 호출
const BUS_KEY = process.env.REACT_APP_BUS_KEY_DE;

export const tadaBusStop = createAsyncThunk(
  "bus/tadaBusStop",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const gps = state.bus.gps;

    if (!gps) {
      return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");
    }

    try {
      const params = {
        serviceKey: BUS_KEY,
        gpsLati: gps[0],
        gpsLong: gps[1],
      };

      const response = await axios.get(`${BUS_API}${REAL_TIME_BUS}`, {
        params,
      });

      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(JSON.stringify(err.response?.data) || err.message);
    }
  }
);

//NOTE - 선택한 정거장 서버로 전송
export const busStopToServer = createAsyncThunk(
  "bus/busStopToServer",
  async (selectedStation: busStops, { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/selected-station-endpoint", {
        citycode: selectedStation.citycode,
        gpslati: selectedStation.gpslati,
        gpslong: selectedStation.gpslong,
        nodeid: selectedStation.nodeid,
        nodenm: selectedStation.nodenm,
        nodeno: selectedStation.nodeno,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

//NOTE - TADA API 버스 정거장 경유하는 버스 리스트 호출
export const tadaBusList = createAsyncThunk(
  "bus/tadaBusList",
  async (selectedStation: busStops, { rejectWithValue }) => {
    console.log('버스 리스트 가져올게~')
    if (!selectedStation) {
      return rejectWithValue("선택된 정거장이 없습니다.");
    }
    try {
      const params = {
        serviceKey: BUS_KEY,
        cityCode: selectedStation.citycode, 
        nodeId: selectedStation.nodeid, 
      };
      const response = await axios.get(`${BUS_API}${FIND_BUS}`, { params });
      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(JSON.stringify(err.response?.data) || err.message);
    }
  }
);

const initialState: BusState = {
  // gps: null,
  gps: [36.107, 128.417],
  // gps: [37.49648606, 127.02836155],
  busStops: null,
  busStop: null,
  loading: false,
  error: null,
  busList: null,
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setGps: (state, action: PayloadAction<[number, number]>) => {
      state.gps = action.payload;

      if (state.busStops) {
        const uniqueNodeIds = new Set();
        const filteredStations = state.busStops.filter((station: busStops) => {
          const isDuplicate = uniqueNodeIds.has(station.nodeid);
          uniqueNodeIds.add(station.nodeid);
          return !isDuplicate;
        });

        state.busStops = filteredStations;
      }
    },
    setBusStop: (state, action: PayloadAction<busStops | null>) => {
      state.busStop = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gpsToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gpsToServer.fulfilled, (state, action: PayloadAction<any>) => {
        state.busStops = action.payload.busStops;
        state.loading = false;
      })
      .addCase(gpsToServer.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(tadaBusStop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tadaBusStop.fulfilled, (state, action: PayloadAction<any>) => {
        const busStopsData = action.payload.response.body.items.item;
        const validBusStops = Array.isArray(busStopsData) ? busStopsData : [busStopsData];
      
        const uniqueNodeNos = new Set();
        const filteredStations = validBusStops.filter((station: busStops) => {
          const isDuplicate = uniqueNodeNos.has(station.nodeno);
          uniqueNodeNos.add(station.nodeno);
          return !isDuplicate;
        });
      
        state.busStops = filteredStations;
        state.loading = false;
      })
      
      .addCase(tadaBusStop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(busStopToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        busStopToServer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.busList = action.payload.bus;
          state.loading = false;
        }
      )
      .addCase(
        busStopToServer.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(tadaBusList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        tadaBusList.fulfilled,
        (state, action: PayloadAction<any>) => {
          const busData = action.payload.response.body.items.item;
          state.busList = Array.isArray(busData) ? busData : [busData];
          state.loading = false;
        }
      )
      .addCase(
        tadaBusList.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setGps, setBusStop } = busSlice.actions;

export default busSlice.reducer;
