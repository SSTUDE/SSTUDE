import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/1360000";
const SERVICE_KEY = process.env.REACT_APP_WEATHER_API_KEY
const SERVICE_KEY_MINE = process.env.REACT_APP_LANDWEATHER_API_KEY

// 단기 날씨 정보 요청
export const getWeatherData = async (params: {
  numOfRows?: number;
  pageNo?: number;
  dataType ?: string
  base_date: string;
  base_time: string;
  nx: number;
  ny: number;
}) => {

  try {
    const response = await axios.get(`${BASE_URL}/VilageFcstInfoService_2.0/getVilageFcst`, {
      params: {
        serviceKey: SERVICE_KEY,
        ...params
      }
    });   
    return response.data.response.body.items.item;

  } catch (error) {
    console.error("단기 예보 API 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 중기 육상(강수확률, 하늘상태) 예보 API
export const getMidLandForecast = async (params: {
  pageNo?: number;
  numOfRows?: number;
  dataType?: string;
  regId: string;
  tmFc: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/MidFcstInfoService/getMidLandFcst`, {
      params: {
        serviceKey: SERVICE_KEY_MINE,
        ...params
      }
    });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error("중기 육상 예보 API 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 중기 기온 정보 API
export const getMidTemperatureForecast = async (params: {
  numOfRows?: number;
  pageNo?: number;
  dataType?: string;
  regId: string;
  tmFc: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/MidFcstInfoService/getMidTa`, {
      params: {
        serviceKey: SERVICE_KEY_MINE,
        ...params
      }
    });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error("중기 기온 정보 API 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};