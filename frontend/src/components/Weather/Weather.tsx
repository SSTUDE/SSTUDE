  import React, { useState, useEffect } from 'react'
  import styled from 'styled-components';
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
    // 단기 예보 데이터 표에서 사용하는 데이터 저장
    const [dailySky, setDailySky] = useState<WeatherDataCustom[]>([]);
    const [TempDatas, setTempDatas] = useState<WeatherDataCustom[]>([]);
    const [RainRateDatas, setRainRateDatas] = useState<WeatherDataCustom[]>([]);
    const [RainAmountDatas, setRainAmountDatas] = useState<WeatherDataCustom[]>([]);
    const [HumidityDatas, setHumidityDatas] = useState<WeatherDataCustom[]>([]);
    const [NowDatas, setNowDatas] = useState<WeatherDataCustom[]>([]);

    // 단기 예보(최고/저 기온, (하늘상태, 강수량), 강수확률) - 오전/오후 데이터 저장
    const [LandShortForDatas, setLandShortForDatas] = useState<MidForecastCombined[]>([]);

    // 중기 예보(기온 / 육상(강수확률 , 하늘상태)) 데이터 저장
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
    // const yesterday = (day.getDate()-1).toString().padStart(2, '0'); 
    const date = day.getDate().toString().padStart(2, '0'); 
    const tomorrow  = (day.getDate()+1).toString().padStart(2, '0'); 

    // const formattedDateYester = `${year}${month}${yesterday}`;
    const formattedDate = `${year}${month}${date}`;
    const formattedDateTommor = `${year}${month}${tomorrow}`;
    
    // 중기 데이터 호출 시 필요
    let tmFcDate = `${year}${month}${date}`;
    let tmFcTime = hour < 18 ? "1800" : "0600";
  
    // 오늘 18시가 지나지 않았다면 전날 18시 데이터 사용
    if (hour < 18) {
      day.setDate(day.getDate() - 1);
  
      const yYear = day.getFullYear();
      const yMonth = (day.getMonth() + 1).toString().padStart(2, '0');
      const yDate = day.getDate().toString().padStart(2, '0');
  
      tmFcDate = `${yYear}${yMonth}${yDate}`;
    }

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
          base_date: formattedDate,
          base_time: "0500",
          nx: 86,
          ny: 95
        });
        const items = response;

        // 필요한 데이터만 포매팅
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

        // 오늘, 내일 데이터 필터링
        const todayData = FormatData.filter((item: WeatherDataCustom) => item.fcstDate === currentDate);
        const tomorrowData = FormatData.filter((item: WeatherDataCustom) => item.fcstDate === formattedDateTommor);

        // 오늘/오후 중에  강수확률을 가장 높은 함수
        const findHighestRainRate = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
          const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod && item.category === "POP");
          return periodData.reduce((max: WeatherDataCustom, item: WeatherDataCustom) => {
            const maxValue = parseInt(max.fcstValue);
            const itemValue = parseInt(item.fcstValue);
            return maxValue > itemValue ? max : item;
          });
        };
        // console.log(findHighestRainRate(todayData, true));

        // 오전/오후 중에 날씨 상태를 나타내는 함수
        const getWeatherCondition = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
          const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod);
          const rainData = periodData.find(item => item.category === "PCP" && !isNaN(Number(item.fcstValue)) && Number(item.fcstValue) > 0);
          const skyData = periodData.find(item => item.category === "SKY");

          if (rainData) {
            // 강수량이 존재하면 '비' 반환
            return '비';
          } else if (skyData) {
            // 강수량이 없으면 하늘 상태값에 따라 반환
            switch (skyData.fcstValue) {
              case '1':
              case '2':
                return '맑음';
              case '3':
                return '구름많음';
              case '4':
                return '흐림';
              default:
                return '알 수 없음'; // 예상치 못한 값에 대한 처리
            }
          } else {
            return '날씨 데이터 없음'; // 강수량과 하늘 상태 데이터가 없는 경우
          }
        };

        // 기온 데이터 중에서 최고 기온을 찾는 함수
        const findMaxTemperature = (data: WeatherDataCustom[], isAmPeriod: boolean) => {
          const periodData = data.filter(item => isAm(item.fcstTime) === isAmPeriod && item.category === "TMP");
          return periodData.reduce((max: WeatherDataCustom, item: WeatherDataCustom) =>  {
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

        // 오늘 오전/오후 강수확률 최고값과 하늘 상태 최고값을 찾습니다.
        const LandArray = [{
          rnStAm: parseInt(findHighestRainRate(todayData, true).fcstValue),
          rnStPm: parseInt(findHighestRainRate(todayData, false).fcstValue),
          wfAm: getWeatherCondition(todayData, true),
          wfPm:getWeatherCondition(todayData, false),
          taMin: parseInt(findMinTemperature(todayData, true).fcstValue), 
          taMax: parseInt(findMaxTemperature(todayData, false).fcstValue),
        },
        {
          rnStAm: parseInt(findHighestRainRate(tomorrowData, true).fcstValue),
          rnStPm: parseInt(findHighestRainRate(tomorrowData, false).fcstValue),
          wfAm: getWeatherCondition(tomorrowData, true),
          wfPm:getWeatherCondition(tomorrowData, false),
          taMin: parseInt(findMinTemperature(tomorrowData, true).fcstValue), 
          taMax: parseInt(findMaxTemperature(tomorrowData, false).fcstValue),
        }
      ];
      // console.log(LandArray);
      setLandShortForDatas(LandArray);
      return Promise.resolve(LandArray); // promise를 제대로 사용하기 위해

      } catch (error) {
        console.error("단기 예보 데이터를 가져오는 데 실패했습니다:", error);
        return Promise.reject(error);
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
          tmFc: `${tmFcDate}${tmFcTime}`,
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
        return Promise.resolve(dailyForecastData);

      } catch (error) {
        console.error("중기 기온 데이터를 가져오는 데 실패했습니다:", error);
        return Promise.reject(error);
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
          tmFc: `${tmFcDate}${tmFcTime}`,
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
        return Promise.resolve(dailyForecastData); // Promise를 반환

      } catch (error) {
        console.error("중기 육상 데이터를 가져오는 데 실패했습니다:", error);
        return Promise.reject(error);
      }
    };

    // LandForDatas와 LandTempForDatas를 합치는 함수
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
    
      // 이제 단기 예보 데이터를 합친다.
      combinedData.unshift(...LandShortForDatas.slice(0, 2));
      return combinedData;
    };
    
    
    useEffect(() => {
      // 데이터를 가져오는 함수들을 정의합니다.
      const fetchShortDataPromise = fetchShortData(); 
      const fetchMidLandDataPromise = fetchMidLandData(); 
      const fetchMidTempDataPromise = fetchMidTempData(); 
    
      // Promise.all을 사용하여 모든 데이터가 준비되었을 때 상태를 업데이트합니다.
      Promise.all([fetchShortDataPromise, fetchMidLandDataPromise, fetchMidTempDataPromise])
        .then(([shortData, midLandData, midTempData]) => {
          // 각각의 데이터를 상태로 설정합니다.
          setLandShortForDatas(shortData);
          setLandForDatas(midLandData);
          setLandTempForDatas(midTempData);
        })
        .catch(error => {
          console.error("데이터를 가져오는 데 실패했습니다:", error);
        });
    }, []);
    
    // 상태가 업데이트되었을 때 combineForecastData를 호출합니다.
    useEffect(() => {
      if (LandForDatas.length > 0 && LandTempForDatas.length > 0 && LandShortForDatas.length > 0) {
        const allCombinedData = combineForecastData(LandForDatas, LandTempForDatas, LandShortForDatas);
        setCombinedDatas(allCombinedData);
        // console.log(allCombinedData);
      }
    }, [LandForDatas, LandTempForDatas, LandShortForDatas]); // 상태를 의존성 배열에 추가합니다.
    
    return (
      <Container>
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
        {CombinedDatas.length > 2 ? (
          <Week
            CombinedDatas={CombinedDatas}
          />
        ) : (
          <></>
        )}
    </Container>
    )
  }

  const Container = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: gray;s */
  `

  export default Weather