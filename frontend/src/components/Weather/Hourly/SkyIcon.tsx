import React from 'react'
import { BsSunFill, BsCloudFill, BsMoonStarsFill, BsCloudRainFill, BsSnow2, BsCloudSunFill } from 'react-icons/bs'
import styled from 'styled-components';
import { WeatherDataCustom } from '../types';

type SkyIconProps = {
  dailySky: WeatherDataCustom;
};

const SkyIcon: React.FC<SkyIconProps> = ({ dailySky }) => {
  const SkyStatus = parseInt(dailySky.fcstValue);

  let IconComponent = null;

  if (SkyStatus >= 0 && SkyStatus <= 5) {
    IconComponent = <StyledSunFill size={30} />;
  } else if (SkyStatus >= 6 && SkyStatus <= 8) {
    IconComponent = <StyledCloudSunFill size={30} />;
  } else if (SkyStatus >= 9 && SkyStatus <= 10) {
    IconComponent = <StyledCloudRainFill size={30} />;
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

const StyledCloudSunFill = styled(BsCloudSunFill)`
  color: #c5c5c5;
  margin-top: 5px;
`;

const StyledCloudRainFill = styled(BsCloudFill)`
  color: #7a7a7a;
  margin-top: 5px;
`;
export default SkyIcon