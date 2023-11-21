import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hour: null,
  minute: null
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAlarmTime: (state, action) => {
      state.hour = action.payload.hour;
      state.minute = action.payload.minute;
    }
  },
  extraReducers: (builder) => {}
});

export const { setAlarmTime } = commonSlice.actions;

export default commonSlice.reducer;
