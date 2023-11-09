export const sunny = "맑음"; // sky code =1
export const cloudy = "구름많음"; // sky code =3
export const veryCloudy = "흐림"; // sky code =4
export const spellRain = "한때 비";
export const rainy = "비"; // pty code =1 or 5
export const snowRain = "비 또는 눈"; //pty =2 or 6
export const snow = "눈"; // pty code =3 or 7
export const shower = "소나기"; //pty code=4
export const cldRain = "구름많고 비";
export const cldSnow = "구름많고 눈";
export const cldRainSnow = "구름많고 비/눈";
export const cldShower = "구름많고 소나기";
export const vrCldRain = "흐리고 비";
export const vrCldSnow = "흐리고 눈";
export const vrCldRainSnow = "흐리고 비/눈";
export const vrCldShower = "흐리고 소나기";

export type HourWeather = {
    date: string;
    hour: string; //24시간제
    sky: SkyType;
    /** 온도
     */
    temp: number;
    /**강수확률(%)*/
    pop: string;
    /**강수량(mm)*/
    pcp: string;
    /**1시간 신적설량(cm) */
    sno: string;
    //습도
    reh: string;
  };

export type SkyCodeType = typeof sunny | typeof cloudy | typeof veryCloudy;

export type PtyCodeType =
  | typeof sunny
  | typeof rainy
  | typeof snowRain
  | typeof snow
  | typeof shower;

export type SkyType =
  | SkyCodeType
  | PtyCodeType
  | typeof spellRain
  | typeof cldRain
  | typeof cldSnow
  | typeof cldRainSnow
  | typeof cldShower
  | typeof vrCldRain
  | typeof vrCldSnow
  | typeof vrCldRainSnow
  | typeof vrCldShower;

export type DailyWeather = {
  date: string;
  hourly: HourWeather[];
};

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