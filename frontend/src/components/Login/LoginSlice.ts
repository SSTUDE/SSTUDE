import { LoginState } from "./types";
import axiosToken from "../../apis/http-common";
import { storageData } from "../../apis/JWT-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
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
      console.log("signInUser: 로그인 처리 시작", data);
      const response = await axiosToken.post(SIGN_IN_URL, data);
      console.log("signInUser: 서버 응답 받음", response.data);

      const { sendMessage } = useWebSocketContext();
      const safeSendMessage = sendMessage || (() => {});
      console.log("signInUser: 토큰 저장", response.data.accessToken);
      storageData(response.data.accessToken, safeSendMessage);

      const memberId = response.data.memberId;
      console.log("signInUser: 회원 ID 반환", memberId);
      return memberId;
    } catch (err: any) {
      console.error("signInUser: 로그인 처리 실패", err.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);


const handleAsyncReducer = <T>(
  builder: ActionReducerMapBuilder<LoginState>,
  asyncThunk: any,
  processData: (state: LoginState, action: PayloadAction<T>) => void
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action: PayloadAction<T>) => {
      processData(state, action);
      state.loading = false;
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    });
};

const initialState: LoginState = {
  userInfo: "",
  serialNum: "",
  memberId: "",
  signOut: false,
  loading: false,
  error: null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // setSignOut: (state) => {
    //   state.signOut = false;
    // },
  },
  extraReducers: (builder) => {
    handleAsyncReducer<any>(builder, signUpUser, (state, action) => {
      state.memberId = action.payload;
    });
    handleAsyncReducer<any>(builder, signInUser, (state, action) => {
      state.memberId = action.payload;
    });
  },
});

export const { } = LoginSlice.actions;

export default LoginSlice.reducer;
