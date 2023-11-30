import Week from './Week/Week'
import Today from './Today/Today'
import Hourly from './Hourly/Hourly'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoadingSpinner from './LoadingSpinner';
import React, { useState, useEffect } from 'react'
import { getMidLandAreaCode } from '../../components/Weather/areaCodeType'
import { getWeatherData, getMidLandForecast, getMidTemperatureForecast } from '../../apis/api'
import {
  WeatherDataResponse,
  WeatherDataCustom,
  MidLandForecastResponse,
  MidLandForecastCustom,
  MidTempForecastResponse,
  MidTempForecastCustom,
  MidForecastCombined
} from './types';

interface WeatherProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Weather: React.FC<WeatherProps> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const position = useSelector((state: RootState) => state.position);

  let { nX, nY, arePt1, arePt2 } = {
    nX: position.nX,
    nY: position.nY,
    arePt1: position.arePt1,
    arePt2: position.arePt2,
  };

  const regionCode = getMidLandAreaCode(arePt1, arePt2);

  const [dailySky, setDailySky] = useState<WeatherDataCustom[]>([]);
  const [TempDatas, setTempDatas] = useState<WeatherDataCustom[]>([]);
  const [RainRateDatas, setRainRateDatas] = useState<WeatherDataCustom[]>([]);
  const [RainAmountDatas, setRainAmountDatas] = useState<WeatherDataCustom[]>([]);
  const [HumidityDatas, setHumidityDatas] = useState<WeatherDataCustom[]>([]);
  const [NowDatas, setNowDatas] = useState<WeatherDataCustom[]>([]);
  const [RainTypeDatas, setRainTypeDatas] = useState<WeatherDataCustom[]>([]);

  const [LandShortForDatas, setLandShortForDatas] = useState<MidForecastCombined[]>([]);

  const [LandForDatas, setLandForDatas] = useState<MidLandForecastCustom[]>([]);
  const [LandTempForDatas, setLandTempForDatas] = useState<MidTempForecastCustom[]>([]);
  const [CombinedDatas, setCombinedDatas] = useState<MidForecastCombined[]>([]);

  const sDay = new Date();
  const sHour = sDay.getHours();
  const sMinutes = sDay.getMinutes();

  if (sHour < 5) {
    sDay.setDate(sDay.getDate() - 1);
  }

  const sYear = sDay.getFullYear();
  const sMonth = (sDay.getMonth() + 1).toString().padStart(2, '0');
  const sDate = sDay.getDate().toString().padStart(2, '0');
  const formattedSDate = `${sYear}${sMonth}${sDate}`

  const mDay = new Date();
  let mHour = mDay.getHours();
  let formattedMDate = '';
  let mYear, mMonth, mDate
  let formattedMHour: string;

  if (mHour < 18) {
    mDay.setDate(mDay.getDate() - 1);
    formattedMHour = '1800'
  } else {
    formattedMHour = '0600'
  }

  mYear = mDay.getFullYear().toString();
  mMonth = (mDay.getMonth() + 1).toString().padStart(2, '0');
  mDate = mDay.getDate().toString().padStart(2, '0');

  formattedMDate = `${mYear}${mMonth}${mDate}`;

  const day = new Date();
  const year = day.getFullYear();
  const month = (day.getMonth() + 1).toString().padStart(2, '0');
  const date = day.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}${month}${date}`

  const tomorrow = (sDay.getDate() + 1).toString().padStart(2, '0');
  const formattedDateTommor = `${year}${month}${tomorrow}`;

  const isAm = (fcstTime: string) => parseInt(fcstTime) < 1200;

  const currentDate = formattedDate;

  const fetchShortData = async () => {
    const nxString = typeof nX === 'string' ? parseInt(nX) : nX;
    const nyString = typeof nY === 'string' ? parseInt(nY) : nY;
    try {
      const response = await getWeatherData({
        numOfRows: 1000,
        pageNo: 1,
        dataType: "JSON",
        base_date: formattedSDate,
        base_time: "0500",
        nx: nxString,
        ny: nyString
      });
      const items = response;

      const FormatData = items.map((item: WeatherDataResponse) => ({
        category: item.category,
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue
      }))

      const CustomData = FormatData.filter((item: WeatherDataCustom) => {
        const itemTime = parseInt(item.fcstTime);
        const nextHour = sHour < 23 ? (sHour + 1) * 100 : 0;

        if (sMinutes < 30) {
          return (item.fcstDate === currentDate && itemTime >= sHour * 100) || (item.fcstDate > currentDate);
        } else {
          return (item.fcstDate === currentDate && itemTime >= nextHour) || (item.fcstDate > currentDate);
        }
      });

      const CloudDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "SKY");
        })
      setDailySky(CloudDatas);

      const TempDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "TMP");
        })
      setTempDatas(TempDatas);

      const RainRateDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "POP");
        })
      setRainRateDatas(RainRateDatas);

      const RainAmountDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "PCP");
        })
      setRainAmountDatas(RainAmountDatas);

      const HumidityDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "REH");
        })
      setHumidityDatas(HumidityDatas);

      const RainTypeDatas = CustomData
        .filter((item: WeatherDataCustom) => {
          return (item.category === "PTY");
        })
      setRainTypeDatas(RainTypeDatas);

      const TempData = CustomData.find((item: WeatherDataCustom) => item.category === "TMP");
      const HumidityData = CustomData.find((item: WeatherDataCustom) => item.category === "REH");
      const WindSpeedData = CustomData.find((item: WeatherDataCustom) => item.category === "WSD");
      const SkyData = CustomData.find((item: WeatherDataCustom) => item.category === "SKY");
      const RainData = CustomData.find((item: WeatherDataCustom) => item.category === "PTY");
      const highestRainRateData = CustomData
        .filter((item: WeatherDataCustom) => item.category === "POP" && item.fcstDate === currentDate)
        .reduce((max: WeatherDataCustom, item: WeatherDataCustom) => max.fcstValue > item.fcstValue ? max : item);

      const NowDatas: (WeatherDataCustom)[] = [
        TempData,
        HumidityData,
        WindSpeedData,
        SkyData,
        RainData,
        highestRainRateData
      ].filter(item => item !== undefined);
      setNowDatas(NowDatas);

      const todayData = FormatData.filter((item: WeatherDataCustom) => item.fcstDate === currentDate);
      const tomorrowData = FormatData.filter((item: WeatherDataCustom) => item.fcstDate === formattedDateTommor);

      const findHighestRainRate = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
        const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod && item.category === "POP");
        return periodData.reduce((max: WeatherDataCustom, item: WeatherDataCustom) => {
          const maxValue = parseInt(max.fcstValue);
          const itemValue = parseInt(item.fcstValue);
          return maxValue > itemValue ? max : item;
        });
      };

      const getWeatherCondition = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
        const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod);
        const rainData = periodData.find(item => item.category === "PTY" &&
          (item.fcstValue === '1' || item.fcstValue === '2' || item.fcstValue === '4'));
        const snowData = periodData.find(item => item.category === "PTY" && item.fcstValue === '3');
        const skyData = periodData.find(item => item.category === "SKY");

        if (rainData) {
          return '비';
        }
        else if (snowData) {
          return '눈';
        }
        else if (skyData) {
          switch (skyData.fcstValue) {
            case '1':
              return '맑음';
            case '3':
              return '구름많음';
            case '4':
              return '흐림';
            default:
              return '알 수 없음';
          }
        } else {
          return '날씨 데이터 없음';
        }
      };

      const findMaxTemperature = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
        const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod && item.category === "TMP");
        return periodData.reduce((max: WeatherDataCustom, item: WeatherDataCustom) => {
          const maxValue = parseInt(max.fcstValue);
          const itemValue = parseInt(item.fcstValue);
          return maxValue > itemValue ? max : item;
        });
      };

      const findMinTemperature = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
        const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod && item.category === "TMP");
        return periodData.reduce((min: WeatherDataCustom, item: WeatherDataCustom) => {
          const minValue = parseInt(min.fcstValue);
          const itemValue = parseInt(item.fcstValue);
          return minValue < itemValue ? min : item;
        });
      };

      const LandArray = [{
        rnStAm: parseInt(findHighestRainRate(todayData, true).fcstValue),
        rnStPm: parseInt(findHighestRainRate(todayData, false).fcstValue),
        wfAm: getWeatherCondition(todayData, true),
        wfPm: getWeatherCondition(todayData, false),
        taMin: parseInt(findMinTemperature(todayData, true).fcstValue),
        taMax: parseInt(findMaxTemperature(todayData, false).fcstValue),
      },
      {
        rnStAm: parseInt(findHighestRainRate(tomorrowData, true).fcstValue),
        rnStPm: parseInt(findHighestRainRate(tomorrowData, false).fcstValue),
        wfAm: getWeatherCondition(tomorrowData, true),
        wfPm: getWeatherCondition(tomorrowData, false),
        taMin: parseInt(findMinTemperature(tomorrowData, true).fcstValue),
        taMax: parseInt(findMaxTemperature(tomorrowData, false).fcstValue),
      }
      ];
      setLandShortForDatas(LandArray);
      return Promise.resolve(LandArray);

    } catch (error) {
      console.error("단기 예보 데이터를 가져오는 데 실패했습니다:", error);
      return Promise.reject(error);
    }
  };

  const fetchMidLandData = async () => {
    try {
      const response = await getMidLandForecast({
        pageNo: 1,
        numOfRows: 1000,
        dataType: "JSON",
        regId: regionCode,
        tmFc: `${formattedMDate}${formattedMHour}`,
      });

      const items: MidLandForecastResponse[] = response;
      const dailyForecastData: MidLandForecastCustom[] = [];

      for (let i = 3; i <= 7; i++) {
        dailyForecastData.push({
          rnStAm: items[0][`rnSt${i}Am`] as number,
          rnStPm: items[0][`rnSt${i}Pm`] as number,
          wfAm: items[0][`wf${i}Am`] as string,
          wfPm: items[0][`wf${i}Pm`] as string,
        });
      }
      setLandForDatas(dailyForecastData);
      return Promise.resolve(dailyForecastData);

    } catch (error) {
      console.error("중기 기온 데이터를 가져오는 데 실패했습니다:", error);
      return Promise.reject(error);
    }
  };

  const fetchMidTempData = async () => {
    try {
      const response = await getMidTemperatureForecast({
        pageNo: 1,
        numOfRows: 1000,
        dataType: "JSON",
        regId: "11H10602",
        tmFc: `${formattedMDate}${formattedMHour}`,
      });

      const items: MidTempForecastResponse[] = response;
      const dailyForecastData: MidTempForecastCustom[] = [];

      for (let i = 3; i <= 7; i++) {
        dailyForecastData.push({
          taMin: items[0][`taMin${i}`] as number,
          taMax: items[0][`taMax${i}`] as number,
        });
      }
      setLandTempForDatas(dailyForecastData);
      return Promise.resolve(dailyForecastData);

    } catch (error) {
      console.error("중기 육상 데이터를 가져오는 데 실패했습니다:", error);
      return Promise.reject(error);
    }
  };

  const combineForecastData = (
    landForDatas: MidLandForecastCustom[],
    landTempForDatas: MidTempForecastCustom[],
    LandShortForDatas: MidForecastCombined[]
  ): MidForecastCombined[] => {
    const combinedData = landForDatas.map((landData, index) => {
      const tempData = landTempForDatas[index];
      return {
        ...landData,
        taMin: tempData.taMin,
        taMax: tempData.taMax,
      };
    });

    combinedData.unshift(...LandShortForDatas.slice(0, 2));
    return combinedData;
  };

  useEffect(() => {
    const fetchShortDataPromise = fetchShortData();
    const fetchMidLandDataPromise = fetchMidLandData();
    const fetchMidTempDataPromise = fetchMidTempData();

    Promise.all([fetchShortDataPromise, fetchMidLandDataPromise, fetchMidTempDataPromise])
      .then(([shortData, midLandData, midTempData]) => {
        setLandShortForDatas(shortData);
        setLandForDatas(midLandData);
        setLandTempForDatas(midTempData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (LandForDatas.length > 0 && LandTempForDatas.length > 0 && LandShortForDatas.length > 0) {
      const allCombinedData = combineForecastData(LandForDatas, LandTempForDatas, LandShortForDatas);
      setCombinedDatas(allCombinedData);
    }
  }, [LandForDatas, LandTempForDatas, LandShortForDatas]);

  return (
    <Container onClick={onClick}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
            RainTypeDatas={RainTypeDatas}
          />
          {CombinedDatas.length > 2 ? (
            <Week
              CombinedDatas={CombinedDatas}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `

export default Weather