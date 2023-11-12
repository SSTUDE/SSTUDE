import React, { useEffect } from 'react'
import styled from 'styled-components';
import { BsSunFill, BsCloudFill, BsMoonStarsFill, BsCloudRainFill, BsSnow2, BsCloudSunFill } from 'react-icons/bs'
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

  //
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

  const TempData = CustomData.find((item : WeatherDataCustom) => item.category === "TMP");
  const SkyData = CustomData.find((item : WeatherDataCustom) => item.category === "SKY");
  const RainData = CustomData.find((item : WeatherDataCustom) => item.category === "PTY");
  
  let highestRainRateData: WeatherDataCustom | undefined = undefined;

  CustomData.forEach((item: WeatherDataCustom) => {
    if (item.category === "POP" && item.fcstDate === currentDate) {
      if (!highestRainRateData || item.fcstValue > highestRainRateData.fcstValue) {
        highestRainRateData = item;
      }
    }
  });
    
  return (
    <Container>
      <WeatherCon>
        {/* find로 인한 undefined 방지 */}
        {SkyData && RainData && (
          <SkyIcon 
            dailySky={SkyData}
            RainData={RainData}
            size={200}
          />
        )}
        {/* <BsCloudFill size={200}/> */}
        
        <div>최고기온 : 최저 기온 : </div>
      </WeatherCon>
      <DustCon>

      </DustCon>
    </Container>
  )
}

const Container = styled.div`
  width: 25vw;
  height: 635px;
  display: flex;
  flex-direction: column;
`

const WeatherCon = styled.div`
  width: 100%;
  height: 50%;
  /* background-color: lightcoral; */
`

const DustCon = styled.div`
  width: 100%;
  height: 50%;
  background-color: lightgoldenrodyellow;
`

const StyledSunFill = styled(BsSunFill)`
  color: #ff9500;
  margin-top: 5px;
`;

const StyledMoonFill = styled(BsMoonStarsFill)`
  color: #6392C7;
  margin-top: 5px;
`

const StyledCloudSunFill = styled(BsCloudSunFill)`
  color: #c5c5c5;
  margin-top: 5px;
`;

export default WeatherInfo