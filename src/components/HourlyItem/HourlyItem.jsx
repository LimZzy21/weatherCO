export const HourlyItem = ({el, getHour, degToDirection})=>{

    return(
        <div key={el.dt} className='col '>
            <p>{getHour(el.dt_txt).toLocaleString()}</p>
            <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`} alt={el.weather[0].icon} />
            <p className='mb-2'>{el.weather[0].main}</p>
            <p>{(el.main.temp - 273.15).toFixed()}°C</p>
            <p>{(el.main.feels_like - 273.15).toFixed()}°C</p>
            <p>{el.wind.speed.toFixed()} {degToDirection(el.wind.deg).toLocaleString()}</p>
            
        </div>
    )

} 
