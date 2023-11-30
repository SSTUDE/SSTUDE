import { CaptureState } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  pythonAxiosToken,
  pythonFormAxiosToken,
} from "../../../apis/http-common";

const generateRandomFileName = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `image_${timestamp}_${randomNum}.png`;
};

export const personalPictureToServer = createAsyncThunk(
  "capture/personalPictureToServer",
  async (capturedImage: Blob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", capturedImage, generateRandomFileName());

      const response = await pythonFormAxiosToken.post("/color", formData);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response);
      }
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

export const personalClothesToServer = createAsyncThunk(
  "capture/personalClothesToServer",
  async (capturedImage: Blob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", capturedImage, generateRandomFileName());

      const response = await pythonFormAxiosToken.post("/clothes", formData);

      return response.data;
    } catch (error: any) {
      if (error.response && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

export const clothesDetailToServer = createAsyncThunk(
  "capture/clothesDetailToServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await pythonAxiosToken.post("clothes/detail");

      return response.data;
    } catch (error: any) {
      console.error("오류 발생: ", error);
      if (error.response && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);

const initialState: CaptureState = {
  messages: { type: "", data: "" },
};

export const CaptureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = CaptureSlice.actions;

export default CaptureSlice.reducer;
