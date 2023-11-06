import { LoginState } from "./types";
import axiosToken from "../../apis/http-common";
import { storageData } from "../../apis/JWT-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import { useWebSocketContext } from "../Common/WebSocketContext";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const handleAuthentication = async (
  url: string,
  data: { deviceNumber: string },
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
  async (data: { deviceNumber: string }, { rejectWithValue }) => {
    try {
      const { sendMessage } = useWebSocketContext();
      const safeSendMessage = sendMessage || (() => {});
      return await handleAuthentication(SIGN_UP_URL, data, safeSendMessage);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "login/signInUser",
  async (data: { deviceNumber: string }, { rejectWithValue }) => {
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
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processMessage: (
      state: LoginState,
      action: PayloadAction<{
        type: "signUp" | "signIn" | "signOut";
        data: { userInfo: string; serialNum: string };
      }>
    ) => {
      const { type, data } = action.payload;
      if (type === "signUp" || type === "signIn") {
        state.userInfo = data.userInfo;
        state.serialNum = data.serialNum;
        state[type] = true;
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
