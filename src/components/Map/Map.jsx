import L from 'leaflet';
import {GeoJSON, LayerGroup, LayersControl, MapContainer, ScaleControl, TileLayer, ZoomControl,} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css';
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
import {MouseCoordinates} from "../Info/Coordinates";
import Mark_render from "./mark_render";
import {useState, createContext, useContext} from "react";
import {TimeLine} from "../TimeLine/TimeLine";
import {Ruler} from './Ruler/Ruler.jsx'
import { Context } from "./Context";
import {PointsRequest} from "./PointsRequest/PointsRequest";

const MyContext = createContext("Without provider");

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

export default function MapComponent(){

    const [context, setContext] = useState('YYYY-MM-DD');
    const {BaseLayer} = LayersControl;
    const center = [33.505, -0.09]
    const [map,setMap] = useState(null)

    return <>
                <MapContainer zoomControl={false} minZoom={2.3} maxZoom={13} zoom={3} center={center} whenReady={setMap} doubleClickZoom={false} maxBounds={[[-110,-170],[100,200]]} >
                    <ZoomControl position={'bottomleft'}/>
                    <ScaleControl position={"bottomleft"} />
                    <Ruler />

                    <Header />
                    <MainNavBar />
                    <MouseCoordinates />
                    {/*<PointsRequest />*/}
                    <Context.Provider value={[context, setContext]}>
                        <GeoJSON >
                            <Mark_render />
                        </GeoJSON>
                        <TimeLine />
                    </Context.Provider>

                    <LayersControl>
                        <BaseLayer name="Спутник" checked={true} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViaW5uYXciLCJhIjoiY2xiMTFmcnZmMXBnbDNwbXA4bHFkcDdyciJ9.CxX9zdanJzvnGxgEDz7bJw'}
                            />
                        </BaseLayer>
                        <BaseLayer name="Улицы">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                            />
                        </BaseLayer>
                        <BaseLayer name="Тёмная">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'}
                            />
                        </BaseLayer>
                        <LayersControl.Overlay name="Fires from FIRMS(MODIS)" checked={false}>
                            <LayerGroup>

                            </LayerGroup>
                        </LayersControl.Overlay>
                        <BaseLayer name="ESRI" >
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