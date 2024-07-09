import { useEffect, useState } from 'react';
import './WeekWeather.css';


export const WeekWeather = ({ WeekWeatherItem, showCurrentDay, data, isActive, dateFormat }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (data) {
            setWeather(data);
            
        }
    }, [data]);

    if (!weather) {
        return <h1 className="container text-center">Loading...</h1>;
    }

    const uniqueDays = [];
    const weekDays = weather.list.filter((el) => {
        const day = dateFormat(el.dt_txt, 'ddd');
        if (!uniqueDays.includes(day)) {
            uniqueDays.push(day);
            return true;
        }
        return false;
    });

    return (
        <div className='container mt-4 bg-white text-primary weekContainer'>

            <div className='row' style={{ margin: 0 }}>
                {weekDays.slice(0, 5).map((el, index) => {
                    let day = index === 0 ? 'Today' : dateFormat(el.dt_txt, 'ddd');
                    return (
                        <WeekWeatherItem key={el.dt} dateFormat={dateFormat} el={el} day={day} showCurrentDay={showCurrentDay} isActive={isActive} />
                    );
                })}
            </div>
        </div>
    );
};

