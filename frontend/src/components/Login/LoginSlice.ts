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
  const response = await axiosToken.post(url, data);
  storageData(
    response.data.accessToken,
    response.data.refreshToken,
    sendMessage
  );

  return response.data;
};

export const signUpUser = createAsyncThunk(
  "login/signUpUser",
  async (data: { deviceNum: string }, { rejectWithValue }) => {
    try {
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
      const { sendMessage } = useWebSocketContext();
      const safeSendMessage = sendMessage || (() => {});
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
  gps:null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processMessage: (
      state: LoginState,
      action: PayloadAction<{
        type: "signUp" | "signIn" | "signOut";
        data: { userInfo: string; serialNum: string, gps: [number, number] | null };
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
        state.gps = data.gps;
        state.signUp = true;
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
