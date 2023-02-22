import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchBox from './searchBox';

export default function WeatherProfile(props) {
    // {image, name, title}로 받아온다면 props라고 하지 않고
    // 바로 키 값을 넣어 조금 더 깔끔하게 작성할 수 있다.
    // 헷갈릴 땐 외부로 전달하는 과정이라고 다시 한 번 이해하자

    // (if)_분기문 사용 시, 파라미터 내에 isNew가 있다면.
    // ex) {isNew && <span className='new'>New</span>}

    // 1. input value 값에 따라 바뀌는 기준은 citycode
    // 2. 처음 접속했을 때와 input의 value값이 없거나 현재 위치와 동일할 때는
    //    latitude, longitude의 기준으로 출력한다.

    const [coords, saveCoords] = useState();
    const [temp, setTemp] = useState();
    const [name, setName] = useState('');
    const [weather, setWeather] = useState(null);
    const [feelLike, setFeelLike] = useState('');
    const cityName = e => {
        setName(e.target.value)
    }
    const apiKey = '919907ac8d8febcd146eacdbfef2f528';

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

    function getWeatherlocation(lat, lon) {
        let api = `http://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&lang=kr&units=metric&appid=${apiKey}`;
        
        axios.get(api)
        .then(res => {
            const data = res.data;
            console.log(data)
            const temp = Math.round(data.main.temp);
            const weathers = data.weather[data.weather.length - 1];

            setTemp(temp);
            setWeather(weathers.main);
            setName(data.name);
            setFeelLike(Math.round(data.main.feels_like));

            console.log(Math.round(data.main.temp)); // 현재 온도
            console.log(Math.round(data.main.feels_like)); // 체감 온도
            console.log(weathers.main) // 상태
            console.log(data.name); // 지역
        })
    }

    function handleGeoErr(err) {
        console.log('geo err!' + err);
    }

    function requestCoords() {
        navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }
    
    useEffect(() => {
        requestCoords();
    }, []);

    return (
        <>
            <div className='weather-container'>
                <h2>{name}</h2>
                <p>{weather}</p>
                <p>{temp}℃</p>
                <p>체감온도 {feelLike}℃</p>
            </div>
        </>
    );
}
