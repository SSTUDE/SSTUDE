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

const Hourly = () => {
  // 차트 데이터 (기온만)
  const temperatureData = {
    labels: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [
      {
        label: '기온',
        data: [16, 19, 21, 23, 24, 24, 23, 21, 19, 16, 15],
        fill: false,
        borderColor: 'white',
      },
    ],
  };

  // 테이블 데이터
  const tableData = {
    labels: temperatureData.labels,
    datasets: [
      {
        label: '기온',
        data: temperatureData.datasets[0].data,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <Container>
      {/* 라인 차트 */}
      {/* <ChartContainer>
        <Chart 
          className="chart_line"
          type="line"
          data={temperatureData} 
          options={chartOptions}/>
      </ChartContainer> */}

      {/* 아래쪽 테이블 */}
      <Table
        summary='시간별 날씨(온도, 하늘상태, 강수확률, 강수, 습도) 정보를 제공'>
        <caption>
          {/* <span>시간별 날씨표</span> */}
        </caption>  

        
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
