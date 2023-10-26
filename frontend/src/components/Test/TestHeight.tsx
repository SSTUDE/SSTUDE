import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TestHeight: React.FC = () => {
  
  const [message, setMessage] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  const handleButtonClick = (buttonNumber: number) => {
    setMessage(`버튼 ${buttonNumber}이(가) 눌렸습니다.`);
    changeBackgroundColor();
  };

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  };

  // 80개의 버튼을 생성합니다.
  const buttons = Array.from({ length: 80 }, (_, index) => (
    <Button key={index} onClick={() => handleButtonClick(index + 1)}>
      버튼 {index + 1}
    </Button>
  ));

  const navigate = useNavigate();

  return (
    <Container style={{ backgroundColor: backgroundColor }}>
      <button onClick={() => navigate('/test')}>처음으로</button>
      {message && <Message>{message}</Message>}
      <ButtonContainer>{buttons}</ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  transform: rotate(90deg);
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 2px;
`;

const Message = styled.div`
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export default TestHeight;
