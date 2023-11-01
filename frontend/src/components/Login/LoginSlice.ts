import axios from "../../apis/http-common";
import { storageData } from "../../apis/JWT-common";
import { SIGN_UP_URL, SIGN_IN_URL } from "../../apis/constants";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const handleAuthentication = async (
  url: string,
  data: { deviceNumber: string }
) => {
  const response = await axios.post(url, data);
  storageData(response.data.accessToken, response.data.refreshToken);
  return response.data;
};

export const signUpUser = createAsyncThunk(
  "login/signUpUser",
  async (data: { deviceNumber: string }, { rejectWithValue }) => {
    try {
      return await handleAuthentication(SIGN_UP_URL, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "login/signInUser",
  async (data: { deviceNumber: string }, { rejectWithValue }) => {
    try {
      return await handleAuthentication(SIGN_IN_URL, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

interface LoginState {
  folderName: string;
  serialNum: string;
  signUp: boolean;
  signIn: boolean;
  memberId: string;
}

const initialState: LoginState = {
  folderName: "",
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
        data: { folderName: string; serialNum: string };
      }>
    ) => {
      const { type, data } = action.payload;
      if (type === "signUp" || type === "signIn") {
        state.folderName = data.folderName;
        state.serialNum = data.serialNum;
        state[type] = true;
        state.signIn = true;
      } else if (type === "signOut") {
        state.folderName = "";
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
