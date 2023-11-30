import React, { CSSProperties } from 'react';
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
  ChartOptions
} from 'chart.js';
import { WeatherDataCustom } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TempChartProps {
  TempDatas: WeatherDataCustom[];
}


const TempChart: React.FC<TempChartProps> = ({ TempDatas }) => {
  const chartDataPoints = TempDatas.map(data => data.fcstValue);
  const chartTimeLabels = TempDatas.map(data => data.fcstTime);

  const chartData = {
    labels: chartTimeLabels,
    datasets: [
      {
        data: chartDataPoints,
        borderColor: '#80ACCC',
        borderWidth: 2,
        spanGaps: false,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        axis: "x",
        display: false,
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        axis: "y",
        display: false,
        title: {
          display: false,
        },
      },
    },
  };

  const chartStyle: CSSProperties = {
    width: '98%',
    height: '50px',
  };

  return (
    <>
      <Container>
        <Chart 
          type="line"
          data={chartData} 
          options={chartOptions}
          style={chartStyle} />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50px; 
`;

export default TempChart;
