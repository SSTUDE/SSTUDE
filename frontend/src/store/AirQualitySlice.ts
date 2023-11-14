import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAirQualityData } from '../apis/api'; 
import { AirQualityResponse, AirQualityCustom } from '../components/Weather/types'

// 함수 호출
export const fetchAirQualityData = createAsyncThunk(
  'airQuality/fetchData',
  async (params: { sidoName: string | null; }, thunkAPI) => {
    try {
      const response = await getAirQualityData({
        returnType: "JSON",
        numOfRows: 1000,
        pageNo: 1,
        sidoName: params.sidoName,
        ver: '1.3'
      });

      // 필요한 데이터만 포매팅
      const FormatData = response.map((item: AirQualityResponse) => ({
        dataTime: item.dataTime,
        mangName: item.mangName,
        sidoName: item.sidoName,
        stationName: item.stationName,
        pm25Grade1h: item.pm25Grade1h,
        pm25Value24: item.pm25Value24,
        pm10Grade1h: item.pm10Grade1h,
        pm10Value24: item.pm10Value24,
      })) as AirQualityCustom[];
      return FormatData 

    } catch (error) {
      return thunkAPI.rejectWithValue('단기 예보 데이터를 가져오는 데 실패했습니다.');
    }
  }
);

// 초기 상태 정의
const initialState = {
  data: [] as AirQualityCustom[],
  loading: false,
  error: null as string | null,
};

const AirQuality = createSlice({
  name: 'airQuality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirQualityData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAirQualityData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAirQualityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '미세 먼지 데이터를 불러오는 데 실패했습니다.';
      });
  },
});

export default AirQuality.reducer;