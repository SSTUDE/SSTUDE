import React from 'react'
import Today from './Today'
import Week from './Week'
import Hourly from './Hourly'

const Weather = () => {
  return (
    <>
      <Today></Today>
      <Hourly></Hourly>
      <Week></Week>
    </>
  )
}

export default Weather