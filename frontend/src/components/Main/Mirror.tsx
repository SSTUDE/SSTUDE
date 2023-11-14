import Bus from '../Bus/Bus';
import MenuBar from './MenuBar';
import MenuBtn from '../Common/MenuBtn';
import React, { useState, useEffect } from 'react';
import Weather from '../Weather/Weather';
import BusDetail from '../Bus/BusDetail';
import DateTime from '../Common/DateTime';
import { useSelector, useDispatch  } from 'react-redux';
import { findNearestSFGridItem  } from '../Weather/Grid'
import { AppDispatch, RootState } from '../../store/store'
import { updatePosition  } from '../../store/PositionSlice'
import HelloWorld from '../Common/HelloWorld';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import WeatherInfo from '../Weather/WeatherInfo';

const Mirror = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
 
  const [activePage, setActivePage] = useState('bus');
  const { isMenuOpen } = useSelector((state: RootState) => state.mirror);
  
  // 위,경도 데이터를 가져온다.
  const { latitude, longitude } = useSelector((state: RootState) => ({
    latitude: state.position.latitude,
    longitude: state.position.longitude
  }));

  useEffect(() => {
    // latitude와 longitude가 숫자인지 문자열인지 확인하여 처리
    const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
    const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
  
    if (lat && lng) {
      const nearestItem = findNearestSFGridItem(lat, lng);
  
      // nearestItem이 undefined가 아닐 때만 처리
      if (nearestItem) {
        // nearestItem을 PositionState 타입으로 변환
        const positionStateItem = {
          arePt1: nearestItem.arePt1 || '',
          arePt2: nearestItem.arePt2 || '',
          arePt3: nearestItem.arePt3 || '',
          areaCode: nearestItem.areaCode || '',
          latitude: nearestItem.latitude || '',
          longitude: nearestItem.longitude || '',
          nX: nearestItem.nX || '',
          nY: nearestItem.nY || ''
        };
  
        // 변환된 객체를 dispatch 함수를 통해 updatePosition 액션에 전달
        dispatch(updatePosition(positionStateItem));
        // console.log(positionStateItem);
      }
    }
  }, [dispatch]);

  const handleBusClick = () => {
    setActivePage('busDetail');
  };

  const handleBusDetailClick = () => {
    setActivePage('bus');
  };

  const handleWeatherClick = () => {
    setActivePage('weatherDetail');
  };

  const handleWeatherDetailClick = () => {
    setActivePage('weather');
  };

  const renderCenterContent = () => {
    switch (activePage) {
      case 'bus':
        return <Bus onClick={handleBusClick} />;
      case 'weather':
        return <WeatherInfo onClick={handleWeatherClick}/>;
      case 'busDetail':
        return <BusDetail onClick={handleBusDetailClick} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <Left>
          <MenuBtn type="menu" />
          <MenuBtn type="beauty" />
          <MenuBtn type="health" />
        </Left>
        <Center>
          <HelloWorld />
        </Center>
        <RightHeader>
          <DateTime />
        </RightHeader>
      </Header>
      <Body>
        <Left>
        </Left>
        {activePage === 'busDetail' ? (
          <BusDetail onClick={handleBusDetailClick} />
        ) : activePage === 'weatherDetail' ? (
          <Weather onClick={handleWeatherDetailClick}/>
        ) : (
          <>
            <Center>
              <Btn onClick={() => navigate('/')}>초기 화면</Btn>
              <Btn onClick={() => navigate('/login')}>로그인</Btn>
              <Btn onClick={() => navigate('/test')}>테스트</Btn>
            </Center>
            {isMenuOpen ? <MenuBar /> : (
              <Right>
                <PageHeader>
                  <PageButton onClick={() => setActivePage('bus')}>버스 정보</PageButton>
                  <PageButton onClick={() => setActivePage('weather')}>날씨 정보</PageButton>
                </PageHeader>
                <PageBody key={activePage}>
                  {renderCenterContent()}
                </PageBody>
              </Right>
            )}
          </>
        )}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  display: flex; 
  height: 22%;
  /* background-color: lightblue; */
`;

const Body = styled.div`
  display: flex;
  height: 78%;
  /* background-color: lightcoral; */
`;

const Left = styled.div`
  display: flex;
  flex: 25%;
  justify-content: end;
  align-items: center;
  gap: 20px;
  /* background-color: lightgray; */
`;

const Center = styled.div`
  display: flex;
  flex: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: lightgreen; */
`;

const Right = styled.div`
  flex: 25%;
  justify-content: center;
  /* background-color: lightpink; */
`;

const RightHeader = styled.div`
  display: flex;
  flex: 25%;
  justify-content: center;
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 3em;
font-weight: bold;
text-align:center;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 4px solid #ddddddd2;	
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  font-size: 22px;
  background-color: transparent;
  color: ${TEXT_COLOR};
  cursor: pointer;
  transition: all 0.3s ease; 
  font-family: "Giants-Bold";

  &:focus {
    outline: none;
    margin: 0 30px;
    color: #2ecc71;
    transform: translateY(-2px); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageBody = styled.div`
  display: flex;
  justify-content: center;
  opacity: 1; 
  animation: ${fadeIn} 1s ease forwards;
`;

export default Mirror
