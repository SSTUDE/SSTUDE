import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { saveBusListForServer, saveBusStopForServer } from '../Bus/BusSlice';

export const Welcome = () => {
  const memberId = useSelector((state: RootState) => state.login.memberId) || '전수림';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  setTimeout(() => {
  dispatch(saveBusStopForServer())
  dispatch(saveBusListForServer())
  navigate("/mirror")
  }, 3000);

  return (
    <Container>
      <WelcomeMessage>반갑습니다, <HighlightedText>{memberId}</HighlightedText>님!</WelcomeMessage>
      <WelcomeMessage>오늘도 좋은 하루 되세요.</WelcomeMessage>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
height: 100vh;
`

const fadeIn = keyframes` 
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WelcomeMessage = styled.p`
  color: #4a90e2; 
  font-size: 3em; 
  text-align: center; 
  font-family: "Giants-Bold";
  padding: 20px; 
  border-radius: 10px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 2s ease-in-out;
`;

const HighlightedText = styled.span`
  color: yellow;
`;

export default Welcome
