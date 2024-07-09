export const WeekWeatherItem = ({el, showCurrentDay, dateFormat,day, isActive})=>{
    return(
    <div key={el.dt_txt} onClick={() => showCurrentDay(dateFormat(el.dt_txt, 'shortDate'))} className={`weekItem col col text-black forecastFive mt-3 mb-3 text-center ${isActive === day ? 'isActive' : ''}`}>
        <h4 className="text-primary">{day}</h4>
        <p>{dateFormat(el.dt_txt, 'ddd dd').toUpperCase()}</p>
        <img  src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt={el.weather[0].icon} />
        <h3>{(el.main.temp - 273.15).toFixed()}°C</h3>
        <p className="text-secondary">{el.weather[0].main}</p>
        </div>)
}