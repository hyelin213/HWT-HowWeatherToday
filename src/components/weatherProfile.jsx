import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherProfile() {
    // {image, name, title}로 받아온다면 props라고 하지 않고
    // 바로 키 값을 넣어 조금 더 깔끔하게 작성할 수 있다.
    // 헷갈릴 땐 외부로 전달하는 과정이라고 다시 한 번 이해하자

    // (if)_분기문 사용 시, 파라미터 내에 isNew가 있다면.
    // ex) {isNew && <span className='new'>New</span>}

    // 1. city를 선택할 때마다 해당 도시의 날씨 정보가 출력된다.
    // 2. 처음 접속했을 때는 latitude, longitude의 기준으로 출력한다.
    // 3. swiper 기능으로 도시 날씨, 전국 날씨, 추천 옷차림을 볼 수 있다.

    const [city, setCity] = useState('');
    const [coords, saveCoords] = useState();
    const [weather, setWeather] = useState(null);

    const apiKey = '919907ac8d8febcd146eacdbfef2f528';

    // 현재 위치 추출
    function handleGeoSucc(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            latitude,
            longitude
        };

        saveCoords(coordsObj);
        getWeatherlocation(latitude, longitude);
    }

    // 에러 코드
    function handleGeoErr(err) {
        console.log('geo err!' + err);
    }

    function requestCoords() {
        navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }

    // 현재 위치의 날씨를 출력하는 함수
    function getWeatherlocation(lat, lon) {
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
                setWeather(data);
            })
    }

    useEffect(() => {
        requestCoords();
    }, [city]);

    return (
        <>
            <div className='select-city'>
                <input
                    type="text"
                    className='city-title'
                    placeholder='지역을 입력하세요😊'
                    onChange={e => 
                        setTimeout(() => {
                            setCity(e.target.value)
                        }, 1500)
                    }
                />
                <button
                    type='submit'
                    onClick={e => setCity(e.target.value)}
                >
                    search
                </button>
            </div>
            <div className='weather-container'>
                {weather && (
                    <>
                        <h2>{weather.name}</h2>
                        <p>{weather.weather[weather.weather.length - 1].main}</p>
                        <p>{Math.round(weather.main.temp)}℃</p>
                        <p>체감온도 {Math.round(weather.main.feels_like)}℃</p>
                    </>
                )}
            </div>
        </>
    );
}
