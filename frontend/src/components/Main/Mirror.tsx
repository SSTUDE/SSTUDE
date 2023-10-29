import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Mirror = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <Body>
        <button onClick={() => navigate('/test')}>테스트</button>
        <button onClick={() => navigate('/login')}>로그인</button>
        <button onClick={() => navigate('/datetime')}>시간</button>
      </Body>
      <Bottom></Bottom>
    </>
  )
}

const Header = styled.div`
  width: 100vw;
  background-color: red;
`

const Body = styled.div`
  background-color: lightblue;
`

const Bottom = styled.div`
  background-color: yellow;
`

export default Mirror
