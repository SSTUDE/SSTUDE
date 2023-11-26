import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function HelloWorld() {
  const [showMessage, setShowMessage] = useState(true);
  const { hour, minute } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    if (hour !== null && minute !== null) {

      const interval = setInterval(() => {
        setShowMessage((prevShowMessage) => !prevShowMessage);
      }, 5000);

      return () => clearInterval(interval);

    }
  }, [hour, minute]);


  const getCurrentTimeMessage = () => {
    const hourNow = new Date().getHours();
    switch (hourNow) {

      case 0: return {

        message: '한밤중의 달빛',
        color: 'silver'
      };
      case 1: return {

        message: '조용한 새벽',
        color: 'darkblue'
      };
      case 2: return {

        message: '별빛이 가득한 밤',
        color: 'navy'
      };
      case 3: return {

        message: '새벽의 고요함',
        color: 'darkslategray'
      };
      case 4: return {

        message: '이른 아침',
        color: 'darkgreen'
      };
      case 5: return {

        message: '새벽녘',
        color: 'teal'
      };
      case 6: return {

        message: '아침의 시작',
        color: 'green'
      };
      case 7: return {

        message: '상쾌한 아침',
        color: 'olive'
      };
      case 8: return {

        message: '햇살 가득한 아침',
        color: 'lime'
      };
      case 9: return {

        message: '활기찬 오전',
        color: 'yellow'
      };
      case 10: return {

        message: '평온한 오전',
        color: 'gold'
      };
      case 11: return {

        message: '점심 전의 기다림',
        color: 'orange'
      };
      case 12: return {

        message: '정오의 태양',
        color: 'orangered'
      };
      case 13: return {

        message: '오후의 시작',
        color: 'red'
      };
      case 14: return {

        message: '오후의 여유',
        color: 'tomato'
      };
      case 15: return {

        message: '오후의 활력',
        color: 'coral'
      };
      case 16: return {

        message: '늦은 오후',
        color: 'lightcoral'
      };
      case 17: return {

        message: '해질 녘',
        color: 'salmon'
      };
      case 18: return {

        message: '저녁의 시작',
        color: 'lightsalmon'
      };
      case 19: return {

        message: '저녁 노을',
        color: 'pink'
      };
      case 20: return {

        message: '밤의 서막',
        color: 'hotpink'
      };
      case 21: return {

        message: '밤의 여유',
        color: 'deeppink'
      };
      case 22: return {

        message: '늦은 밤',
        color: 'plum'
      };
      case 23: return {

        message: '밤의 깊은 고요',
        color: 'purple'
      };

      default: return {
        message: '아름다운 하루',
        color: 'blue'
      };
    }
  };

  const getTimeDifferenceMessage = () => {
    if (hour === null || minute === null) return '';

    const now = new Date();
    let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

    if (alarmTime <= now) {
      alarmTime = new Date(alarmTime.getTime() + 24 * 60 * 60 * 1000);
    }

    const diff = alarmTime.getTime() - now.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}시간 ${diffMinutes}분 뒤에 알람이 울립니다.`;
    } else {
      return `${diffMinutes}분 뒤에 알람이 울립니다.`;
    }
  };


  const currentTimeMessage = getCurrentTimeMessage();
  const timeDifferenceMessage = getTimeDifferenceMessage();


  return (
    <Wrap>
      {showMessage ? (
        <Hello $textColor={currentTimeMessage.color}>{currentTimeMessage.message}</Hello>
      ) : (
        <WelcomeMessage $textColor={currentTimeMessage.color}>{timeDifferenceMessage}</WelcomeMessage>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
`;

interface HelloProps {
  $textColor: string;
}

const Hello = styled.p<HelloProps>`
  font-size: 50px;
  margin: 0;
  color: ${(props) => props.$textColor};
`;

const WelcomeMessage = styled.p<HelloProps>`
  font-size: 50px;
  margin: 0;
  color: ${(props) => props.$textColor};
`;

export default HelloWorld;