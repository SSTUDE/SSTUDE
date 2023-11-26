import { getAirQualityData } from "../apis/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AirQualityResponse,
  AirQualityCustom,
} from "../components/Weather/types";

export const fetchAirQualityData = createAsyncThunk(
  "airQuality/fetchData",
  async (params: { sidoName: string | null }, thunkAPI) => {
    try {
      const response = await getAirQualityData({
        returnType: "JSON",
        numOfRows: 1000,
        pageNo: 1,
        sidoName: params.sidoName,
        ver: "1.3",
      });

      const FormatData = response.map((item: AirQualityResponse) => ({
        dataTime: item.dataTime,
        mangName: item.mangName,
        sidoName: item.sidoName,
        stationName: item.stationName,
        pm25Grade1h: item.pm25Grade1h,
        pm25Grade: item.pm25Grade,
        pm25Value24: item.pm25Value24,
        pm10Grade1h: item.pm10Grade1h,
        pm10Grade: item.pm10Grade,
        pm10Value24: item.pm10Value24,
      })) as AirQualityCustom[];
      return FormatData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "단기 예보 데이터를 가져오는 데 실패했습니다."
      );
    }
  }
);

const initialState = {
  data: [] as AirQualityCustom[],
  loading: false,
  error: null as string | null,
};

const AirQuality = createSlice({
  name: "airQuality",
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
        state.error =
          action.error.message ||
          "미세 먼지 데이터를 불러오는 데 실패했습니다.";
      });
  },
});

export default AirQuality.reducer;
