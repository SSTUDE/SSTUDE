import React from 'react';
import styled from 'styled-components';
import DayCloud from './DayCloud';
import { WeatherDataCustom } from '../types';

type HourlyProps = {
  dailySky: WeatherDataCustom[];
};

const Hourly: React.FC<HourlyProps> = ({ dailySky }) => {
  // "오늘"을 나타내는 객체를 배열의 시작 부분에 추가합니다.
  const dailySkyWithToday = [{ fcstDate: '오늘', fcstTime: '', fcstValue: '', category: '' }, ...dailySky];

  return (
    <Container>
      <Table summary='시간별 날씨 정보를 제공'>
        <thead>
          <tr>
            {dailySkyWithToday.map((item, index) => (
              <DayCloud key={index} dailySky={item} index={index} />
            ))}
          </tr>
        </thead>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 45%;
  overflow-x: auto;
  margin: 10px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  table-layout: fixed;

  th, td {
    border-right: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    width: 80px;
  }
`;

export default Hourly;
