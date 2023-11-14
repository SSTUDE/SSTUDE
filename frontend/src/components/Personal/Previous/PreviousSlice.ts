import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosToken from '../../../apis/http-common';
import { PersonalClothesState } from './types';

// 의상 모달
export const PersonalClothesyModal = createAsyncThunk(
  "/detail/clothes",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    console.log("요청 데이터: ", data);
    try {
      console.log("의상 상세보기를 호출해보자");
      const response = await axiosToken.post("/detail/clothes", data);
      console.log("서버 응답: ", response); 
      return response.data;
    } catch (err: unknown) {
      console.error("에러 발생: ", err); 
      return rejectWithValue(
        err instanceof AxiosError ? err.message : "An unexpected error occurred"
      );
    }
  }
);

const initialState = {
  CarouselIndex: 0,
  clothesData: null as PersonalClothesState[] | null,
};

const previousSlice = createSlice({
  name: 'previous',
  initialState,
  reducers: {
    setCarouselIndex: (state, action: PayloadAction<number>) => {
      state.CarouselIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PersonalClothesyModal.pending, (state) => {
        // 로딩 상태 처리
      })
      .addCase(PersonalClothesyModal.fulfilled, (state, action: PayloadAction<PersonalClothesState[]>) => {
        state.clothesData = action.payload;
      })
      .addCase(PersonalClothesyModal.rejected, (state, action: PayloadAction<any>) => {
        // 에러 처리
      });
  },
});

export const { setCarouselIndex } = previousSlice.actions;
export default previousSlice.reducer;
