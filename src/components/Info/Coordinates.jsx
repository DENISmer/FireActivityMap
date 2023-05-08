import react, {useState} from 'react'
import './Coordiantes.css'
import {useMapEvent} from "react-leaflet";
import React from "react";
import {disableMapDragging, enableMapDragging} from "../Map/MapEvents/MapEvents";

export function MouseCoordinates(props) {
    const [position, setPosition] = useState({})
    const map = useMapEvent("mousemove", e => {
        setPosition({lat: e.latlng.lat, lng: e.latlng.lng})
    });

    const {lat, lng} = position

    return(
        <div className={'main'} onMouseDown={() => disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>
            <b>Широта</b>: {lat?.toFixed(4)} <br />
            <b>Долгота</b>: {lng?.toFixed(4)}
        </div >
    );
}