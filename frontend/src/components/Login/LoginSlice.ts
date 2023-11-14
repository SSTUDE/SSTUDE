import { LoginState } from "./types";
import axiosToken from "../../apis/http-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "login/signUpUser",
  async (data: { deviceNum: string }, { rejectWithValue }) => {
    try {
      console.log("서버로 회원가입 요청", data);
      const response = await axiosToken.post(SIGN_UP_URL, data);
      console.log("서버에서 - 회원가입후 완료 response", response);
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
      console.log("서버로 로그인 요청", data);
      const response = await axiosToken.post(SIGN_IN_URL, data);
      console.log("서버에서 - 로그인후 완료 response", response);
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
