import React, { useEffect } from 'react'
import styled from 'styled-components';
import { BsSunFill, BsCloudFill, BsMoonStarsFill, BsCloudRainFill, BsSnow2, BsCloudSunFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { fetchShortData } from '../../store/WeatherSlice'
import { RootState, AppDispatch } from '../../store/store'

const WeatherInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: RootState) => state.weather.data); // 타입 지정
  const isLoading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    dispatch(fetchShortData({
      base_date: '20231112',
      base_time: '0500',
      nx: 86,
      ny: 95
    }));
  }, [dispatch]);

  if (isLoading) return <span>데이터를 불러오는 중...</span>;
  if (error) return <span>에러 발생: {error}</span>;
  console.log(weatherData);

  return (
    <Container>
      <WeatherCon>
        <StyledSunFill size={200}/>
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