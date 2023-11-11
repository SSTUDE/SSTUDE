import { LoginState } from "./types";
import axiosToken from "../../apis/http-common";
import { storageData } from "../../apis/JWT-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import { useWebSocketContext } from "../Common/WebSocketContext";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const handleAuthentication = async (
  url: string,
  data: { deviceNum: string },
  sendMessage: (message: string) => void
) => {
  console.log("13 - 서버 통신중.....");
  const response = await axiosToken.post(url, data);
  console.log("14 - 받아온 데이터", response);
  storageData(response.data.accessToken, sendMessage);

  return response.data;
};

export const signUpUser = createAsyncThunk(
  "login/signUpUser",
  async (data: { deviceNum: string }, { rejectWithValue }) => {
    try {
      console.log("6 - 서버용 회원가입 함수");
      const response = await axiosToken.post(SIGN_UP_URL, data);
      const memberId = response.data.memberId;
      console.log("7 - 회원가입후 완료 memberId", memberId);
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
      console.log("10 - 서버용 로그인 함수");
      // const { sendMessage } = useWebSocketContext();
      // const safeSendMessage = sendMessage || (() => {});
      // NOTE - 아래껀 라즈베리 없어도 되게 하는 더미에용
      const safeSendMessage = (message: string) => {
        console.log("더미 메시지 전송:", message);
      };
      return await handleAuthentication(SIGN_IN_URL, data, safeSendMessage);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState: LoginState = {
  userInfo: "",
  serialNum: "",
  signUp: false,
  signIn: false,
  memberId: "",
  gps: null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processMessage: (
      state: LoginState,
      action: PayloadAction<{
        type: "signUp" | "signIn" | "signOut";
        data: {
          userInfo: string;
          serialNum: string;
          gps: [number, number] | null;
        };
      }>
    ) => {
      const { type, data } = action.payload;
      if (type === "signUp") {
        state.userInfo = data.userInfo;
        state.serialNum = data.serialNum;
        state.signUp = true;
      } else if (type === "signIn") {
        state.userInfo = data.userInfo;
        state.serialNum = data.serialNum;
        // state.gps = data.gps;
        state.signIn = true;
      } else if (type === "signOut") {
        state.userInfo = "";
        state.serialNum = "";
        state.signUp = false;
        state.signIn = false;
        state.memberId = "";
      }
    },
    setMemberId: (state, action: PayloadAction<string>) => {
      state.memberId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.memberId = action.payload.memberId;
    });
  },
});

export const { processMessage, setMemberId } = LoginSlice.actions;

export default LoginSlice.reducer;
