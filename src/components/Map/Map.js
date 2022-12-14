import React, {Component} from "react";
import L from 'leaflet';
import { MapContainer, TileLayer,Popup, Marker, LayersControl,LayerGroup } from "react-leaflet";
import './Map.css';
import {useState} from "react";


L.Icon.Default.imagePath = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Anonymous_SVG.svg/1200px-Anonymous_SVG.svg.png";
export default function MapComponent(){
        const {BaseLayer} = LayersControl;
        let center = [55.702, 37.530]
    return (
            <div>
                <MapContainer zoom={3} center={center}>
                    <div className="navBar">asdfgdfgdfg</div>
                    <LayersControl>
                        <BaseLayer name="Sattelite">
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
                    </LayersControl>
                    <Marker position={center}>
                        <Popup>
                            text here
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        );
    }