import React, {useCallback, useEffect, useState} from 'react';
import {useMapEvents} from "react-leaflet";
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
//import { CoordinatesControl } from 'react-leaflet-box-zoom'
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
//import {Measure} from 'leaflet-measure';
import {Coordinates} from "../Info/Coordinates";

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/marker.png"),
        iconSize: [_iconSize]
    })
}



export default function MapComponent(){

    const {BaseLayer} = LayersControl;
    let center = [35.702, 37.530]
    const [map, setMap] = useState(null);

    const [coords, setCoords] = useState({});

    useEffect((map) => {
        if(!map) return;

        map.addEventListener("mousemove", (e) => {
            setCoords({lat: e.latlng.lat, lng: e.latlng.lng} );
        });
    }, [map]);

    const {lat, lng} = coords;


    return (
            <>
                <MapContainer minZoom={2.3} maxZoom={13} zoom={3} center={center} whenReady={setMap} doubleClickZoom={false} maxBounds={[[-110,-170],[100,200]]} >
                    <ScaleControl position="topleft" />
                    <Header />
                    {lat ?
                        <div className={'main'}>
                            <b>latitude</b>: {lat?.toFixed(4)} <br />
                            <b>longitude</b>: {lng?.toFixed(4)}
                        </div > : <div className={'main'}>lng</div>
                    }
                    <MainNavBar />
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
                        <Popup>
                            text here
                        </Popup>
                    </Marker>
                </MapContainer>

            </>
        );
    }