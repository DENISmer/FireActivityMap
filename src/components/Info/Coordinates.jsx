import react, {useState} from 'react'
import './Coordiantes.css'
import {useMapEvent} from "react-leaflet";
import React from "react";

export function MouseCoordinates() {
    const [position, setPosition] = useState({})
    const map = useMapEvent("mousemove", e => {
        setPosition({lat: e.latlng.lat, lng: e.latlng.lng})
    });

    const {lat, lng} = position

    return(
        <div className={'main'}>
            <b>latitude</b>: {lat?.toFixed(4)} <br />
            <b>longitude</b>: {lng?.toFixed(4)}
        </div >
    );
}