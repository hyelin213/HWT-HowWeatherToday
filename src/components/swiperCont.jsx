import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WeatherProfile from './weatherProfile';
import NationalWeather from './nationalWeather';

export default function SwiperCont() {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
        >
            <SwiperSlide>
                <WeatherProfile />
            </SwiperSlide>
            <SwiperSlide>
                <NationalWeather />
            </SwiperSlide>
            <SwiperSlide>
                Slide 3
            </SwiperSlide>
        </Swiper>
    );
}