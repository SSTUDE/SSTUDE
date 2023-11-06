import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BUS_API, FIND_BUS_STOP } from '../../apis/constants';

const BUS_KEY = process.env.REACT_APP_BUS_KEY_IN;

export const fetchBusData = createAsyncThunk(
  'bus/fetchData',
  async (gps: [string, string], { rejectWithValue }) => {
    try {
      const params = {
        serviceKey: BUS_KEY,
        pageNo:1,
        numOfRows: 10
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

export const { setGps } = busSlice.actions; 

export default busSlice.reducer;
