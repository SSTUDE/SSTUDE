import React from 'react';
import styled from 'styled-components';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  registerables as registerablesJS,
} from "chart.js";
import DayCloud from './DayCloud';
import { DailyWeather } from '../types';


// Chart.js 모듈 등록
ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type HourlyProps = {
  dailyWeathers: DailyWeather[]; // 이 배열은 상위 컴포넌트로부터 전달받아야 합니다.
};

const Hourly: React.FC<HourlyProps> = ({ dailyWeathers }) => {
  return (
    <Container>
      <Table
        summary='시간별 날씨(온도, 하늘상태, 강수확률, 강수, 습도) 정보를 제공'>
        <caption>
          {/* <span>시간별 날씨표</span> */}
        </caption>  
        <thead>
          <tr>
            {dailyWeathers.map((weather, index) => (
                <DayCloud key={index} dailyWeather={weather} index={index} />
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

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    color: black;
  }
`;

const ChartContainer = styled.div`
  width: 100%; // 원하는 가로 크기
  height: 100px; // 원하는 세로 크기
  margin-bottom: 20px;
`;

export default Hourly;
