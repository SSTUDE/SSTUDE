import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusState {
  busData: any;
  station: string | null;
  loading: boolean;
  error: any;
  gps: [number, number] | null;
}

const initialState: BusState = {
  busData: null,
  station: null,
  loading: false,
  error: null,
//   gps: null,
  gps: [36.107, 128.417],
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setGps: (state, action: PayloadAction<[number, number]>) => {
      state.gps = action.payload;
    },
  },
});

export const { setGps } = busSlice.actions; 

export default busSlice.reducer;
