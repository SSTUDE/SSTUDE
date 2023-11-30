import React from 'react'
import styled from 'styled-components';
import {
  BsSunFill,
  BsCloudFill,
  BsCloudRainFill,
  BsCloudSnowFill,
  BsCloudSunFill
} from 'react-icons/bs'

type SkyWeekProps = {
  skyData: string;
}

const SkyWeek: React.FC<SkyWeekProps> = ({ skyData }) => {
  const getWeatherIcon = (skyCondition: string) => {
    if (skyCondition.includes('맑음')) {
      return <StyledSunFill size={45} />;
    } else if (skyCondition.includes('구름많음')) {
      return <StyledCloudSunFill size={45} />;
    } else if (skyCondition.includes('흐림')) {
      return <StyledCloudFill size={45} />;
    } else if (skyCondition.includes('비') || skyCondition.includes('소나기')) {
      return <StyledCloudRainFill size={45} />;
    } else if (skyCondition.includes('눈')) {
      return <StyledCloudSnowFill size={45} />;
    } else {
      return null;
    }
  };

  return (
    <>
      {getWeatherIcon(skyData)}
    </>
  )
}

const StyledSunFill = styled(BsSunFill)`
  color: #ff9500;
  margin-top: 5px;
`;


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


const StyledCloudSnowFill = styled(BsCloudSnowFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;

export default SkyWeek;