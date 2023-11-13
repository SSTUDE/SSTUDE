import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axiosToken from "../../apis/http-common";
import { AxiosError } from "axios";

// 헬스 캘린더
export const HealthCalender = createAsyncThunk(
  "/health/month",
  async (data: { year: number; month: number }, { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/health/month", data);
      console.log("헬스 캘린더입니다", response.data);
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

// 헬스 오늘 데이터
export const healthTodayData = createAsyncThunk(
  "/health/detail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosToken.get("/health/detail");
      console.log("오늘 헬스 데이터 어디갔어", response);
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

// 헬스 이전 데이터
export const healthPrevData = createAsyncThunk(
  "/health/day",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosToken.post("/health/day", data);
      console.log("헬스 이전 데이터", response);
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

// 헬스 인증 코드 전송
export const healthCertCode = createAsyncThunk(
  "/health/certification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosToken.get("/health/certification");
      console.log("헬스 인증 코드 전송하기", response);
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

// 헬스 캘린더
type CalendarData = {
  dates: string[];
};

// 오늘의 헬스 데이터
type DetailData = {
  burntKcal: number;
  consumedKcal: number;
  sleepTime: number;
  steps: number;
};

// 이전 헬스 데이터
type PrevDetailData = {
  burntKcal: number;
  consumedKcal: number;
  sleepTime: number;
  steps: number;
};

// 인증 코드
type Certification = {
  certification: string;
};

type HealthState = {
  calendarData: CalendarData | null;
  detailData: DetailData | null;
  prevDetailData: PrevDetailData | null;
  certification: Certification | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: HealthState = {
  calendarData: null,
  detailData: null,
  prevDetailData: null,
  certification: null,
  status: "idle",
  error: null,
};

const handleAsyncReducer = <T>(
  builder: ActionReducerMapBuilder<HealthState>,
  asyncThunk: any,
  processData: (state: HealthState, action: PayloadAction<T>) => void
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action: PayloadAction<T>) => {
      processData(state, action);
      state.status = "succeeded";
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.status = "failed";
    });
};

export const HealthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 헬스 캘린더
    handleAsyncReducer<CalendarData>(
      builder,
      HealthCalender,
      (state, action) => {
        state.calendarData = { dates: action.payload.dates };
      }
    );
    // 오늘의 헬스 데이터
    handleAsyncReducer<DetailData>(
      builder,
      healthTodayData,
      (state, action) => {
        state.detailData = action.payload;
      }
    );
    // 이전 헬스 데이터
    handleAsyncReducer<PrevDetailData>(
      builder,
      healthPrevData,
      (state, action) => {
        state.prevDetailData = action.payload;
      }
    );
    // 인증 코드
    handleAsyncReducer<Certification>(
      builder,
      healthCertCode,
      (state, action) => {
        state.certification = action.payload;
      }
    );
  },
});

export const {} = HealthSlice.actions;

export default HealthSlice.reducer;
