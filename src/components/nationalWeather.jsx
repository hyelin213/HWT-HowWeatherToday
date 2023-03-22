import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '919907ac8d8febcd146eacdbfef2f528';
const cityIds = '1841610,1876101,1845105,1845106,1845789,1841597,1845788,1902028,1846265';

export default function NationalWeather() {

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        let api = `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`

        axios.get(api)
            .then(res => {
                const data = res.data.list;
                setWeatherData(data);
            })
    }, []);

    return (
        <>
            <div className='national-weather'>
                <div className="title">
                    <h2>National weather</h2>
                    <p>Republic of Korea</p>
                </div>
                <div className="national-weather-container">
                    {weatherData.map(data => (
                        <div key={data.id} className='national-class'>
                            <h3>{data.name}</h3>
                            <div className="regional-details">
                                <p className='day-main'>{data.weather[data.weather.length - 1].main},</p>
                                <p className='temp'>{Math.round(data.main.temp)}℃</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}