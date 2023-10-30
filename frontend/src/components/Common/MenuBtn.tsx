import React from 'react';
import styled from 'styled-components';
import images from '../../assets/images';

// Props 타입 정의
interface MenuBtnProps {
  type: 'menu' | 'beauty' | 'health';
}

function MenuBtn({ type }: MenuBtnProps) {
  const handleClick = () => {
    if (type === 'menu') {
      // 리덕스 툴킷에 메뉴바 true로 변경
    } else if (type === 'beauty') {
      // 화장 페이지로 이동
    } else if (type === 'health') {
      // 운동 페이지로 이동
    }
  };

  return (
    <Wrap>
      <Button onClick={handleClick}>
        <img src={images.menuBtn} alt="메뉴 버튼" />
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 15%;
  border: 2px solid white;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MenuBtn;
