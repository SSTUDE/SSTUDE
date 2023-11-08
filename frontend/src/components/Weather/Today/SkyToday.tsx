import React from 'react'
import styled from 'styled-components';
import { ReactComponent as SunWithCloud } from '../../../assets/images/sun_with_cloud.svg';
import { BsSunFill, BsMoonStarsFill, BsCloudSunFill, BsCloudRainFill } from 'react-icons/bs'
import { WeatherDataCustom } from '../types';

type SkyTodayProps = {
    NowDatas: WeatherDataCustom[];
  };
  
  const SkyToday: React.FC<SkyTodayProps> = ({ NowDatas }) => {
    // console.log(NowDatas);
    const SkyStatus = parseInt(NowDatas[3].fcstValue);
    const RainStatus = NowDatas[4].fcstValue !== '강수없음';
    const time = NowDatas[3].fcstTime; // 'fcstTime'은 '0500'과 같은 문자열 형태
    
    let IconComponent = null;
    let SkyContidion = ''
    const isNightTime = parseInt(time) >= 1800 || parseInt(time) <= 600 ;

    if (RainStatus) {
      IconComponent = <StyledCloudRainFill size={130} />
    } else if (SkyStatus >= 0 && SkyStatus <= 5) {
      // 낮 시간대에는 Sun 아이콘, 밤 시간대에는 Moon 아이콘을 렌더링
      IconComponent = isNightTime ? <StyledMoonFill size={130} /> : <StyledSunFill size={130} />;
      SkyContidion = '맑음'
    } else if (SkyStatus >= 6 && SkyStatus <= 8) {
      IconComponent = <StyledCloudSunFill size={130} />;
      SkyContidion = '구름 많음'
    } else if (SkyStatus >= 9 && SkyStatus <= 10) {
      IconComponent = <SunSvg/>;
      SkyContidion = '흐름'
  }

  return (
    <>
      {IconComponent}
      <div>
        <span>{NowDatas[0].fcstValue}ºC</span>
        <span>{SkyContidion}</span>
      </div>
    </>
  )
}

const SunSvg = styled(SunWithCloud)`
  width: 130px;
  height: 130px;
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

const StyledCloudRainFill = styled(BsCloudRainFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;


export default SkyToday