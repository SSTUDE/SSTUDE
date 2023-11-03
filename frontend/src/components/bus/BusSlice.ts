import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BUS_API, FIND_BUS_STOP } from '../../apis/constants';

const BUS_STOP_KEY = process.env.REACT_APP_BUS_STOP_KEY;

export const fetchBusData = createAsyncThunk(
  'bus/fetchData',
  async (gps: [string, string], { rejectWithValue }) => {
    try {
      const params = {
        serviceKey: BUS_STOP_KEY,
        tmX: gps[0],
        tmY: gps[1],
        radius: '100'
      };

      const response = await axios.get(`${BUS_API}${FIND_BUS_STOP}`, { params });
      console.log(response);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  }
);

interface BusState {
  busData: any;
  station: string | null;
  loading: boolean;
  error: any;
}

const initialState: BusState = {
  busData: null,
  station: null,
  loading: false,
  error: null,
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusData.fulfilled, (state, action: PayloadAction<any>) => {
        state.busData = action.payload;
        state.station = action.payload.stationNum;
        state.loading = false;
      })
      .addCase(fetchBusData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default busSlice.reducer;