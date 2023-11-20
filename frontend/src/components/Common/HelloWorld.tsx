import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';

function HelloWorld() {
  const [message, setMessage] = useState('');
  const [textColor, setTextColor] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    let newMessage, newTextColor;

    switch (hour) {
      case 0:
        newMessage = '한밤중의 달빛';
        newTextColor = 'silver';
        break;
      case 1:
        newMessage = '조용한 새벽';
        newTextColor = 'darkblue';
        break;
      case 2:
        newMessage = '별빛이 가득한 밤';
        newTextColor = 'navy';
        break;
      case 3:
        newMessage = '새벽의 고요함';
        newTextColor = 'darkslategray';
        break;
      case 4:
        newMessage = '이른 아침';
        newTextColor = 'darkgreen';
        break;
      case 5:
        newMessage = '새벽녘';
        newTextColor = 'teal';
        break;
      case 6:
        newMessage = '아침의 시작';
        newTextColor = 'green';
        break;
      case 7:
        newMessage = '상쾌한 아침';
        newTextColor = 'olive';
        break;
      case 8:
        newMessage = '햇살 가득한 아침';
        newTextColor = 'lime';
        break;
      case 9:
        newMessage = '활기찬 오전';
        newTextColor = 'yellow';
        break;
      case 10:
        newMessage = '평온한 오전';
        newTextColor = 'gold';
        break;
      case 11:
        newMessage = '점심 전의 기다림';
        newTextColor = 'orange';
        break;
      case 12:
        newMessage = '정오의 태양';
        newTextColor = 'orangered';
        break;
      case 13:
        newMessage = '오후의 시작';
        newTextColor = 'red';
        break;
      case 14:
        newMessage = '오후의 여유';
        newTextColor = 'tomato';
        break;
      case 15:
        newMessage = '오후의 활력';
        newTextColor = 'coral';
        break;
      case 16:
        newMessage = '늦은 오후';
        newTextColor = 'lightcoral';
        break;
      case 17:
        newMessage = '해질 녘';
        newTextColor = 'salmon';
        break;
      case 18:
        newMessage = '저녁의 시작';
        newTextColor = 'lightsalmon';
        break;
      case 19:
        newMessage = '저녁 노을';
        newTextColor = 'pink';
        break;
      case 20:
        newMessage = '밤의 서막';
        newTextColor = 'hotpink';
        break;
      case 21:
        newMessage = '밤의 여유';
        newTextColor = 'deeppink';
        break;
      case 22:
        newMessage = '늦은 밤';
        newTextColor = 'plum';
        break;
      case 23:
        newMessage = '밤의 깊은 고요';
        newTextColor = 'purple';
        break;
      default:
        newMessage = '아름다운 하루';
        newTextColor = 'blue';
    }

    setMessage(newMessage);
    setTextColor(newTextColor);

    const interval = setInterval(() => {
      setShowWelcome((prevShowWelcome) => !prevShowWelcome);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrap>
      {showWelcome ? (
        <Hello $textColor={textColor}>{message}</Hello>
      ) : (
        <WelcomeMessage>환영합니다, 전수림씨!</WelcomeMessage>
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

const blink = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 50px;
  margin: 0;
`;

export default HelloWorld;