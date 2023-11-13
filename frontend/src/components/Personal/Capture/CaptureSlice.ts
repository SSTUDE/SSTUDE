import { CaptureState, Message } from "./types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pythonAxiosToken } from "../../../apis/http-common";

const initialState: CaptureState = {
  messages: { type: "", data: "" },
};

const generateRandomFileName = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `image_${timestamp}_${randomNum}.png`;
};

const base64ToBlob = (base64Data: string): Blob => {
  console.log("Base64 데이터 변환 시작");

  const byteString = atob(base64Data.split(',')[1]);
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

  console.log(`MIME 타입: ${mimeString}`);

  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeString });

  console.log("Blob 객체 생성 완료", blob);

  return blob;
};

// const base64ToBlob = (base64Data: string): Blob => {
//   let array = [];
//   const decoding = atob(base64Data.split(",")[1]); // base64 디코딩

//   // 디코딩된 문자열을 바이트 배열로 변환
//   for (let i = 0; i < decoding.length; i++) {
//     array.push(decoding.charCodeAt(i));
//   }

//   // Blob 객체 생성
//   const blob = new Blob([new Uint8Array(array)], { type: "image/png" });

//   return blob;
// };

// let array = [];
// for (let i = 0; i < decoding.length; i++)
//   array.push(decoding.charCodeAt(i));
// const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
// const fileName = 'sign_img_' + name + '_' + new Date().getTime() + '.png';
// let formData = new FormData();
// formData.append('file', file, fileName);
// const decoding = atob(imgBase64.split(',')[1]);

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
      
      const response = await pythonAxiosToken.post('/color', formData);
      
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
      const response = await pythonAxiosToken.post("/clothes", formData);

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
