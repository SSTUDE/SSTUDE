import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageData } from "../../../apis/JWT-common";
import axiosToken from "../../../apis/http-common";

export const handleAuthentication = async (
  url: string,
  data: { year: number; month: number },
  sendMessage: (message: string) => void
) => {
  const response = await axiosToken.post(url, data);
  console.log(response);
  storageData(response.data.accessToken, sendMessage);
  return response.data;
};

export const handleGetAuthentication = async (
  url: string,
  sendMessage: (message: string) => void
) => {
  const response = await axiosToken.get(url);
  console.log(response);
  storageData(response.data.accessToken, sendMessage);
  return response.data;
};

export const PersonalCalender = createAsyncThunk(
  "/static/list",
  async (data: { year: number; month: number }, { rejectWithValue }) => {
    try {
      console.log("10 - 서버용 로그인 함수");
      // const { sendMessage } = useWebSocketContext();
      // const safeSendMessage = sendMessage || (() => {});
      // NOTE - 아래껀 라즈베리 없어도 되게 하는 더미에용
      const safeSendMessage = (message: string) => {
        console.log("더미 메시지 전송:", message);
      };
      return await handleAuthentication("/static/list", data, safeSendMessage);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

type PersonalState = {};

const initialState: PersonalState = {};

export const PersonalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = PersonalSlice.actions;

export default PersonalSlice.reducer;
