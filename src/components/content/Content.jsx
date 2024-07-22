import dateFormat from "dateformat"
import { useEffect, useState } from "react"
import { showSunTime, showDate, showDuration,getHour, degToDirection } from '../../services/content'
import { WeekWeather } from "../WeekWeather/WeekWeather"
import { HourlyWeather } from "../hourlyWeather/HourlyWeather"
import { HourlyItem } from "../HourlyItem/HourlyItem"
import { WeekWeatherItem } from "../WeekWeatherItem/WeekWeatherItem.jsx"
import { CurrentWeatherComponent } from "../CurrentWeather/CurrentWeather.jsx"
import { NearlyPlacesWeather } from "../NearlyPlacesWeather/NearlyPlacesWeather.jsx"

import { useDispatch, useSelector } from "react-redux"
import { fetchBySearch, fetchLocationAndWeather } from "../../redux/dataSlice.js"




export const Content = ({ tab, doSearch }) => {
  const dispatch = useDispatch()
  const weatherNow = useSelector(state => state.data.weatherNow)
  const weatherWeek = useSelector(state => state.data.weatherWeek)
  const status = useSelector(state=>state.data.status)
  const nearPlaces = useSelector(state => state.data.nearPlaces)

  const [date, setDate] = useState(dateFormat(new Date(), "d"))
  const [isActive, setIsactive] = useState("Today")

  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchLocationAndWeather()) 
    }
  }, [status, dispatch])



  const showCurrentDay = (date) => {
    if (dateFormat(date, "ddd") === dateFormat(new Date(), "ddd")) {
      setIsactive("Today")
    } else setIsactive(dateFormat(date, "ddd"))

    setDate(dateFormat(date, "d"))
  }


  return (
    <div>
      {tab ? (
        <WeekWeather
          WeekWeatherItem={WeekWeatherItem}
          data={weatherWeek}
          showCurrentDay={showCurrentDay}
          isActive={isActive}
          dateFormat={dateFormat}
        />
      ) : (
        <CurrentWeatherComponent
            weatherDay={weatherNow}
          showDuration={showDuration}
          showDate={showDate}
          showSunTime={showSunTime}
        />
      )}
      <HourlyWeather
        HourlyItem={HourlyItem}
        weatherData={weatherWeek}
        degToDirection={degToDirection}
        date={date}
        getHour={getHour}
        dateFormat={dateFormat}
       
      />
      {status === 'loading' ?'':
      <NearlyPlacesWeather
        dispatch={dispatch}
        places={nearPlaces}
        fetchBySearch={fetchBySearch}
      />}
    </div>
  )
}
