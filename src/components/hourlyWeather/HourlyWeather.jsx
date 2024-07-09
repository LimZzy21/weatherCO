import { useEffect } from 'react';
import './HourlyWeather.css'

export const HourlyWeather = ({ HourlyItem, weatherData, date, degToDirection, getHour, dateFormat }) => {

    useEffect(() => {}, [date])

    if (!weatherData) return null

        return (
            <div className={`container container-sm container-lg mt-4 bg-white text-primary`}>
                <div>
                    <h4 className='p-3'>Hourly</h4>
                    <h4></h4>
                </div>

                <div className='ms-4 row  text-secondary'>
                    <div className='col-sm-2 col-lg-2'>
                        <h4>Today</h4>
                        <h5 className='forecast-row'></h5>
                        <h5>Forecast</h5>
                        <h5>Temp</h5>
                        <h5>RealFeel</h5>
                        <h5>Wind</h5>
                        <p>{weatherData.city.name}</p>
                    </div>

                    {weatherData.list.map(el => (dateFormat(el.dt_txt, 'd') === date) ? <HourlyItem  key={el.dt_txt} el={el} getHour={getHour} degToDirection={degToDirection}/> : '')}
                   
                </div>

            </div>
        )
    

}

