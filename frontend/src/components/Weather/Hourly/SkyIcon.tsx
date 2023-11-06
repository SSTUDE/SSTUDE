import React from 'react'
import { BsSunFill,  } from 'react-icons/bs'
import styled from 'styled-components';


const SkyIcon = () => {
  return (
    <>
      <SunFill size={30} color='#ff9500'/>
    </>
  )
}

const SunFill = styled(BsSunFill)`
  color: #ff9500;
  margin-top : 5px;
`

export default SkyIcon