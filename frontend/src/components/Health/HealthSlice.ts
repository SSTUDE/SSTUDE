import { AxiosError } from "axios";
import axiosToken from "../../apis/http-common";
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const now = new Date();
const year = now.getFullYear();
const month = parseInt((now.getMonth() + 1).toString().padStart(2, "0"), 10);

export const HealthCalender = createAsyncThunk(
  "/health/month",
  async (data: { year: number; month: number }, { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/health/month", {
        year: year,
        month: month,
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

export const healthTodayData = createAsyncThunk(
  "/health/detail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosToken.get("/health/detail");
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

export const healthPrevData = createAsyncThunk(
  "/health/day",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosToken.post("/health/day", data);
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

export const healthCertCode = createAsyncThunk(
  "/health/certification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosToken.get("/health/certification");
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

type CalendarData = {
  dates: string[];
};

type DetailData = {
  burntKcal: number;
  consumedKcal: number;
  sleepTime: number;
  steps: number;
};

type PrevDetailData = {
  burntKcal: number;
  consumedKcal: number;
  sleepTime: number;
  steps: number;
};

type Certification = {
  certification: string;
};

type HealthState = {
  calendarData: CalendarData | null;
  detailData: DetailData | null;
  prevDetailData: PrevDetailData | null;
  certification: Certification | null;
  status: "idle" | "loading" | "succee ded" | "failed";
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
    handleAsyncReducer<CalendarData>(
      builder,
      HealthCalender,
      (state, action) => {
        state.calendarData = { dates: action.payload.dates };
      }
    );
    handleAsyncReducer<DetailData>(
      builder,
      healthTodayData,
      (state, action) => {
        state.detailData = action.payload;
      }
    );
    handleAsyncReducer<PrevDetailData>(
      builder,
      healthPrevData,
      (state, action) => {
        state.prevDetailData = action.payload;
      }
    );
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
