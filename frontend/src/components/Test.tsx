import React from 'react'
import styled from 'styled-components';

const Test = () => {
  return (
    <>
      <Header>test</Header>
      <Info></Info>
      <Mirror></Mirror>
    </>    
  )
}

const Header = styled.div`
  width: 100vw;
  height: 12.2vh;
  background-color: red;
`

const Info = styled.div`
  height: 40vh;
  background-color: lightblue;
`

const Mirror = styled.div`
  height: 47.8vh;
  background-color: black;
`

export default Test