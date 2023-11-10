import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageData } from "../../apis/JWT-common";
import axiosToken from "../../apis/http-common";

export const handleAuthentication = async (
  url: string,
  data: { year: string; month: string },
  sendMessage: (message: string) => void
) => {
  const response = await axiosToken.post(url, data);
  console.log(response);
  storageData(
    response.data.accessToken,
    response.data.refreshToken,
    sendMessage
  );
  return response.data;
};

export const handleGetAuthentication = async (
  url: string,
  sendMessage: (message: string) => void
) => {
  const response = await axiosToken.get(url);
  console.log(response);
  storageData(
    response.data.accessToken,
    response.data.refreshToken,
    sendMessage
  );
  return response.data;
};

export const HealthCalender = createAsyncThunk(
  "/health/month",
  async (data: { year: string; month: string }, { rejectWithValue }) => {
    try {
      console.log("10 - 서버용 로그인 함수");
      // const { sendMessage } = useWebSocketContext();
      // const safeSendMessage = sendMessage || (() => {});
      // NOTE - 아래껀 라즈베리 없어도 되게 하는 더미에용
      const safeSendMessage = (message: string) => {
        console.log("더미 메시지 전송:", message);
      };
      return await handleAuthentication("/health/month", data, safeSendMessage);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

type HealthState = {};

const initialState: HealthState = {};

export const HealthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = HealthSlice.actions;

export default HealthSlice.reducer;
