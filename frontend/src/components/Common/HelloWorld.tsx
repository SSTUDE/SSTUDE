import React from 'react'
import styled from 'styled-components';
import { TEXT_COLOR } from '../../constants/defaultSlices'

function HelloWorld() {

  const name = "파이썬"

  return (
    <Wrap>
      <Hello>좋은 아침 {name}</Hello>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: inline-flex;
`;

const Hello = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: ${TEXT_COLOR}
`;

export default HelloWorld;