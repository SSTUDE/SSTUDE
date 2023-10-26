import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Test1: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleButtonClick = (buttonNumber: number) => {
    setMessage(`버튼 ${buttonNumber}이(가) 눌렸습니다.`);
  };

  // 80개의 버튼을 생성합니다.
  const buttons = Array.from({ length: 80 }, (_, index) => (
    <Button key={index} onClick={() => handleButtonClick(index + 1)}>
      버튼 {index + 1}
    </Button>
  ));

  const navigate = useNavigate()

  return (
    <Container>
      <button onClick={()=>navigate('/')}>처음으로</button>
      <ButtonContainer>{buttons}</ButtonContainer>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  transform-origin: center center;
  height: 100vw;
  overflow-x: hidden;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 2px;
`;

const Message = styled.div`
  margin-top: 20px;
  color: green;
`;

export default Test1;
