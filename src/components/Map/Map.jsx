import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Popup,
    Polygon,
    Marker,
    LayersControl,
    LayerGroup,
    ScaleControl,
} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css';
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
import {MouseCoordinates} from "../Info/Coordinates";
import nationalParks from '../Info/national-parks.json'
import MarkerClusterGroup from "react-leaflet-cluster";
import {Layer} from "leaflet/src/layer";
import {Layers} from "@mui/icons-material";
import {Mark_render} from "./mark_render";
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




    return <>
                <MapContainer minZoom={2.3} maxZoom={13} zoom={3} center={center}  doubleClickZoom={false} maxBounds={[[-110,-170],[100,200]]} >
                    <ScaleControl position="topleft" />
                    <Header />
                    <MainNavBar />
                    <MouseCoordinates />

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
                        <LayersControl.Overlay name="Fires from FIRMS(MODIS)" checked={false}>
                            <LayerGroup>
                                <Mark_render />
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <BaseLayer preferCanvas={true} name="ESRI" >
                            <LayerGroup>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
                                />

                            </LayerGroup>
                        </BaseLayer>
                    </LayersControl>


                </MapContainer>
            </>
    }