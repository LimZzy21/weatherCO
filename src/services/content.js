import dateFormat from "dateformat"

const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date
}

export const showSunTime = (time) => {
    const date = convertTimestampToDate(time)
    return dateFormat(date, "hh:mm TT")
}

export const showDuration = (sunrise, sunset) => { 
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

export const showDate = (dt) => {
    const date = new Date(dt * 1000)
    return dateFormat(date, "dd:mm:yyyy")
}

export const degToDirection = (deg) => {
    const directions = ["N", "NW", "W", "SW", "S", "SH", "E", "NE"]
    const index = Math.round(deg / 45) % 8
    return directions[index]
}

export const getHour = (dt_txt) => {
    const dt = new Date(dt_txt)
    return dateFormat(dt, "h TT")
}
