import React from 'react';
import {useState, useEffect} from 'react';
import WeatherProfile from './weatherProfile';

export default function SearchBox() {

    return(
        <input
            type="text"
            className='city-title'
            autoFocus
        />
    );

}