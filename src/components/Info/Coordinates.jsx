import {useState} from 'react'
import './Coordiantes.css'
import {useMapEvent} from "react-leaflet";
import React from "react";
import {disableMapDragging, enableMapDragging} from "../Map/MapEvents/MapEvents";

export function MouseCoordinates(props) {
    const [position, setPosition] = useState({})

    const convertToDms =(dd, isLng) => {
        let dir = dd < 0
            ? isLng ? 'з' : 'ю'
            : isLng ? 'в' : 'с';

        let absDd = Math.abs(dd);
        let deg = absDd | 0;
        let frac = absDd - deg;
        let min = (frac * 60) | 0;
        let sec = frac * 3600 - min * 60;
        // Round it to 2 decimal points.
        sec = Math.round(sec * 100) / 100;
        return deg + "°" + min + "'" + sec + '"' + dir;
    }

    const map = useMapEvent("mousemove", e => {
        setPosition({lat: convertToDms(e.latlng.lat, false), lng: convertToDms(e.latlng.lng, true)})
    });

    const {lat, lng} = position

    return(
        <div className={'main'} onMouseDown={() => disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>
            <b></b>{lat}.ш<br />
            <b></b>{lng}.д
        </div >
    );
}