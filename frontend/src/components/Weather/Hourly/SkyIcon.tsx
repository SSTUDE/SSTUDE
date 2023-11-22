import React from 'react'
import styled from 'styled-components';
import { 
  BsSunFill, 
  BsCloudFill, 
  BsMoonStarsFill, 
  BsCloudRainFill, 
  BsCloudSnowFill, 
  BsCloudSunFill } from 'react-icons/bs'
import { FaCloudShowersHeavy } from "react-icons/fa";
import { WeatherDataCustom } from '../types';

type SkyIconProps = {
  dailySky: WeatherDataCustom;
  RainData: WeatherDataCustom;
  size: number
};

const SkyIcon: React.FC<SkyIconProps> = ({ dailySky, RainData, size }) => {
  // 밤과 낮 여부 
  const SkyStatus = dailySky.fcstValue;
  const time = dailySky.fcstTime; // 'fcstTime'은 '0500'과 같은 문자열 형태
  
  let IconComponent = null;
  const isNightTime = parseInt(time) >= 1800 || parseInt(time) <= 600 ;

  // 강수타입 확인
  const rainType = RainData.fcstValue;

  if (rainType === '1' || rainType === '2') {
    IconComponent = <StyledCloudRainFill size={size} />
  } 
  else if (rainType === '4') {
    IconComponent = <StyledCloudShowersHeavy size={size} />
  }
  else if (rainType === '3') {
    IconComponent = <StyledCloudSnowFill size={size} />
  }
  // 낮 시간대에는 Sun 아이콘, 밤 시간대에는 Moon 아이콘을 렌더링
  else if(SkyStatus === '1') {
    IconComponent = isNightTime ? <StyledMoonFill size={size} /> : <StyledSunFill size={size} />;
  } else if (SkyStatus === '3') {
    IconComponent = isNightTime ? <StyledMoonFill size={size}/> : <StyledCloudSunFill size={size}/>;
  } else if (SkyStatus === '4') {
    IconComponent = isNightTime ? <StyledMoonFill size={size}/> : <StyledCloudFill size={size} />;
  }
  
  return (
    <>
      {IconComponent}
    </>
  )
}

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

const StyledCloudFill = styled(BsCloudFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;

const StyledCloudRainFill = styled(BsCloudRainFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;

const StyledCloudShowersHeavy = styled(FaCloudShowersHeavy)`
  color: #7a7a7a;
  margin-top: 5px;
`;

const StyledCloudSnowFill = styled(BsCloudSnowFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;

export default SkyIcon