import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherProfile() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '919907ac8d8febcd146eacdbfef2f528';

  useEffect(() => {
    const fetchWeather = async () => {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
        if (city) {
          apiUrl += `&q=${city}`;
        } else {
          navigator.geolocation.getCurrentPosition(position => {
            apiUrl += `&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
          });
        }
        const response = await axios.get(apiUrl);
        setWeather(response.data);
    //   try {
    //     setError(null);
    //   } catch (error) {
    //     setError(error.response.data.message);
    //   }
    };
    fetchWeather();
  }, [city]);

  return (
    <div>
      <input
        type="text"
        className='city-title'
        value={city}
        placeholder="지역을 입력하세요😊"
        onKeyUp={event => setCity(event.target.value)}
      />
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
      {/* {error && <p>{error}</p>} */}
    </div>
  );
}
