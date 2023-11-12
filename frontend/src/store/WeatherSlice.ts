import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherData } from '../apis/api';
import { WeatherDataCustom, WeatherDataRequest, WeatherDataResponse } from '../components/Weather/types';

// 비동기 함수 정의
export const fetchShortData = createAsyncThunk(
  'weather/fetchShortData',
  async (params: WeatherDataRequest, thunkAPI) => {
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: params.base_date,
        base_time: params.base_time,
        nx: params.nx,
        ny: params.ny
      });

      // 필요한 데이터만 포매팅
      const FormatData = response.map((item: WeatherDataResponse) => ({
        category: item.category,
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue
      })) as WeatherDataCustom[];
      return FormatData 

    } catch (error) {
      return thunkAPI.rejectWithValue('단기 예보 데이터를 가져오는 데 실패했습니다.');
    }
  }
);

// 초기 상태 정의
const initialState = {
  data: [] as WeatherDataCustom[],
  loading: false,
  error: null as string | null,
};

// Slice 정의
const weatherSlice = createSlice({
  name: 'weather',
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
      state.error = action.payload as string;
    });
  },
});

export default weatherSlice.reducer;
