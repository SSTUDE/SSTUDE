import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShortData } from '../../store/WeatherSlice';
import { fetchAirQualityData } from '../../store/AirQualitySlice'
import { RootState, AppDispatch } from '../../store/store';
import { WeatherDataCustom, AirQualityCustom } from './types';
import { findRegion } from './areaCodeType'
import SkyIcon from './Hourly/SkyIcon';
import AirIcon from './AirIcon';
import LoadingSpinner from './LoadingSpinner';

interface WeatherInfoProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const position = useSelector((state: RootState) => state.position);

  let { nX, nY, arePt1, arePt2, arePt3 } = {
    nX: position.nX,
    nY: position.nY,
    arePt1: position.arePt1,
    arePt2: position.arePt2,
    arePt3: position.arePt3,
  };
  console.log(nX, nY, arePt1, arePt2, arePt3);
  const airRegionCode = findRegion(arePt1, arePt2);
  console.log(airRegionCode);

  // 단기예보 관련 데이터
  const weatherData = useSelector((state: RootState) => state.weather.data); 
  const isLoading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  // 대기질 데이터와 관련된 상태
  const airQualityData = useSelector((state: RootState) => state.airQuality.data);
  // console.log(airQualityData);
  const isAirQualityLoading = useSelector((state: RootState) => state.airQuality.loading);
  const airQualityError = useSelector((state: RootState) => state.airQuality.error);
  

  // 단기 데이터(요청 시간)
  const sDay = new Date();
  const sHour = sDay.getHours(); 
  const sMinutes = sDay.getMinutes();

  // 시간이 05:00를 지나지 않았다면 전날
  if (sHour < 5) {
    sDay.setDate(sDay.getDate() - 1);
  }

  const sYear = sDay.getFullYear(); 
  const sMonth = (sDay.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더한다.
  const sDate = sDay.getDate().toString().padStart(2, '0'); 
  const formattedSDate =`${sYear}${sMonth}${sDate}`

  const currentDate = formattedSDate; // 'YYYYMMDD' 형식

  useEffect(() => {
    const nxString = typeof nX === 'string' ? parseInt(nX) : nX;
    const nyString = typeof nY === 'string' ? parseInt(nY) : nY;

    // 단기 예보 데이터 요청
    dispatch(fetchShortData({
      base_date: formattedSDate,
      base_time: '0500',
      nx: nxString,
      ny: nyString
    }));

    // 대기질 데이터 요청
    dispatch(fetchAirQualityData({
      sidoName: airRegionCode,
    }));
  }, [dispatch]);

  if (isLoading || isAirQualityLoading) {
    return <LoadingSpinner/>
  }
  if (error || airQualityError) {
    return <span>에러 발생 {error}</span>;
  }
  
// 현재 시간 이후의 데이터 필터링
const CustomData = weatherData.filter((item: WeatherDataCustom) => {
  const itemTime = parseInt(item.fcstTime); 
  const nextHour = sHour < 23 ? (sHour + 1) * 100 : 0; // 다음 시간 계산 (23시 이후는 0시로 처리)

  // 현재 시간이 30분 미만인 경우
  if (sMinutes < 30) {
    return (item.fcstDate === currentDate && itemTime >= sHour * 100) || (item.fcstDate > currentDate);
  } else {
    // 현재 시간이 30분 이상인 경우
    return (item.fcstDate === currentDate && itemTime >= nextHour) || (item.fcstDate > currentDate);
  }
  });
  // console.log(CustomData);

  // 공기 내 지역 데이터 필터링
  const airQualityCustomData = airQualityData.filter((item: AirQualityCustom) => {
    return arePt3 && item.stationName.includes(arePt3.substring(0, 2));
  })[0];

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
    <Container onClick={onClick}>
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
          {/* <StyledMoonFill size={180}/> */}
          {TempData && (
          <WeatherTXTCon>
            <div className='condition'>{SkyContidion}</div>
            <div className='temp'>{TempData.fcstValue}°C</div>
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
        {airQualityCustomData && (
            <AirIcon 
              pm10Grade={airQualityCustomData.pm10Grade1h || airQualityCustomData.pm10Grade}
              pm25Grade={airQualityCustomData.pm25Grade1h || airQualityCustomData.pm25Grade}
            />
          )}
      </DustCon>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 685px;
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
  justify-content: center;
  
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

  .temp {
    font-size: 40px;
  }
`

const DustCon = styled.div`
  width: 100%;
  height: 50%;
  /* background-color: lightgoldenrodyellow; */
`

export default WeatherInfo