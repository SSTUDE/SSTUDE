import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axiosToken from "../../apis/http-common";
import { AxiosError } from "axios";

export const HealthCalender = createAsyncThunk(
  "/health/month",

  async (data: { year: string; month: string }, { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/health/month", {
        year: 2023,
        month: 11,
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

type CalendarData = {
  year: number;
  month: number;
};

type DetailData = {
  burntKcal: number;
  consumedKcal: number;
  sleepTime: number;
  steps: number;
};

type HealthState = {
  calendarData: CalendarData | null;
  detailData: DetailData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: HealthState = {
  calendarData: null,
  detailData: null,
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
        state.calendarData = action.payload;
      }
    );
    handleAsyncReducer<DetailData>(
      builder,
      healthTodayData,
      (state, action) => {
        state.detailData = action.payload;
      }
    );
  },
});

export const {} = HealthSlice.actions;

export default HealthSlice.reducer;
