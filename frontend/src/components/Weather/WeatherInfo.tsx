import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShortData } from '../../store/WeatherSlice';
import { RootState, AppDispatch } from '../../store/store';
import { WeatherDataCustom, } from './types';
import SkyIcon from './Hourly/SkyIcon';


const WeatherInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: RootState) => state.weather.data); // 타입 지정
  const isLoading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  // 날짜, 시간과 관련된 변수
  const day = new Date();
  const hour = day.getHours(); 
  const minutes = day.getMinutes();
  const year = day.getFullYear(); 
  const month = (day.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더한다.
  const date = day.getDate().toString().padStart(2, '0'); 

  let formattedDate = `${year}${month}${date}`;
  
  // 시간이 05:00를 지나지 않았다면 전날
  if (hour < 5) {
    day.setDate(day.getDate() - 1);

    const yYear = day.getFullYear();
    const yMonth = (day.getMonth() + 1).toString().padStart(2, '0');
    const yDate = day.getDate().toString().padStart(2, '0');

    formattedDate = `${yYear}${yMonth}${yDate}`;
  }

  const currentDate = formattedDate; // 'YYYYMMDD' 형식

  useEffect(() => {
    dispatch(fetchShortData({
      base_date: formattedDate,
      base_time: '0500',
      nx: 86,
      ny: 95
    }));
  }, [dispatch]);

  if (isLoading) return <span>데이터를 불러오는 중...</span>;
  if (error) return <span>에러 발생: {error}</span>;
  
// 현재 시간 이후의 데이터 필터링
const CustomData = weatherData.filter((item: WeatherDataCustom) => {
  const itemTime = parseInt(item.fcstTime); 
  const nextHour = hour < 23 ? (hour + 1) * 100 : 0; // 다음 시간 계산 (23시 이후는 0시로 처리)

  // 현재 시간이 30분 미만인 경우
  if (minutes < 30) {
    return (item.fcstDate === currentDate && itemTime >= hour * 100) || (item.fcstDate > currentDate);
  } else {
    // 현재 시간이 30분 이상인 경우
    return (item.fcstDate === currentDate && itemTime >= nextHour) || (item.fcstDate > currentDate);
  }
  });
  // console.log(CustomData);

  const findTemperatureExtremes = (data: WeatherDataCustom[]) => {
    const periodData = data.filter(item => item.fcstDate === currentDate && item.category === "TMP");
  
    if (periodData.length === 0) {
      return { maxTemperature: undefined, minTemperature: undefined };
    }
  
    let maxTemperature = periodData[0];
    let minTemperature = periodData[0];
  
    periodData.forEach(item => {
      const itemValue = parseInt(item.fcstValue);
      if (itemValue > parseInt(maxTemperature.fcstValue)) {
        maxTemperature = item;
      }
      if (itemValue < parseInt(minTemperature.fcstValue)) {
        minTemperature = item;
      }
    });
  
    return { maxTemperature, minTemperature };
  };
  

  // 해당하는 데이터 저장
  const TempData = CustomData.find((item : WeatherDataCustom) => item.category === "TMP");
  const SkyData = CustomData.find((item : WeatherDataCustom) => item.category === "SKY");
  const RainData = CustomData.find((item : WeatherDataCustom) => item.category === "PTY");
  const { maxTemperature, minTemperature } = findTemperatureExtremes(weatherData);

  // 날씨 상태 표시
  const SkyStatus = SkyData?.fcstValue
  const RainTypeStatus = RainData?.fcstValue
  let SkyContidion = ''

  if (RainTypeStatus === '1' || RainTypeStatus === '2') {
    SkyContidion = '비'
  } 
  else if (RainTypeStatus === '4') {
    SkyContidion = '소나기'
  }
  else if (RainTypeStatus === '3') {
    SkyContidion = '눈'
  }
  // 낮 시간대에는 Sun 아이콘, 밤 시간대에는 Moon 아이콘을 렌더링
  else if(SkyStatus === '1') {
    SkyContidion = '맑음'
  } else if (SkyStatus === '3') {
    SkyContidion = '구름 많음'
  } else if (SkyStatus === '4') {
    SkyContidion = '흐림'
  }
    
  return (
    <Container>
      <WeatherCon>
        <SkyInfoCon>
          {/* find로 인한 undefined 방지 */}
          {SkyData && RainData && (
            <SkyIcon 
              dailySky={SkyData}
              RainData={RainData}
              size={180}
            />
          )}
          {/* <BsCloudFill size={200}/> */}
          {TempData && (
          <WeatherTXTCon>
            <div>{SkyContidion}</div>
            <div>{TempData.fcstValue}°C</div>
          </WeatherTXTCon>
        )}
        </SkyInfoCon>
          {maxTemperature && minTemperature && (
            <div className='temp'>
              <div className='maxTemp'>최고 기온 : {`${maxTemperature.fcstValue}°C`}</div>
              <div className='minTemp'>최저 기온 : {`${minTemperature.fcstValue}°C`}</div>
            </div>
          )}
      </WeatherCon>
      <DustCon>

      </DustCon>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 593px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: lightblue; */
`

const WeatherCon = styled.div`
  width: 100%;
  height: 50%;
  /* background-color: lightcoral; */
  display: flex;
  flex-direction: column;
  
  .temp {
    font-size: 25px;
    margin-top: 20px;
  }

  .maxTemp {
    display: flex;
    justify-content: flex-start;
    margin-left: 30px;
  }

  .minTemp {
    display: flex;
    justify-content: flex-end;
    margin-right: 30px;
  }
`

const SkyInfoCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const WeatherTXTCon = styled.div`
  font-size: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const DustCon = styled.div`
  width: 100%;
  height: 50%;
  background-color: lightgoldenrodyellow;
`

export default WeatherInfo