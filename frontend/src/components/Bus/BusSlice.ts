import axios, { AxiosError } from "axios";
import { BusState, busStops } from "./types";
import { RootState } from "../../store/store";
import axiosToken from "../../apis/http-common";
import {
  BUS_API,
  BUS_STOP,
  BUS_LIST,
  BUS_REAL_TIME,
} from "../../apis/constants";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

//NOTE - TADA 들은 서버 없을때 더미 데이터로 테스트 하기 위한 요청
const BUS_KEY = process.env.REACT_APP_BUS_KEY_DE;

//NOTE - gps 값 서버로 전달
export const gpsToServer = createAsyncThunk(
  "bus/gpsToServer",
  async (_, { getState, rejectWithValue }) => {
    const { gps } = (getState() as RootState).bus;
    if (!gps) return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");

    try {
      const response = await axiosToken.post("/bus-station/near", {
        latitude: gps[0],
        longitude: gps[1],
        numOfRows: 50,
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.message
          : "An unexpected error occurred"
      );
    }
  }
);

//NOTE - TADA API 버스 정거장 리스트 호출
export const tadaBusStop = createAsyncThunk(
  "bus/tadaBusStop",
  async (_, { getState, rejectWithValue }) => {
    const { gps } = (getState() as RootState).bus;
    if (!gps) return rejectWithValue("GPS 좌표가 설정되지 않았습니다.");

    try {
      const response = await axios.get(`${BUS_API}${BUS_STOP}`, {
        params: {
          serviceKey: BUS_KEY,
          gpsLati: gps[0],
          gpsLong: gps[1],
          numOfRows: 50,
        },
      });

      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.message
          : "An unexpected error occurred"
      );
    }
  }
);

//NOTE - 선택한 정거장 서버로 전송
export const busStopToServer = createAsyncThunk(
  "bus/busStopToServer",
  async (selectedStation: busStops, { rejectWithValue }) => {
    if (!selectedStation) {
      return rejectWithValue("선택된 정거장이 없습니다.");
    }
    try {
      const response = await axiosToken.post("/bus-station/bus-inform", {
        cityCode: selectedStation.cityCode,
        nodeId: selectedStation.nodeId,
        numOfRows: 50,
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
    if (!selectedStation) {
      return rejectWithValue("선택된 정거장이 없습니다.");
    }
    try {
      const response = await axios.get(`${BUS_API}${BUS_LIST}`, {
        params: {
          serviceKey: BUS_KEY,
          cityCode: selectedStation.cityCode,
          nodeid: selectedStation.nodeId,
          numOfRows: 50,
        },
      });

      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.message
          : "An unexpected error occurred"
      );
    }
  }
);

//NOTE - 저장한 버스 목록 서버로 전송
export const busSaveToServer = createAsyncThunk(
  "bus/busSaveToServer",
  async (selectedBusList: string[], { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/bus-station/businform", {
        selectedBusList,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("예상치 못한 오류가 발생했습니다.");
      }
    }
  }
);

//NOTE - TADA API 버스 실시간 데이터 호출
export const tadaBusRealTime = createAsyncThunk(
  "bus/tadaBusRealTime",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { busStop, busSave } = state.bus;
    if (!busStop) return rejectWithValue("버스정거장이 선택되지 않았습니다.");

    const savedRouteIds = busSave || [];

    try {
      const response = await axios.get(`${BUS_API}${BUS_REAL_TIME}`, {
        params: {
          serviceKey: BUS_KEY,
          cityCode: busStop.citycode,
          nodeId: busStop.nodeid,
          numOfRows: 50,
        },
      });

      const busRealTimeData = response.data.response.body.items.item;
      const validBusRealTimeData = Array.isArray(busRealTimeData)
        ? busRealTimeData.filter((bus) => savedRouteIds.includes(bus.routeid))
        : savedRouteIds.includes(busRealTimeData.routeid)
        ? [busRealTimeData]
        : [];

      if (
        typeof response.data === "string" &&
        response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")
      ) {
        return rejectWithValue("서비스 키가 등록되지 않았습니다.");
      }
      return validBusRealTimeData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.message
          : "알 수 없는 오류가 발생했습니다"
      );
    }
  }
);

//NOTE - 버스 실시간 데이터 서버에서 호출
export const busRealTimeForServer = createAsyncThunk(
  "bus/busSaveToServer",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { busStop } = state.bus;

    try {
      const response = await axiosToken.post(
        "/bus-station/bus-arrival-inform",
        {
          cityCode: busStop.cityCode,
          nodeId: busStop.nodeId,
          numOfRows: 50,
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue("예상치 못한 오류가 발생했습니다.");
      }
    }
  }
);

const initialState: BusState = {
  gps: [36.107, 128.417],
  // gps: [37.49648606, 127.02836155],
  busStops: null,
  busStop: null,
  busList: null,
  busSave: null,
  busRealTime: null,
  loading: false,
  error: null,
};

const handleAsyncReducer = <T>(
  builder: ActionReducerMapBuilder<BusState>,
  asyncThunk: any,
  processData: (state: BusState, action: PayloadAction<T>) => void
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action: PayloadAction<T>) => {
      processData(state, action);
      state.loading = false;
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    });
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
          const isDuplicate = uniqueNodeIds.has(station.nodeId);
          uniqueNodeIds.add(station.nodeId);
          return !isDuplicate;
        });

        state.busStops = filteredStations;
      }
    },
    setBusStop: (state, action: PayloadAction<busStops | null>) => {
      state.busStop = action.payload;
    },
    setBusSave: (state, action: PayloadAction<string[]>) => {
      state.busSave = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleAsyncReducer<any>(builder, gpsToServer, (state, action) => {
      const busStopsData = action.payload;
      const validBusStops = Array.isArray(busStopsData)
        ? busStopsData
        : [busStopsData];
      const uniqueNodeNos = new Set();

      state.busStops = validBusStops.filter((station) => {
        if (!uniqueNodeNos.has(station.nodeNo)) {
          uniqueNodeNos.add(station.nodeNo);
          return true;
        }
        return false;
      });
    });

    handleAsyncReducer<any>(builder, tadaBusStop, (state, action) => {
      const busStopsData = action.payload.response.body.items.item;
      const validBusStops = Array.isArray(busStopsData)
        ? busStopsData
        : [busStopsData];
      const uniqueNodeNos = new Set();
      state.busStops = validBusStops.filter((station) => {
        const isDuplicate = uniqueNodeNos.has(station.nodeno);
        uniqueNodeNos.add(station.nodeno);
        return !isDuplicate;
      });
    });

    handleAsyncReducer<any>(builder, busStopToServer, (state, action) => {
      const busData = action.payload;
      state.busList = Array.isArray(busData) ? busData : [busData];
    });

    handleAsyncReducer<any>(builder, tadaBusList, (state, action) => {
      const busData = action.payload.response.body.items.item;
      state.busList = Array.isArray(busData) ? busData : [busData];
    });

    handleAsyncReducer<any>(builder, tadaBusRealTime, (state, action) => {
      state.busRealTime = action.payload;
    });

    handleAsyncReducer<any>(builder, busRealTimeForServer, (state, action) => {
      state.busRealTime = action.payload;
    });
  },
});

export const { setGps, setBusStop, setBusSave } = busSlice.actions;

export default busSlice.reducer;
