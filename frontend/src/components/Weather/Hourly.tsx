import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

// Chart.js 모듈 등록
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Hourly = () => {
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    datasets: [
      {
        label: '기온',
        data: [17, 20, 23, 16, 15, 17, 16, 15, 14, 13],
        fill: false,
        borderColor: 'white',
      },
    ],
  };

  const options = {
    // responsive : true,
    maintainAspectRatio: false,
    // aspectRatio: 2,
  }

  return (
    <Container>
      {/* 위쪽 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>상단 테이블</th>
            <th>상단 테이블</th>
            <th>상단 테이블</th>
            <th>상단 테이블</th>
            <th>상단 테이블</th>
            <th>상단 테이블</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>데이터1</td>
            <td>데이터1</td>
            <td>데이터1</td>
            <td>데이터1</td>
            <td>데이터1</td>
            <td>데이터1</td>
          </tr>
        </tbody>
      </Table>

      {/* 라인 차트 */}
      <ChartContainer>
        <Line data={data} options={options}/>
      </ChartContainer>

      {/* 아래쪽 테이블 */}
      <Table>
        <thead>
          <tr>
            <th>날짜</th>
            {data.labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.datasets[0].label}</td>
            {data.datasets[0].data.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid #fff;
  padding: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 150%;
  margin-bottom: 20px;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    /* background-color: #f2f2f2; */
  }
`;

const ChartContainer = styled.div`
  width: 150%; // 원하는 가로 크기
  height: 650px; // 원하는 세로 크기
`;

export default Hourly;
