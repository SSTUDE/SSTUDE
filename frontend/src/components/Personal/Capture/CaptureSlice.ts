import { CaptureState, Message } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

  const initialState: CaptureState = {
    messages: { type: "" },
};
  
export const CaptureSlice = createSlice({
    name: "capture",
    initialState,
    reducers: {
      addCameraMessage: (state, action: PayloadAction<string>) => {
        state.messages.type = action.payload;
      },
    },
    extraReducers: (builder) => {

    },
  });
  
export const { addCameraMessage } = CaptureSlice.actions;

export default CaptureSlice.reducer;
