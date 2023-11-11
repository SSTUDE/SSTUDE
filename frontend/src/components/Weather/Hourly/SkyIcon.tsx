import React from 'react'
import { BsSunFill, BsCloudFill, BsMoonStarsFill, BsCloudRainFill, BsSnow2, BsCloudSunFill } from 'react-icons/bs'
import styled from 'styled-components';
import { WeatherDataCustom } from '../types';

type SkyIconProps = {
  dailySky: WeatherDataCustom;
  RainData: WeatherDataCustom;
};

const SkyIcon: React.FC<SkyIconProps> = ({ dailySky, RainData }) => {
  // 밤과 낮 여부 
  const SkyStatus = parseInt(dailySky.fcstValue);
  const time = dailySky.fcstTime; // 'fcstTime'은 '0500'과 같은 문자열 형태
  
  let IconComponent = null;
  const isNightTime = parseInt(time) >= 1800 || parseInt(time) <= 600 ;

  // 강수 여부 확인
  const hasRain = RainData.fcstValue !== '강수없음';

  if (hasRain) {
    IconComponent = <StyledCloudRainFill size={30} />
  } 
  else if(SkyStatus >= 0 && SkyStatus <= 5) {
    // 낮 시간대에는 Sun 아이콘, 밤 시간대에는 Moon 아이콘을 렌더링
    IconComponent = isNightTime ? <StyledMoonFill size={30} /> : <StyledSunFill size={30} />;
  } else if (SkyStatus >= 6 && SkyStatus <= 8) {
    IconComponent = <StyledCloudSunFill size={30} />;
  } else if (SkyStatus >= 9 && SkyStatus <= 10) {
    IconComponent = <BsCloudFill size={30} />;
  }

  return (
    <>
      {IconComponent}
      {/* <StyledCloudSunFill size={30}/>
      <StyledCloudRainFill size={30}/> */}
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


export default SkyIcon