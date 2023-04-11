import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import NationalWeather from './nationalWeather';
import ClothesRecomm from './clothesRecomm';
import ColorChange from './colorChange';

import '../style.css';
import '../style-Mobile.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
        setLoading(true);
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

                // 사용하지 않게 되었지만 정보를 위해 남겨두는 코드 -----------------------*
                // 일출
                const sunriseTime = new Date(data.sys.sunrise * 1000);
                const sunrise = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
                setSunrise(sunrise);

                // 일몰
                const sunsetTime = new Date(data.sys.sunset * 1000);
                const sunset = `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
                setSunset(sunset);
                // --------------------------------------------------------------------*

                const temp = Math.round(data.main.temp);
                setCurrentTemp(temp);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })

        setLoading(false);
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
                    return (data.dt_txt.includes('06:00:00') && date.getDate() !== new Date().getDate())
                })
                setWeeklyWeather(filterWeekly);
            })
    }

    useEffect(() => {
        requestCoords();
    }, []);

    // 현재 날씨 함수
    function renderWeatherData() {
        return (
            <div className='current-weather'>
                {currentWeather && (
                    <>
                        <div className="key-info">
                            <div className="key-info-top">
                                <h2 className='city-name'>{currentWeather.name}, {currentWeather.sys.country}</h2>
                                <p className='current-temp'>{currentTemp}℃</p>
                                <p className='current-feel-like'>which you feel {Math.round(currentWeather.main.feels_like)}℃</p>
                            </div>
                            <div className="key-info-bottom">
                                <p className='current-main'>It's {currentWeather.weather[currentWeather.weather.length - 1].main}.</p>
                                <div className="key-info-bottom-right">
                                    <p>{Math.round(currentWeather.main.temp_min)}℃</p>
                                    <span></span>
                                    <p>{Math.round(currentWeather.main.temp_max)}℃</p>
                                </div>
                            </div>
                        </div>
                        <div className="sub-info">
                            <p>Wind {currentWeather.wind.speed}m/s</p>
                            <p>Humidity {currentWeather.main.humidity}%</p>
                        </div>
                        <ClothesRecomm temp={currentTemp} />
                    </>
                )
                }
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
                className='hourly-class'
            >
                <p className='time'>{data.dt_txt.split(' ')[1].slice(0, 2)}시</p>
                <p className='temp'>{Math.round(data.main.temp)}°C</p>
                <p className='day-main'>{data.weather[data.weather.length - 1].main}</p>
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
                className='weekly-class'
            >
                <p className='date'>{data.dt_txt.split(' ')[0].slice(5).replace('-', '/')}</p>
                <p className='temp'>{Math.round(data.main.temp)}°C</p>
                <p className='day-main'>{data.weather[data.weather.length - 1].main}</p>
            </div>
        ))
    }

    // 검색창
    function handleChange(e) {
        setCity(e.target.value);
    }

    function handleSubmit(e) {
        setError(false);
        e.preventDefault();

        if (!city) {
            return alert('지역을 입력해 주세요.');
        }

        setCurrentWeather(getCurrentWeather);
        setHourlyWeather(getHourlyWeather);
        setWeeklyWeather(getWeeklyWeather);
        setCity('');
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    // 현재 시간 실시간 반영 (moment.js)
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
        <div className='container'>
            <div className='weather-page'>
                <div className='header'>
                    <h1>HWT</h1>
                    <p>HYLN, <a href='https://github.com/hyelin213/weatherWeb.git' target={'_blank'}>Github</a></p>
                </div>
                <div className="weather-page-container">
                    <div className='search-city'>
                        <input
                            type="text"
                            className='city-title'
                            value={city}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type='button'
                            className='search-btn'
                            onClick={handleSubmit}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div className='today-now'>
                        <div className='today-day'>{nowTime.format('dddd')}</div>
                        <span></span>
                        <div className='today-date'>{nowTime.format('YYYY/MM/DD HH:mm')}</div>
                    </div>

                    {loading ? (
                        <div className="loading">
                            <h2>Please wait<br />a moment🌞</h2>
                        </div>
                    ) : (
                        <Swiper spaceBetween={50} slidesPerView={1} className='weather-slide'>
                            <SwiperSlide className='weather-page-first'>
                                {
                                    error ? (
                                        <div className='nothing-info'>
                                            <h2>Sorry,</h2>
                                            <p>해당 도시에 대한 정보가 없습니다.</p>
                                            <span>There is no information about the city.</span>
                                        </div>
                                    ) : (
                                        renderWeatherData()
                                    )
                                }
                                {hourlyWeather &&
                                    <div className="hourly-weather">
                                        <h4>Hourly</h4>
                                        {renderHourlyWeatherData()}
                                    </div>
                                }
                                {weeklyWeather &&
                                    <div className="weekly-weather">
                                        <h4>Weekly</h4>
                                        {renderWeeklyWeatherData()}
                                    </div>
                                }
                            </SwiperSlide>
                            <SwiperSlide className='weather-page-second'>
                                <NationalWeather />
                            </SwiperSlide>
                        </Swiper>
                    )}
                </div>
            </div>
            <ColorChange temp={currentTemp}></ColorChange>
        </div>
    );


}
