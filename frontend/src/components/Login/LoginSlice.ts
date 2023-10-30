import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  userInfo: string;
  serialNum: string;
  signIn: boolean;
}

const initialState: LoginState = {
  userInfo: '',
  serialNum: '',
  signIn: false,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    processMessage: (state, action: PayloadAction<{ type: string, data: { userInfo: string, serialNum: string } }>) => {
      const { type, data } = action.payload;
      if (type === "signIn") {
        state.userInfo = data.userInfo;
        state.serialNum = data.serialNum;
        state.signIn = true;
      } else {
        state.signIn = false;
      }
    },
  },
});

export const { processMessage } = LoginSlice.actions;

export default LoginSlice.reducer;
