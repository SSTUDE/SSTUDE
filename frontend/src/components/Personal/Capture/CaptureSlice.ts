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
    console.log("personalPictureToServer 시작");
    try {
      console.log("FormData 준비 중...");
      const formData = new FormData();
      formData.append("file", capturedImage, generateRandomFileName());

      console.log("서버로 요청 전송 중...", formData);
      for (let [key, value] of Array.from(formData.entries())) {
        console.log(key, value);
      }

      const response = await pythonFormAxiosToken.post("/color", formData);

      console.log("서버 응답: ", response);

      return response.data;
    } catch (error: any) {
      console.error("오류 발생: ", error);
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
    console.log("personalClothesToServer 시작");
    try {
      console.log("FormData 준비 중...");
      const formData = new FormData();
      formData.append("file", capturedImage, generateRandomFileName());

      console.log("서버로 요청 전송 중...", formData);
      for (let [key, value] of Array.from(formData.entries())) {
        console.log(key, value);
      }

      const response = await pythonFormAxiosToken.post("/clothes", formData);

      console.log("서버 응답: ", response);
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

//NOTE - clothes/detaiil API
export const clothesDetailToServer = createAsyncThunk(
  "capture/clothesDetailToServer",
  async (_, { rejectWithValue }) => {
    console.log("clothesDetailToServer 시작");
    try {
      console.log("서버로 요청 전송 중...");

      const response = await pythonAxiosToken.post("clothes/detail");

      console.log("서버 응답: ", response);

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
  reducers: {
  },
  extraReducers: (builder) => {},
});

export const {} = CaptureSlice.actions;

export default CaptureSlice.reducer;
