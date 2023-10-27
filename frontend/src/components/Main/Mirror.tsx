import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { MIRROR_HEADER, MIRROR_BODY, MIRROR_BOTTOM } from '../../store/slices/defaultSlices';

const Mirror = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <Body>
        <button onClick={() => navigate('/test')}>테스트</button>
        <button onClick={() => navigate('/login')}>로그인</button>
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
