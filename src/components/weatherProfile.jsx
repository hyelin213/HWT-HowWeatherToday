import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import ClothesRecomm from './clothesRecomm';
import ColorChange from './colorChange';

export default function WeatherProfile() {
    // {image, name, title}로 받아온다면 props라고 하지 않고
    // 바로 키 값을 넣어 조금 더 깔끔하게 작성할 수 있다.
    // 헷갈릴 땐 외부로 전달하는 과정이라고 다시 한 번 이해하자

    // (if)_분기문 사용 시, 파라미터 내에 isNew가 있다면.
    // ex) {isNew && <span className='new'>New</span>}

    // 1. city를 검색할 때마다 해당 도시의 날씨 정보가 출력된다.
    // 2. 처음 접속했을 때는 latitude, longitude의 기준으로 출력한다.
    // 3. swiper 기능으로 도시 날씨, 전국 날씨, 추천 옷차림을 볼 수 있다.

    const [city, setCity] = useState('');

    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [weeklyWeather, setWeeklyWeather] = useState(null);

    const [currentTemp, setCurrentTemp] = useState(null);
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');

    const apiKey = '919907ac8d8febcd146eacdbfef2f528';

    // 현재 위치 추출
    function handleGeoSucc(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCurrentWeather(latitude, longitude);
        getHourlyWeather(latitude, longitude);
        getWeeklyWeather(latitude, longitude);
    }

    // 에러 코드
    function handleGeoErr(err) {
        console.log('geo err!' + err);
    }

    function requestCoords() {
        navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }

    // 현재 날씨 출력
    function getCurrentWeather(lat, lon) {
        let api = `http://api.openweathermap.org/data/2.5/weather?&lang=kr&units=metric&appid=${apiKey}`;

        if (city) {
            api += `&q=${city}`;
        }
        else {
            api += `&lat=${lat}&lon=${lon}`;
        }

        axios.get(api)
            .then(res => {
                const data = res.data;
                setCurrentWeather(data);

                // 일출
                const sunriseTime = new Date(data.sys.sunrise * 1000);
                const sunrise = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
                setSunrise(sunrise);

                // 일몰
                const sunsetTime = new Date(data.sys.sunset * 1000);
                const sunset = `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
                setSunset(sunset);

                const temp = Math.round(data.main.temp);
                setCurrentTemp(temp);
            })
            .catch(err => {
                console.log(err);
            })
    }


    // 해당 날짜의 시간 별 날씨와 주간 날씨 출력
    function getHourlyWeather(lat, lon) {
        let api = `http://api.openweathermap.org/data/2.5/forecast?&lang=kr&units=metric&appid=${apiKey}`;

        if (city) {
            api += `&q=${city}`;
        }
        else {
            api += `&lat=${lat}&lon=${lon}`;
        }

        axios.get(api)
            .then(res => {
                const data = res.data.list;

                // 오늘 날짜 시간 별 추출
                const filterHourly = data.filter(data => {
                    const date = new Date(data.dt_txt);
                    return date.getDate() === new Date().getDate();
                })
                setHourlyWeather(filterHourly);
            })
    }

    function getWeeklyWeather(lat, lon) {
        let api = `http://api.openweathermap.org/data/2.5/forecast?&lang=kr&units=metric&appid=${apiKey}`;

        if (city) {
            api += `&q=${city}`;
        }
        else {
            api += `&lat=${lat}&lon=${lon}`;
        }

        axios.get(api)
            .then(res => {
                const data = res.data.list;

                // 오늘 날짜 시간 별 추출
                const filterWeekly = data.filter(data => {
                    const date = new Date(data.dt_txt);
                    return (data.dt_txt.includes('15:00:00') && date.getDate() !== new Date().getDate())
                })
                setWeeklyWeather(filterWeekly);
            })
    }

    useEffect(() => {
        requestCoords();
    }, []);

    function handleChange(e) {
        setCity(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setCurrentWeather(getCurrentWeather);
        setHourlyWeather(getHourlyWeather);
        setWeeklyWeather(getWeeklyWeather);
    }

    // 현재 날씨 함수
    function renderWeatherData() {
        if (!currentWeather) {
            return null;
        }

        return (
            <div className='current-weather'>
                {currentWeather && (
                    <>
                        <h2>{currentWeather.name}, {currentWeather.sys.country}</h2>
                        <p>{currentWeather.weather[currentWeather.weather.length - 1].main}</p>
                        <p>{currentTemp}℃</p>
                        <p>체감온도 {Math.round(currentWeather.main.feels_like)}℃</p>
                        <p>최저기온 {Math.round(currentWeather.main.temp_min)}℃</p>
                        <p>최고기온 {Math.round(currentWeather.main.temp_max)}℃</p>
                        <p>풍속 {currentWeather.wind.speed}m/s</p>
                        <p>습도 {currentWeather.main.humidity}%</p>
                        <p>일출 {sunrise}</p>
                        <p>일몰 {sunset}</p>
                        <ClothesRecomm temp={currentTemp} />
                    </>
                )}
            </div>
        );
    }

    // 시간 별 날씨 함수
    function renderHourlyWeatherData() {
        if (!hourlyWeather) {
            return null;
        }

        return hourlyWeather.map(data => (
            <div
                key={data.dt}
                className='hourly-weather'
            >
                <p>시간: {data.dt_txt.split(' ')[1]}</p>
                <p>{Math.round(data.main.temp)}°C</p>
                <p>{data.weather[data.weather.length - 1].main}</p>
            </div>
        ))
    }

    // 주간 날씨 함수
    function renderWeeklyWeatherData() {
        if (!weeklyWeather) {
            return null;
        }

        return weeklyWeather.map(data => (
            <div
                key={data.dt}
                className='weekly-weather'
            >
                <p>날짜: {data.dt_txt.split(' ')[0]}</p>
                <p>{Math.round(data.main.temp)}°C</p>
                <p>{data.weather[data.weather.length - 1].main}</p>
            </div>
        ))

    }

    // 현재 시간 실시간 반영
    let timer = null;
    const [nowTime, setNowTime] = useState(moment());

    useEffect(() => {
        timer = setInterval(() => {
            setNowTime(moment());
        }, 1000)

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <div className='first-weather-page'>
                <div className='select-city'>
                    <form>
                        <input
                            type="text"
                            className='city-title'
                            placeholder='지역을 입력하세요😊'
                            onChange={handleChange}
                        />
                        <button
                            type='button'
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className='today-now'>
                    <div>{nowTime.format('dddd')}</div>
                    <div>{nowTime.format('YYYY/MM/DD HH:mm')}</div>
                </div>
                {renderWeatherData()}
                <p>======================== 시간 날씨 ========================</p>
                {renderHourlyWeatherData()}
                <p>======================== 주간 날씨 ========================</p>
                {renderWeeklyWeatherData()}
            </div>
            <ColorChange temp={currentTemp}></ColorChange>
        </>
    );
}
