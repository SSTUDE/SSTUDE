import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const SERVICE_KEY = process.env.REACT_APP_API_KEY

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
    const response = await axios.get(BASE_URL, {
      params: {
        serviceKey: SERVICE_KEY,
        ...params
      }
    });   
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};
