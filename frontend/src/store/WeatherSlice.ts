import { getWeatherData } from "../apis/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  WeatherDataCustom,
  WeatherDataRequest,
  WeatherDataResponse,
} from "../components/Weather/types";

export const fetchShortData = createAsyncThunk(
  "weather/fetchShortData",
  async (params: WeatherDataRequest, thunkAPI) => {
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: params.base_date,
        base_time: params.base_time,
        nx: params.nx,
        ny: params.ny,
      });

      const FormatData = response.map((item: WeatherDataResponse) => ({
        category: item.category,
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue,
      })) as WeatherDataCustom[];
      return FormatData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "단기 예보 데이터를 가져오는 데 실패했습니다."
      );
    }
  }
);

const initialState = {
  data: [] as WeatherDataCustom[],
  loading: false,
  error: null as string | null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShortData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShortData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchShortData.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ||
        "단기 날시 예보 데이터를 불러오는 데 실패했습니다.";
    });
  },
});

export default weatherSlice.reducer;
