import { AxiosError } from "axios";
import { PersonalState } from "./types";
import axiosToken, { pythonAxiosToken } from "../../../apis/http-common";
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const now = new Date();
const year = now.getFullYear();
const month = parseInt((now.getMonth() + 1).toString().padStart(2, "0"), 10);

// 퍼스널 컬러 달력
export const PersonalCalender = createAsyncThunk(
  "/static/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosToken.post("/static/list", {
        year: year,
        month: month,
      });
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

// 퍼스널 컬러 뷰티 모달
export const PersonalBeautyModal = createAsyncThunk(
  "/detail/beauty",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosToken.post("/detail/beauty", data);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

// 퍼스널 컬러 진단 결과
export const PersonalBeautyResults = createAsyncThunk(
  "/detail",
  async (data: { date: string }, { rejectWithValue }) => {
    try {
      const response = await pythonAxiosToken.post("/detail", data);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

// 의상 진단 결과
export const PersonalClothesResults = createAsyncThunk(
  "/clothes/detail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await pythonAxiosToken.post("/clothes/detail");
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

const handleAsyncReducer = <T>(
  builder: ActionReducerMapBuilder<PersonalState>,
  asyncThunk: any,
  processData: (state: PersonalState, action: PayloadAction<T>) => void
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

const initialState: PersonalState = {
  beauty: null,
  beautyResults: null,
  clothesResults: null,
  finishPersonal: false,
  loading: false,
  error: null,
};

export const PersonalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 퍼스널 컬러 모달
    handleAsyncReducer<any>(builder, PersonalBeautyModal, (state, action) => {
      state.beauty = action.payload;
    });
    // 퍼스널 컬러 진단 결과
    handleAsyncReducer<any>(builder, PersonalBeautyResults, (state, action) => {
      state.beautyResults = action.payload;
      if (action.type === "/detail/fulfilled") {
        state.finishPersonal = true;
      }
    });
    // 의상 진단 결과
    handleAsyncReducer<any>(
      builder,
      PersonalClothesResults,
      (state, action) => {
        state.clothesResults = action.payload;
      }
    );
  },
});

export const {} = PersonalSlice.actions;

export default PersonalSlice.reducer;
