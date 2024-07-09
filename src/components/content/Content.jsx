import { useEffect, useState } from "react"
import dateFormat from "dateformat"
import { weatherForWeek, weatherInDay } from "../../services/weather"
import { WeekWeather } from "../WeekWeather/WeekWeather"
import { HourlyWeather } from "../hourlyWeather/HourlyWeather"
import { HourlyItem } from "../HourlyItem/HourlyItem"
import { WeekWeatherItem } from "../WeekWeatherItem/WeekWeatherItem.jsx"
import { CurrentWeatherComponent } from "../CurrentWeather/CurrentWeather.jsx"
import { NearlyPlacesWeather } from "../NearlyPlacesWeather/NearlyPlacesWeather.jsx"
import axios from 'axios';

const fetchNearbyPlaces = async (coords) => {
  const overpassQuery = `
    [out:json];
    node
      (around:5000,${coords.lat},${coords.lon})
      ["place"];
    out body;
  `
  const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
  const data = response.data.elements.map(place => ({
    id: place.id,
    name: place.tags.name || 'Unnamed place',
    coords: { latitude: place.lat, longitude: place.lon },
  }));
  return data;
};



export const Content = ({ tab, doSearch }) => {
  const [weather, setWeatherData] = useState(null)
  const [weatherDay, setWeatherDayData] = useState(null)
  const [date, setDate] = useState(dateFormat(new Date(), "d"))
  const [isActive, setIsactive] = useState("Today")
  const [location, setLocation] = useState(null)
  const [nearbyPlaces, setNearbyPlaces] = useState([]); 



  const showCurrentDay = (date) => {
    if (dateFormat(date, "ddd") === dateFormat(new Date(), "ddd")) {
      setIsactive("Today")
    } else setIsactive(dateFormat(date, "ddd"))

    setDate(dateFormat(date, "d"))
  }

  const degToDirection = (deg) => {
    const directions = ["N", "NW", "W", "SW", "S", "SH", "E", "NE"]
    const index = Math.round(deg / 45) % 8
    return directions[index]
  }

  const getHour = (dt_txt) => {
    const dt = new Date(dt_txt)
    return dateFormat(dt, "h TT")
  }

  async function geo() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude }
          setLocation(coords)
          resolve(coords)
        },
        (err) => reject(err)
      )
    })
  }

  async function fetchDataWeek(coords) {
    try {
      const data = await weatherForWeek(coords)
      setWeatherData(data)
    } catch (error) {
      console.error("Error fetching week weather:", error)
    }
  }

  async function fetchDataDay(coords) {
    try {
      const data = await weatherInDay(coords)
      setWeatherDayData(data)
    } catch (error) {
      console.error("Error fetching day weather:", error)
    }
  }

  const onFetchChosenCity =async (loc)=>{
    await fetchDataWeek(loc)
    await fetchDataDay(loc)
  }

  const getDefaultData = async () => {
    const defaultCoords = { lon: 24.03, lat: 49.84 }
    try {
      await fetchDataWeek(defaultCoords)
      await fetchDataDay(defaultCoords)
    } catch (error) {
      console.error("Error fetching default data:", error)
    }
  }

  useEffect(() => {
    if (!location) {
      getDefaultData()
    }
  }, [])

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!location ) {
        const loc = await geo()
        setLocation(loc)
        await fetchDataDay(loc)
        await fetchDataWeek(loc)
        await fetchNearbyPlacesAndFindNearest(loc)
      } else {
        await fetchDataDay(location)
        await fetchDataWeek(location)
        await fetchNearbyPlacesAndFindNearest(location); 
      }
    }

    fetchLocationData()
  }, [location])

  useEffect(()=>{
    if((typeof doSearch)==='string'){
      onFetchChosenCity(doSearch)
    }
  }, [doSearch])

  const fetchNearbyPlacesAndFindNearest = async (coords) => {
    try {
      const places = await fetchNearbyPlaces(coords);
      setNearbyPlaces(places);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  const showSunTime = (time) => {
    const date = convertTimestampToDate(time)
    return dateFormat(date, "hh:mm TT")
  }

  const showDuration = (sunrise, sunset) => {
    const sunriseDate = convertTimestampToDate(sunrise)
    const sunsetDate = convertTimestampToDate(sunset)

    let hours = sunsetDate.getHours() - sunriseDate.getHours()
    let minutes = sunsetDate.getMinutes() - sunriseDate.getMinutes()

    if (minutes < 0) {
      minutes += 60
      hours -= 1
    }

    return `${hours}:${minutes}`
  }

  const showDate = (dt) => {
    const date = new Date(dt * 1000)
    return dateFormat(date, "dd:mm:yyyy")
  }

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date
  }

  return (
    <div>
      {tab ? (
        <WeekWeather
          WeekWeatherItem={WeekWeatherItem}
          data={weather}
          showCurrentDay={showCurrentDay}
          isActive={isActive}
          dateFormat={dateFormat}
        />
      ) : (
        <CurrentWeatherComponent
          weatherDay={weatherDay}
          showDuration={showDuration}
          showDate={showDate}
          showSunTime={showSunTime}
        />
      )}
      <HourlyWeather
        HourlyItem={HourlyItem}
        weatherData={weather}
        degToDirection={degToDirection}
        date={date}
        getHour={getHour}
        dateFormat={dateFormat}
       
      />
      <NearlyPlacesWeather
        places={nearbyPlaces}
        onFetchChosenCity={onFetchChosenCity}
      />
    </div>
  )
}
