import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MIRROR_HEADER, MIRROR_BODY, MIRROR_BOTTOM } from '../../store/slices/defaultSlices';

const Mirror = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <Body>
        <button onClick={()=>navigate('/test')}>테스트 가로</button>
        <button onClick={()=>navigate('/test1')}>테스트 세로</button>
      </Body>
      <Bottomm></Bottomm>
    </>    
  )
}

const Header = styled.div`
  width: 100vw;
  height: ${MIRROR_HEADER}vh;
  background-color: red;
`

const Body = styled.div`
  height: ${MIRROR_BODY}vh;
  background-color: lightblue;
`

const Bottomm = styled.div`
  height: ${MIRROR_BOTTOM}vh;
  background-color: yellow;
`

export default Mirror
