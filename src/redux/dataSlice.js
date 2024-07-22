import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { weatherInDay, weatherForWeek } from "../services/weather"



export const fetchLocationAndWeather = createAsyncThunk('data/fetchLocationAndWeather',
    async () => {

        const geo = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                (err) => resolve('lviv')
            );
        })

        const location = await geo

        const overpassQuery = `
            [out:json];
            node
            (around:5000,${location.lat},${location.lon})
            ["place"];
            out body;
        `

        const res = await axios.get(weatherInDay(location))
        const resWeek = await axios.get(weatherForWeek(location))
        const resNear = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`)


        const dataNear = resNear.data.elements.map(place => ({
            id: place.id,
            name: place.tags.name || 'Unnamed place',
            coords: { latitude: place.lat, longitude: place.lon },
        }));


        const weatherData = res.data
        const weatherWeekData = resWeek.data

        return { location, weather: weatherData, weatherWeek: weatherWeekData, dataNear }
    })

export const fetchBySearch = createAsyncThunk('data/fetchBySearch',
    async (location) => {
        const res = await axios.get(weatherInDay(location))
        const resWeek = await axios.get(weatherForWeek(location))
        const weatherData = res.data
        const weatherWeekData = resWeek.data

        return { weather: weatherData, weatherWeek: weatherWeekData }

    })


export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        status: 'idle',
        error: null,
        location: '',
        searchStr: '',
        weatherNow: null,
        weatherWeek: null,
        nearPlaces: []
    },
    reducers: {
        onChangeSearchStr: (state, action) => {
            state.searchStr = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLocationAndWeather.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchLocationAndWeather.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(action.payload);
                state.weatherNow = action.payload.weather
                state.weatherWeek = action.payload.weatherWeek
                state.location = action.payload.location
                state.nearPlaces = action.payload.dataNear
            })
            .addCase(fetchLocationAndWeather.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchBySearch.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBySearch.fulfilled, (state, action) => {
                state.weatherNow = action.payload.weather
                state.weatherWeek = action.payload.weatherWeek
                console.log(action.payload);
                state.status = 'succeeded'
            })
            .addCase(fetchBySearch.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(action.payload);
            })
    }
})

export const { onChangeSearchStr } = dataSlice.actions

export default dataSlice.reducer