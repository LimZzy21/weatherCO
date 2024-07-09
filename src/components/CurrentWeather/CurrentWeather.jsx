import { useEffect, useState } from 'react';


import './currentWeather.css'
export const CurrentWeatherComponent = ({ showSunTime, showDuration, showDate, weatherDay,location}) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (weatherDay) {
            setWeatherData(weatherDay)
        }
        

    }, [weatherDay])
    useEffect(() => {
      
    }, [location]);




    if (weatherData) {
        return (
            <div className='container mt-4 pb-3 bg-white text-primary currentContainer'>
                <div className='row'>
                    <div className='col-sm-12 col-lg-3'>
                        <h4 className='m-3'>Current weather</h4>
                        <div className=' ms-3 row text-center flex-column '>
                            <img alt={weatherData.weather[0].icon} className='col-sm-12 col-lg-12 w-100' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
                            <h4 className='col-sm-12 col-lg-12 w-100'>{weatherData.weather[0].main}</h4>
                        </div>

                    </div>

                    <div className='col-lg-6 row text-center align-content-center text-black'>
                        <h1 className='wTemp'>{(weatherData.main.temp - 273.15).toFixed()}°C</h1>
                        <p>Real feel:{(weatherData.main.feels_like - 273.15).toFixed()}°C</p>
                        <h4>{weatherData.name}</h4>
                    </div>

                    <div className='col-lg-3'>
                        <h4 className='m-3 text-center'>{showDate(weatherData.dt)}</h4>
                        <div className='row text-black text-center'>
                            <h4>Sunrise:  {showSunTime(weatherData.sys.sunrise)}</h4>
                            <h4>Sunset: {showSunTime(weatherData.sys.sunset)}</h4>
                            <h4>Duration: {showDuration(weatherData.sys.sunrise, weatherData.sys.sunset).toLocaleString()} hrs</h4>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
};
