import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function WeatherProfile(props) {
    // {image, name, title}로 받아온다면 props라고 하지 않고
    // 바로 키 값을 넣어 조금 더 깔끔하게 작성할 수 있다.
    // 헷갈릴 땐 외부로 전달하는 과정이라고 다시 한 번 이해하자

    // (if)_분기문 사용 시, 파라미터 내에 isNew가 있다면.
    // ex) {isNew && <span className='new'>New</span>}

    const api = '919907ac8d8febcd146eacdbfef2f528';
    const city = 1835327;
    const lat = 35.8;
    const lon = 128.55;
    
    useEffect(() => {
        // Promise.all([
        //     axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`)
        // ], [
        //     axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${api}`)
        // ])
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${api}`)
        .then(res => {
            // console.log(res.data.list);
            let conver = (res.data.list[3].main.temp)-273.15;
            console.log(Math.round(conver));
        })
    }, []);

    return (
        <>
        </>
    );
    
    
}
