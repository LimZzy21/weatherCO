import axios from 'axios';

export const weatherInDay = (location) => {
    let dayUrl 
    if(typeof location === 'object'){
        const {lat,lon} = location
        dayUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat.toString().slice(0, 5)}&lon=${lon.toString().slice(0, 5) }&APPID=d39a21e8eedc1f2fe1d0e7352e353761`

    } else if ((typeof location) === 'string') {
        dayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location.toLowerCase()}&APPID=d39a21e8eedc1f2fe1d0e7352e353761`
    } else{
        dayUrl = `http://api.openweathermap.org/data/2.5/weather?q=lviv&APPID=d39a21e8eedc1f2fe1d0e7352e353761`
    }
        
           
    return axios.get(dayUrl)
        .then(res => res.data)
       
     
}
export const weatherForWeek = (location) => {
    let weekUrl;
    if (typeof location === 'object') {
        const { lat, lon } = location;
        weekUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d39a21e8eedc1f2fe1d0e7352e353761`;
    } else if ((typeof location)==='string'){
        weekUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location.toLowerCase()}&appid=d39a21e8eedc1f2fe1d0e7352e353761`;
    }else {
        weekUrl = `http://api.openweathermap.org/data/2.5/forecast?q=lviv&appid=d39a21e8eedc1f2fe1d0e7352e353761`;
    }

    return axios.get(weekUrl)
        .then(res => res.data)
};





