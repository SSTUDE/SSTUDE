import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ColorPalette: React.FC = () => {
  const colors = [
    'red', 'green', 'blue', 'yellow', 'pink', 'orange', 'purple', 'cyan', 'magenta', 'lime',
    'navy', 'teal', 'olive', 'maroon', 'silver', 'gray', 'black', 'white', 'brown', 'gold',
    // 추가적인 색상들을 여기에 정의할 수 있습니다.
  ];

  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [customColor, setCustomColor] = useState<string>('#ffffff'); // 사용자 정의 색상
  const navigate = useNavigate();

  return (
    <Container style={{ backgroundColor: backgroundColor }}>
      <ColorList>
        {colors.map((color, index) => (
          <ColorBox
            key={index}
            color={color}
            onClick={() => setBackgroundColor(color)}
          />
        ))}
        <CustomColorInput
          type="color"
          value={customColor}
          onChange={(e) => {
            setCustomColor(e.target.value);
            setBackgroundColor(e.target.value);
          }}
        />
      </ColorList>
      <ColorCode>선택한 색상 코드: {backgroundColor}</ColorCode>
      <button onClick={() => navigate('/test')}>처음으로</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transition: background-color 0.3s; // 배경색 변경시 부드러운 전환 효과
`;

const ColorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 800px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  cursor: pointer;
`;

const CustomColorInput = styled.input`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const ColorCode = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
`;

export default ColorPalette;
