import { CaptureState, Message } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

  const initialState: CaptureState = {
    messages: { type: "", data:"" },
};
  
export const CaptureSlice = createSlice({
    name: "capture",
    initialState,
    reducers: {
      addCameraMessage: (state, action: PayloadAction<string>) => {
        state.messages.data = action.payload;
      },
    },
    extraReducers: (builder) => {

    },
  });
  
export const { addCameraMessage } = CaptureSlice.actions;

export default CaptureSlice.reducer;
