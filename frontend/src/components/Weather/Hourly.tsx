import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Chart.js 모듈 등록
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

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
      {
        label: '강수확률',
        data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
      },
      {
        label: '강수량',
        data: [0, 0.5, 0, 0, 1, 0.5, 0, 0, 0, 0, 0.5],
      },
      {
        label: '습도',
        data: [55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 70],
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
      <ChartContainer>
        <Line data={temperatureData} options={chartOptions}/>
      </ChartContainer>

      {/* 아래쪽 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>시간</th>
            {tableData.labels.map((label) => (
              <th key={label}>{`${label}시`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.datasets.map((dataset) => (
            <tr key={dataset.label}>
              <td>{dataset.label}</td>
              {dataset.data.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
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
  height: 130px; // 원하는 세로 크기
  margin-bottom: 20px;
`;

export default Hourly;
