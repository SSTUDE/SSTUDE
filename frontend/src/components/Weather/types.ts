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