import React from 'react'
import styled from 'styled-components';
import { WeatherDataCustom } from '../types';
import { FaCloudShowersHeavy } from "react-icons/fa";
import {
  BsSunFill,
  BsCloudFill,
  BsMoonStarsFill,
  BsCloudRainFill,
  BsCloudSnowFill,
  BsCloudSunFill
} from 'react-icons/bs'

type SkyTodayProps = {
  NowDatas: WeatherDataCustom[];
};

const SkyToday: React.FC<SkyTodayProps> = ({ NowDatas }) => {
  const SkyStatus = NowDatas[3].fcstValue;
  const RainTypeStatus = NowDatas[4].fcstValue;
  const time = NowDatas[3].fcstTime;

  let IconComponent = null;
  let SkyContidion = ''
  const isNightTime = parseInt(time) >= 1800 || parseInt(time) <= 600;

  if (RainTypeStatus === '1' || RainTypeStatus === '2') {
    IconComponent = <StyledCloudRainFill size={130} />
    SkyContidion = '비'
  }
  else if (RainTypeStatus === '4') {
    IconComponent = <StyledCloudShowersHeavy size={130} />
    SkyContidion = '소나기'
  }
  else if (RainTypeStatus === '3') {
    IconComponent = <StyledCloudSnowFill size={130} />
    SkyContidion = '눈'
  }
  else if (SkyStatus === '1') {
    IconComponent = isNightTime ? <StyledMoonFill size={130} /> : <StyledSunFill size={130} />;
    SkyContidion = '맑음'
  } else if (SkyStatus === '3') {
    IconComponent = isNightTime ? <StyledMoonFill size={130} /> : <StyledCloudSunFill size={130} />;
    SkyContidion = '구름 많음'
  } else if (SkyStatus === '4') {
    IconComponent = isNightTime ? <StyledMoonFill size={130} /> : <StyledCloudFill size={130} />;
    SkyContidion = '흐림'
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

export default SkyToday