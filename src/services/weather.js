
export const weatherInDay = (location) => {
    if (typeof location === 'object') {
        const { lat, lon } = location
        return `http://api.openweathermap.org/data/2.5/weather?lat=${lat.toString().slice(0, 5)}&lon=${lon.toString().slice(0, 5)}&APPID=d39a21e8eedc1f2fe1d0e7352e353761`

    } else if ((typeof location) === 'string') {
        return `http://api.openweathermap.org/data/2.5/weather?q=${location.toLowerCase()}&APPID=d39a21e8eedc1f2fe1d0e7352e353761`
    }
}

export const weatherForWeek = (location ) => {
    if (typeof location === 'object') {
        const { lat, lon } = location
        return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d39a21e8eedc1f2fe1d0e7352e353761`;
    } else if ((typeof location) === 'string') {
        return `http://api.openweathermap.org/data/2.5/forecast?q=${location.toLowerCase()}&appid=d39a21e8eedc1f2fe1d0e7352e353761`;
    }

}





