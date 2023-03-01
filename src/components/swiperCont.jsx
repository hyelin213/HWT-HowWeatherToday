import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WeatherProfile from './weatherProfile';

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
                Slide 2
            </SwiperSlide>
            <SwiperSlide>
                Slide 3
            </SwiperSlide>
        </Swiper>
    );
}