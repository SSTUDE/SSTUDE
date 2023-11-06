import React, { useState } from 'react';
import styled from 'styled-components';
import DayCloud from './DayCloud';
import { WeatherDataCustom } from '../types';


type HourlyProps = {
  dailySky: WeatherDataCustom[]; // 이 배열은 상위 컴포넌트로부터 전달받아야 합니다.
};

const Hourly: React.FC<HourlyProps> = ({ dailySky }) => {
  
  return (
    <Container>
      <Table
        summary='시간별 날씨(온도, 하늘상태, 강수확률, 강수, 습도) 정보를 제공'>
        <caption>
          {/* <span>시간별 날씨표</span> */}
        </caption>  
        <thead>
          <tr>
            {dailySky.map((dailySky, index) => (
                <DayCloud key={index} dailySky={dailySky} index={index} />
              ))}
          </tr>
        </thead>
        
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 45%;
  overflow-x: auto;
  margin: 10px 0;
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  table-layout:fixed;

  th, td {
    border-right: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    width: 80px;
    /* padding-top: 15px; */
    font-size : 18px;
  }
`;



export default Hourly;
