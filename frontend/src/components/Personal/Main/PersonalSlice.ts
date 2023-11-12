import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { storageData } from "../../../apis/JWT-common";
import axiosToken, { pythonAxiosToken } from "../../../apis/http-common";
import { AxiosError } from "axios";
import { PersonalState } from "./types";

// export const handleAuthentication = async (
//   url: string,
//   data: { year: number; month: number },
//   sendMessage: (message: string) => void
// ) => {
//   const response = await axiosToken.post(url, data);
//   console.log(response);
//   storageData(response.data.accessToken, sendMessage);
//   return response.data;
// };

// export const handleGetAuthentication = async (
//   url: string,
//   sendMessage: (message: string) => void
// ) => {
//   const response = await axiosToken.get(url);
//   console.log(response);
//   storageData(response.data.accessToken, sendMessage);
//   return response.data;
// };

// 퍼스널 컬러 달력
export const PersonalCalender = createAsyncThunk(
  "/static/list",
  async (data: { year: number; month: number }, { rejectWithValue }) => {
    try {
      console.log("퍼스널컬러 호출해보자"); // 들어옴
      const response = await axiosToken.post("/static/list", {
        year: 2023,
        month: 11,
      });
      console.log("res", response);
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
      console.log("퍼스널 컬러 상세보기를 호출해보자");
      const response = await axiosToken.post("/detail/beauty", data);
      console.log("res", response);
      return response.data;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

// 의상 모달
export const PersonalClothesyModal = createAsyncThunk(
  "/detail/clothes",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    try {
      console.log("의상 상세보기를 호출해보자");
      const response = await axiosToken.post("/detail/clothes", data);
      console.log("res", response);
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
      console.log("퍼스널 컬러 진단 결과 나오나요?");
      console.log("보내는 데이터 확인:", data);
      console.log("axios 인스턴스 설정 확인:", pythonAxiosToken.defaults); // 여기에 추가
      const response = await pythonAxiosToken.post("/detail", data);
      console.log("받은 응답 확인:", response); // 여기에 추가
      return response.data;
    } catch (err: unknown) {
      console.error("에러 뜨나요", err);
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
  clothes: null,
  beautyResults: null,
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
      console.log("컬러 저장된 데이터 들어오나요?", action.payload);
      state.beauty = action.payload;
    });
    // 의상 모달
    handleAsyncReducer<any>(builder, PersonalClothesyModal, (state, action) => {
      console.log("의상 저장된 데이터 들어오나요?", action.payload);
      state.clothes = action.payload[0];
    });
    // 퍼스널 커러 진단 결과
    handleAsyncReducer<any>(builder, PersonalBeautyResults, (state, action) => {
      console.log(
        "퍼스널 컬러 진단 결과 저장된 데이터 들어오나요?",
        action.payload
      );
      state.beautyResults = action.payload;
    });
  },
});

export const {} = PersonalSlice.actions;

export default PersonalSlice.reducer;
