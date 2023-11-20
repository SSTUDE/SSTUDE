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
      // console.log(1);
      // localStorage.setItem('SSTUDE',JSON.stringify({'accessToken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiZXhwIjoxNzAwNDUzNDM5fQ.gIaptC1hITWytu-OI0ez7Wso37izCV5yop7-qCH2uBw'}))
      const response = await axiosToken.post(SIGN_IN_URL, data);
      console.log("hello world",response)
      storageData(response.data.accessToken);
      const memberId = response.data.memberId;
      return memberId;
    } catch (err: any) {
      console.log(err);
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
  loading: false,
  error: null,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncReducer<any>(builder, signUpUser, (state, action) => {
      state.memberId = action.payload;
    });
    handleAsyncReducer<any>(builder, signInUser, (state, action) => {
      state.memberId = action.payload;
    });
  },
});

export const {} = LoginSlice.actions;

export default LoginSlice.reducer;
