import React, { useState } from 'react'
import Today from './Today'
import Week from './Week'
import Hourly from './Hourly/Hourly'
import { DailyWeather } from './types'

const Weather = () => {
  const [dailyWeathers, setDailyWeathers] = useState<DailyWeather[]>([]);


  return (
    <>
      <Today></Today>
      <Hourly dailyWeathers={dailyWeathers}></Hourly>
      <Week></Week>
    </>
  )
}

export default Weather