import React, { useState, useEffect } from 'react'
import Today from './Today/Today'
import Week from './Week/Week'
import Hourly from './Hourly/Hourly'
import { getWeatherData, getMidLandForecast, getMidTemperatureForecast } from '../../apis/api'
import { 
  WeatherDataResponse, 
  WeatherDataCustom, 
  MidLandForecastResponse, 
  MidLandForecastCustom, 
  MidTempForecastResponse, 
  MidTempForecastCustom, 
  MidForecastCombined } from './types';

const Weather = () => {
  const [dailySky, setDailySky] = useState<WeatherDataCustom[]>([]);
  const [TempDatas, setTempDatas] = useState<WeatherDataCustom[]>([]);
  const [RainRateDatas, setRainRateDatas] = useState<WeatherDataCustom[]>([]);
  const [RainAmountDatas, setRainAmountDatas] = useState<WeatherDataCustom[]>([]);
  const [HumidityDatas, setHumidityDatas] = useState<WeatherDataCustom[]>([]);
  const [NowDatas, setNowDatas] = useState<WeatherDataCustom[]>([]);

  const [LandShortForDatas, setLandShortForDatas] = useState<WeatherDataCustom[]>([]);
  const [LandForDatas, setLandForDatas] = useState<MidLandForecastCustom[]>([]);
  const [LandTempForDatas, setLandTempForDatas] = useState<MidTempForecastCustom[]>([]);
  const [CombinedDatas, setCombinedDatas] = useState<MidForecastCombined[]>([]);

  const day = new Date();
  const hour = day.getHours(); 
  const minutes = day.getMinutes();

  // 시간이 05:00를 지나지 않았다면 전날
  if (hour < 5) {
    day.setDate(day.getDate() - 1);
  }

  const year = day.getFullYear(); 
  const month = (day.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더한다.
  const yesterday = (day.getDate()-1).toString().padStart(2, '0'); 
  const date = day.getDate().toString().padStart(2, '0'); 
  const tomorrow  = (day.getDate()+1).toString().padStart(2, '0'); 

  const formattedDateYester = `${year}${month}${yesterday}`;
  const formattedDate = `${year}${month}${date}`;
  const formattedDateTommor = `${year}${month}${tomorrow}`;

  const isAm = (fcstTime: string) => parseInt(fcstTime) < 1200;

  // 현재 시간을 기점으로 이후 데이터만 사용하기 위해
  // 밤 12시 이후 다음날 5시 이전에 대한 날짜에 오류 수정 필요
  const currentDate = formattedDate; // 'YYYYMMDD' 형식
  const currentTime = `${hour.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;


  const fetchShortData = async () => {
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formattedDateYester,
        base_time: "0500",
        nx: 86,
        ny: 95
      });

      // 필요한 데이터만 포매팅
      const items = response;
      const FormatData = items.map((item: WeatherDataResponse) => ({
        category: item.category,
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue
      }))
      
      // 현재 시간 이후의 데이터 필터링
      const CustomData = FormatData
      .filter((item: WeatherDataCustom) => {
        return (item.fcstDate === currentDate && item.fcstTime >= currentTime) || (item.fcstDate > currentDate);
      });
      // console.log(CustomData);

      // 하늘 정보만 필터링.
      const CloudDatas = CustomData
      .filter((item: WeatherDataCustom) => {
        return (item.category === "SKY");
      })
      setDailySky(CloudDatas);
      // console.log(CloudDatas);

      // 기온 정보만 필터링
      const TempDatas = CustomData
      .filter((item: WeatherDataCustom) => {
        return (item.category === "TMP");
      })
      setTempDatas(TempDatas);
      // console.log(TempDatas);

      // 강수확률 정보 필터링
      const RainRateDatas = CustomData
      .filter((item: WeatherDataCustom) => {
        return (item.category === "POP");
      })
      setRainRateDatas(RainRateDatas);
      // console.log(RainRateDatas);

      // 강수량 정보 필터링
      const RainAmountDatas = CustomData
      .filter((item: WeatherDataCustom) => {
        return (item.category === "PCP");
      })
      setRainAmountDatas(RainAmountDatas);
      // console.log(RainAmountDatas);
      
      // 습도 정보 필터링
      const HumidityDatas = CustomData
      .filter((item: WeatherDataCustom) => {
        return (item.category === "REH");
      })
      setHumidityDatas(HumidityDatas);
      // console.log(HumidityDatas);

      // 지금 정보(기온, 강수확률, 습도, 풍속=WSD) 필터링
      const TempData = CustomData.find((item : WeatherDataCustom) => item.category === "TMP");
      const HumidityData = CustomData.find((item : WeatherDataCustom) => item.category === "REH");
      const WindSpeedData = CustomData.find((item : WeatherDataCustom) => item.category === "WSD");
      const SkyData = CustomData.find((item : WeatherDataCustom) => item.category === "SKY");
      const RainData = CustomData.find((item : WeatherDataCustom) => item.category === "PCP");
      const highestRainRateData = CustomData
      .filter((item : WeatherDataCustom) => item.category === "POP" && item.fcstDate === currentDate)
      .reduce((max: WeatherDataCustom, item: WeatherDataCustom) => max.fcstValue > item.fcstValue ? max : item);

      const NowDatas : (WeatherDataCustom)[] = [
        TempData,
        HumidityData,
        WindSpeedData,
        SkyData,
        RainData,
        highestRainRateData
        ].filter(item => item !== undefined);
      setNowDatas(NowDatas);
      // console.log(NowDatas);

    } catch (error) {
      console.error("단기 예보 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  // 중기 육상 예보 API
  const fetchMidLandData = async () => {
    try {
      const response = await getMidLandForecast({
        pageNo: 1,
        numOfRows: 1000,
        dataType: "JSON",
        regId: "11H10000",
        tmFc: "202311090600",
      });

      const items : MidLandForecastResponse[] = response;
      // console.log(items);
      const dailyForecastData: MidLandForecastCustom[] = [];

      // API로부터 받은 데이터를 날짜별로 매핑
      for (let i = 3; i <= 7; i++) {
        dailyForecastData.push({
          rnStAm: items[0][`rnSt${i}Am`] as number,
          rnStPm: items[0][`rnSt${i}Pm`] as number,
          wfAm: items[0][`wf${i}Am`] as string,
          wfPm: items[0][`wf${i}Pm`] as string,
        });
      }
      setLandForDatas(dailyForecastData);
      // console.log(dailyForecastData);
      return dailyForecastData; // 함수에서 직접 반환하는 경우

    } catch (error) {
      console.error("중기 기온 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  // 중기 기온 예보 API
  const fetchMidTempData = async () => {
    try {
      const response = await getMidTemperatureForecast({
        pageNo: 1,
        numOfRows: 1000,
        dataType: "JSON",
        regId: "11H10602",
        tmFc: "202311090600",
      });

      const items : MidTempForecastResponse[] = response;
      // console.log(items);
      const dailyForecastData: MidTempForecastCustom[] = [];

      // API로부터 받은 데이터를 날짜별로 매핑
      for (let i = 3; i <= 7; i++) {
        dailyForecastData.push({
          taMin: items[0][`taMin${i}`] as number,
          taMax: items[0][`taMax${i}`] as number,
        });
      }
      setLandTempForDatas(dailyForecastData);
      // console.log(dailyForecastData);
      return dailyForecastData; // 함수에서 직접 반환하는 경우

    } catch (error) {
      console.error("중기 육상 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  // LandForDatas와 LandTempForDatas를 합치는 함수
  const combineForecastData = (
    landForDatas: MidLandForecastCustom[],
    landTempForDatas: MidTempForecastCustom[]
  ): MidForecastCombined[] => {
    return landForDatas.map((landData, index) => {
      const tempData = landTempForDatas[index];
      return {
        ...landData,
        taMin: tempData.taMin,
        taMax: tempData.taMax,
      };
    });
  };

  // useEffect 내에서 데이터를 합치고 <Week/> 컴포넌트에 props로 넘겨주는 로직
  useEffect(() => {
    const fetchData = async () => {
      // fetchShortData();
      await fetchMidLandData();
      await fetchMidTempData();
      const combinedData : MidForecastCombined[] = combineForecastData(LandForDatas, LandTempForDatas);
      setCombinedDatas(combinedData); 
      };
      fetchData();
    }, []);

  return (
    <>
      {NowDatas.length > 0 ? (
        <Today NowDatas={NowDatas} />
      ) : (
        <></>
      )}
      <Hourly 
        dailySky={dailySky} 
        TempDatas={TempDatas} 
        RainRateDatas={RainRateDatas} 
        RainAmountDatas={RainAmountDatas}
        HumidityDatas={HumidityDatas}
      />
      {CombinedDatas.length > 0 ? (
        <Week
        CombinedDatas={CombinedDatas}
        />
      ) : (
        <></>
      )}
  </>
  )
}

export default Weather