import { MirrorState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MirrorState = {
  isMenuOpen: false,
};

export const MirrorSlice = createSlice({
  name: "mirror",
  initialState,
  reducers: {
    setMenuBtn: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { setMenuBtn } = MirrorSlice.actions;

export default MirrorSlice.reducer;
