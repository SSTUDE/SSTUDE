import axios, { AxiosError } from "axios";
import { RootState } from "../../store/store";
import axiosToken from "../../apis/http-common";
import { BusState, busServer, busStops } from "./types";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

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

//NOTE - 선택한 정거장 서버에 저장
export const busStopSaveToServer = createAsyncThunk(
  "bus/busStopSaveToServer",
  async (selectedStation: busStops, { rejectWithValue }) => {
    if (!selectedStation) {
      return rejectWithValue("선택된 정거장이 없습니다.");
    }
    try {
      const response = await axiosToken.post("/bus-station/near/save", {
        busStations: [
          {
            cityCode: selectedStation.cityCode,
            latitude: selectedStation.latitude,
            longitude: selectedStation.longitude,
            nodeId: selectedStation.nodeId,
            nodeName: selectedStation.nodeName,
            nodeNo: selectedStation.nodeNo,
          },
        ],
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

//NOTE - 저장한 버스 목록 서버로 전송
export const busSaveToServer = createAsyncThunk(
  "bus/busSaveToServer",
  async (selectedBusList: busServer[], { rejectWithValue }) => {
    try {
      const buses = selectedBusList.map(bus => ({
        routeId: bus.routeId,
        routeNo: bus.routeNo,
        routeType: bus.routeType,
        startNodeNum: bus.startNodeNum,
        endNodeNum: bus.endNodeNum
      }));

      const response = await axiosToken.post("/bus-station/bus-inform/save", {
        buses 
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


//NOTE - 저장한 버스 정거장 서버에서 호출
export const saveBusStopForServer = createAsyncThunk(
  "bus/saveBusStopForServer",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosToken.post(
        "/bus-station/near/load", {});
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

//NOTE - 저장한 버스 목록 서버에서 호출
export const saveBusListForServer = createAsyncThunk(
  "bus/saveBusListForServer",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosToken.post(
        "/bus-station/bus-inform/load", {});
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

//NOTE - 버스 실시간 데이터 서버에서 호출
export const busRealTimeForServer = createAsyncThunk(
  "bus/busRealTimeForServer",
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
  // gps: [36.107, 128.417],
  gps: [37.501382, 127.039601],
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

    handleAsyncReducer<any>(builder, busStopToServer, (state, action) => {
      const busData = action.payload;
      state.busList = Array.isArray(busData) ? busData : [busData];
    });

    handleAsyncReducer<any>(builder, saveBusStopForServer, (state, action) => {
      const busStopData = action.payload;
      if (busStopData && busStopData.length > 0) {
        state.busStop = busStopData[busStopData.length - 1];
      }
    });

    handleAsyncReducer<any>(builder, saveBusListForServer, (state, action) => {
      const routeIdList = action.payload.map((bus: { routeId: string }) => bus.routeId);
      state.busSave = routeIdList;
    });
    

    handleAsyncReducer<any>(builder, busRealTimeForServer, (state, action) => {
      state.busRealTime = action.payload;
    });
  },
});

export const { setGps, setBusStop, setBusSave } = busSlice.actions;

export default busSlice.reducer;
