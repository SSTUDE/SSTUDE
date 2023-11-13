import { CaptureState } from "./types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pythonFormAxiosToken } from "../../../apis/http-common";

const initialState: CaptureState = {
  messages: { type: "", data: "" },
};

const generateRandomFileName = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `image_${timestamp}_${randomNum}.png`;
};

export const personalPictureToServer = createAsyncThunk(
  'capture/personalPictureToServer',
  async (capturedImage: Blob, { rejectWithValue }) => {
    console.log("personalPictureToServer 시작");
    try {
      console.log("FormData 준비 중...");
      const formData = new FormData();
      formData.append('file', capturedImage, generateRandomFileName());

      console.log("서버로 요청 전송 중...", formData);
      for (let [key, value] of Array.from(formData.entries())) {
        console.log(key, value);
      }
      
      const response = await pythonFormAxiosToken.post('/color', formData);
      
      console.log("서버 응답: ", response);
      return response.data;
    } catch (error: any) {
      console.error("오류 발생: ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || 'Unknown error occurred');
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
      formData.append('file', capturedImage, generateRandomFileName());

      console.log("서버로 요청 전송 중...", formData);
      const response = await pythonFormAxiosToken.post("/clothes", formData);

      console.log("서버 응답: ", response);
      return response.data;
    } catch (error: any) {
      console.error("오류 발생: ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
);


export const CaptureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    addCameraMessage: (state, action: PayloadAction<string>) => {
      state.messages.data = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { addCameraMessage } = CaptureSlice.actions;

export default CaptureSlice.reducer;
