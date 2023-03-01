import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '919907ac8d8febcd146eacdbfef2f528';

const getCurrentWeather = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getWeeklyWeather = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.list;
  } catch (error) {
    console.error(error);
  }
};

export default function Weather() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const currentWeatherData = await getCurrentWeather(city);
    setCurrentWeather(currentWeatherData);

    const weeklyWeatherData = await getWeeklyWeather(city);
    setWeeklyWeather(weeklyWeatherData);
  };

  const renderCurrentWeatherData = () => {
    if (!currentWeather) {
      return null;
    }

    return (
      <div>
        <h2>Current Weather in {city}</h2>
        <p>Temperature: {currentWeather.main.temp}°C</p>
        <p>Weather: {currentWeather.weather[0].description}</p>
      </div>
    );
  };

  const renderWeeklyWeatherData = () => {
    if (!weeklyWeather) {
      return null;
    }

    return weeklyWeather.map((data) => (
      <div key={data.dt}>
        <p>{data.dt_txt}</p>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Weather: {data.weather[0].description}</p>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="cityInput">Enter a city name:</label>
        <input type="text" id="cityInput" value={city} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {renderCurrentWeatherData()}
      {renderWeeklyWeatherData()}
    </div>
  );
}