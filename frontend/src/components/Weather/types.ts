export type SFGridItem ={
  areaCode: string|number,
  arePt1: string,
  arePt2: string |null,
  arePt3: string |null,
  nX: string|number,
  nY: string|number,
  longitude: string|number,
  latitude: string|number
};

// 단기 예보 API 응답 데이터 타입
export type WeatherDataResponse = {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
};

export type WeatherDataRequest = {
  base_date: string, 
  base_time: string, 
  nx: number, 
  ny: number
}

export type WeatherDataCustom = {
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}

// 중기 육상(강수, 하늘상태) 예보 API 응답 데이터 타입
export type MidLandForecastResponse = {
  regId: string;
  [key: string]: number | string; // 인덱스 시그니처 추가
  rnSt3Am: number;
  rnSt3Pm: number;
  rnSt4Am: number;
  rnSt4Pm: number;
  rnSt5Am: number;
  rnSt5Pm: number;
  rnSt6Am: number;
  rnSt6Pm: number;
  rnSt7Am: number;
  rnSt7Pm: number;
  rnSt8: number;
  rnSt9: number;
  rnSt10: number;
  wf3Am: string;
  wf3Pm: string;
  wf4Am: string;
  wf4Pm: string;
  wf5Am: string;
  wf5Pm: string;
  wf6Am: string;
  wf6Pm: string;
  wf7Am: string;
  wf7Pm: string;
  wf8: string;
  wf9: string;
  wf10: string;
};

// 하늘상태, 강수확률
export type MidLandForecastCustom = {
  rnStAm: number;
  rnStPm: number;
  wfAm: string;
  wfPm: string;
};

// 중기 기온 예보 API 응답 데이터 타입(taMin3, taMax3)
export type MidTempForecastResponse = {
  regId: string;
  [key: string]: number | string; // 인덱스 시그니처 추가
  taMin3: number;
  taMin3Low: number;
  taMin3High: number;
  taMax3: number;
  taMax3Low: number;
  taMax3High: number;
  taMin4: number;
  taMin4Low: number;
  taMin4High: number;
  taMax4: number;
  taMax4Low: number;
  taMax4High: number;
  taMin5: number;
  taMin5Low: number;
  taMin5High: number;
  taMax5: number;
  taMax5Low: number;
  taMax5High: number;
  taMin6: number;
  taMin6Low: number;
  taMin6High: number;
  taMax6: number;
  taMax6Low: number;
  taMax6High: number;
  taMin7: number;
  taMin7Low: number;
  taMin7High: number;
  taMax7: number;
  taMax7Low: number;
  taMax7High: number;
  taMin8: number;
  taMin8Low: number;
  taMin8High: number;
  taMax8: number;
  taMax8Low: number;
  taMax8High: number;
  taMin9: number;
  taMin9Low: number;
  taMin9High: number;
  taMax9: number;
  taMax9Low: number;
  taMax9High: number;
  taMin10: number;
  taMin10Low: number;
  taMin10High: number;
  taMax10: number;
  taMax10Low: number;
  taMax10High: number;
};

export type MidTempForecastCustom = {
  taMin: number;
  taMax: number;
}

// 중기 육상 예보와 중기 기온 예보를 합친 커스텀 타입
export type MidForecastCombined = {
  rnStAm: number;
  rnStPm: number;
  wfAm: string;
  wfPm: string;
  taMin: number;
  taMax: number;
};

// 미세먼지 데이터 반환
export type AirQualityCustom = {
  mangName: string;
  dataTime: string;
  sidoName: string;
  stationName: string;
  pm25Grade1h: string;
  pm10Grade1h: string;
  pm25Value24: string;
  pm10Value24: string;
};

export type AirQualityResponse = {
  pm25Grade1h: string;
  pm10Value24: string;
  so2Value: string;
  pm10Grade1h: string;
  pm10Value: string;
  o3Grade: string;
  pm25Flag: null | string;
  khaiGrade: string;
  pm25Value: string;
  no2Flag: null | string;
  mangName: string;
  stationName: string;
  no2Value: string;
  so2Grade: string;
  coFlag: null | string;
  khaiValue: string;
  coValue: string;
  pm10Flag: null | string;
  sidoName: string;
  pm25Value24: string;
  no2Grade: string;
  o3Flag: null | string;
  pm25Grade: string;
  so2Flag: null | string;
  coGrade: string;
  dataTime: string;
  pm10Grade: string;
  o3Value: string;
};
