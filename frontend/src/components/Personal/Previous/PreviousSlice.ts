import { AxiosError } from "axios";
import { PersonalClothesState } from "./types";
import axiosToken from "../../../apis/http-common";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 의상 모달
export const PersonalClothesyModal = createAsyncThunk(
  "/detail/clothes",
  async (
    data: { year: number; month: number; day: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosToken.post("/detail/clothes", data);
      return response.data;
    } catch (err: unknown) {
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
  name: "previous",
  initialState,
  reducers: {
    setCarouselIndex: (state, action: PayloadAction<number>) => {
      state.CarouselIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PersonalClothesyModal.pending, (state) => {})
      .addCase(
        PersonalClothesyModal.fulfilled,
        (state, action: PayloadAction<PersonalClothesState[]>) => {
          state.clothesData = action.payload;
        }
      )
      .addCase(
        PersonalClothesyModal.rejected,
        (state, action: PayloadAction<any>) => {}
      );
  },
});

export const { setCarouselIndex } = previousSlice.actions;
export default previousSlice.reducer;
