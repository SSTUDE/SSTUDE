import { CaptureState } from "./types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pythonAxiosToken, pythonFormAxiosToken } from "../../../apis/http-common";

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

//NOTE - detail API
//NOTE - extraReducers 참고
export const detailToServer = createAsyncThunk(
  'capture/detailToServer',
  async (data: string, { rejectWithValue }) => {
    console.log("detailToServer 시작");
    try {
      
      console.log("서버로 요청 전송 중...", data);
      
      const response = await pythonAxiosToken.post('/detail', data);
      
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

//NOTE - clothes/detaiil API
export const clothesDetailToServer = createAsyncThunk(
  'capture/clothesDetailToServer',
  async (_, { rejectWithValue }) => {
    console.log("clothesDetailToServer 시작");
    try {
      
      console.log("서버로 요청 전송 중...");
      
      const response = await pythonAxiosToken.post('clothes/detail');
      
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

const initialState: CaptureState = {
  messages: { type: "", data: "" },
  finishPersonal: false, 
};

export const CaptureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    // addCameraMessage: (state, action: PayloadAction<string>) => {
    //   state.messages.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(detailToServer.fulfilled, (state, action) => {
      //NOTE - 디테일 함수 반환값 정상이면 변수 true로 변경
      if (action.payload.data === "응답값") {
        state.finishPersonal = true
      }
    });
  },
});

export const { } = CaptureSlice.actions;

export default CaptureSlice.reducer;
