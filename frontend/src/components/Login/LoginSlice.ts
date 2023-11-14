import { LoginState } from "./types";
import axiosToken from "../../apis/http-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storageData } from "../../apis/JWT-common";
import { useWebSocketContext } from "../Common/WebSocketContext";

export const signUpUser = createAsyncThunk(
  "login/signUpUser",
  async (data: { deviceNum: string }, { rejectWithValue }) => {
    try {
      console.log("회원가입 처리 시작");
      const response = await axiosToken.post(SIGN_UP_URL, data);
      const memberId = response.data.memberId;
      return memberId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "login/signInUser",
  async (data: { deviceNum: string }, { rejectWithValue }) => {
    try {
      console.log("로그인 처리 시작");
      const response = await axiosToken.post(SIGN_IN_URL, data);
      const { sendMessage } = useWebSocketContext();
      const safeSendMessage = sendMessage || (() => {});
      console.log("토큰 저장", response.data.accessToken)
      storageData(response.data.accessToken, safeSendMessage);
      const memberId = response.data.memberId;
      return memberId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState: LoginState = {
  userInfo: "",
  serialNum: "",
  memberId: "",
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.memberId = action.payload;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.memberId = action.payload;
    });
  },
});

export const { } = LoginSlice.actions;

export default LoginSlice.reducer;
