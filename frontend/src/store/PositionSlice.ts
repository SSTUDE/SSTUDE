import { SFGridItem } from "../components/Weather/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SFGridItem = {
  arePt1: "",
  arePt2: "",
  arePt3: "",
  areaCode: "",
  // latitude: "36.10774883999876",
  latitude: "37.501382",
  // longitude: "128.4220535380925",
  longitude: "127.039601",
  nX: "",
  nY: "",
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<SFGridItem>) => {
      state.arePt1 = action.payload.arePt1;
      state.arePt2 = action.payload.arePt2;
      state.arePt3 = action.payload.arePt3;
      state.areaCode = action.payload.areaCode;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.nX = action.payload.nX;
      state.nY = action.payload.nY;
    },
  },
});

export const { updatePosition } = positionSlice.actions;

export default positionSlice.reducer;
