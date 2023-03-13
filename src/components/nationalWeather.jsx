import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '919907ac8d8febcd146eacdbfef2f528';
const cityIds = '1835848,1838524,1835329,1843564,1841808,1835235,1833747,1841597,1843137,1845106,1845105,1845789,1841881,1838754,1839726';

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
            <div className='weather-page'>
                <h2>전국 날씨</h2>
                {weatherData.map(data => (
                    <div key={data.id}>
                        <h3>{data.name}</h3>
                        <p>{data.weather[data.weather.length - 1].description}</p>
                        <p>{Math.round(data.main.temp)}℃</p>
                    </div>
                ))}
            </div>
        </>
    )


}