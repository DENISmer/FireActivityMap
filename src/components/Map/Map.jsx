import React, {useEffect, useRef, useState} from 'react';
import {Circle, useMap, useMapEvent, useMapEvents} from "react-leaflet";
import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
    LayersControl,
    LayerGroup,
    ScaleControl,
} from "react-leaflet";
import './Map.css';
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
import {MouseCoordinates} from "../Info/Coordinates";
import nationalParks from '../Info/national-parks.json'
import {GeoJSON} from 'react-leaflet/GeoJSON'
//import axios from "axios";
function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

export default function MapComponent(){
    const {BaseLayer} = LayersControl;

    const center = [33.505, -0.09]

    // const [geoJSON,setgeoJSON] = useState(null);
    // const [reference,setReference] = useState(null);
    //
    // const getHospitals = async () => {
    //     let hospitals = await axios.get(
    //         "https://cartovis-server.herokuapp.com/hospitales"
    //     );
    //
    //     let reference = React.createRef();
    //
    //     setgeoJSON(hospitals);
    //     setReference(reference)
    //     console.log("zbs")
    // };

            console.log(nationalParks.map(nat => (nat.latitude))
            )




    return <>
                <MapContainer minZoom={2.3} maxZoom={13} zoom={3} center={center}  doubleClickZoom={false} maxBounds={[[-110,-170],[100,200]]} >
                    <ScaleControl position="topleft" />
                    <Header />
                    <MainNavBar />
                    <MouseCoordinates />
                    <GeoJSON

                    />
                    <LayersControl>
                        <BaseLayer name="Sattelite" checked={true} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViaW5uYXciLCJhIjoiY2xiMTFmcnZmMXBnbDNwbXA4bHFkcDdyciJ9.CxX9zdanJzvnGxgEDz7bJw'}
                            />
                        </BaseLayer>
                        <BaseLayer name="Streets">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                            />
                        </BaseLayer>
                        <LayersControl.Overlay checked name="Fires from FIRMS(MODIS)">
                            <LayerGroup>
                                {nationalParks.map(nat =>(
                                    <Marker icon={GetIcon(5,5)}
                                            key = {nat.frp}
                                            position = {[nat.latitude,nat.longitude]}>
                                        <Popup>
                                            Время: {nat.acq_time}
                                            <br/>
                                            Координаты: {nat.latitude}, {nat.longitude}
                                            <br/>
                                            Яркость: {nat.brightness}
                                            <br/>
                                        </Popup>
                                    </Marker>
                                ))}</LayerGroup>
                        </LayersControl.Overlay>
                        <BaseLayer name="ESRI" >
                            <LayerGroup>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
                                />

                                <Marker position={[55,33]} icon={GetIcon(20,20)}>
                                    <Popup>
                                        yoooo
                                    </Popup>
                                </Marker>
                            </LayerGroup>
                        </BaseLayer>
                    </LayersControl>
                    <Marker position={center} icon={GetIcon(20,20)}>
                        <Popup >
                            text here
                        </Popup>
                    </Marker>
                </MapContainer>
            </>
    }