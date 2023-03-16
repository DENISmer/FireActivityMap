import L from 'leaflet';
import {
    GeoJSON,
    ImageOverlay,
    LayerGroup,
    LayersControl,
    MapContainer,
    ScaleControl,
    TileLayer,
    ZoomControl,
} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css';
import React, {useRef} from "react";
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
import {MouseCoordinates} from "../Info/Coordinates";
import Mark_render from "./mark_render";
import {useState, createContext, useContext, useEffect, useMemo, useCallback} from "react";
import {TimeLine} from "../TimeLine/TimeLine";
import {Ruler} from './Ruler/Ruler.jsx'
import { Context } from "./Context";
import '../../data/map_images/chinfire/20220515/0705/FY3D_MERSI_GBAL_L1_20220515_0705_1000M_MS_7_20_21.png'
import axios from "axios";
import {LatLngBounds} from "leaflet/src/geo";
import {isRouteErrorResponse} from "react-router-dom";

const MyContext = createContext("Without provider");

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

const MemoizedChildComponentMark_render = React.memo(Mark_render);
const MemoizedChildComponentTimeline = React.memo(TimeLine);
export function MapComponent(){
    const [context, setContext] = useState(Context);
    const {BaseLayer} = LayersControl;
    const center = [65.505, 106.09]
    const [map,setMap] = useState(null)
    const [bounds,setBounds] = useState([]);
    const [image_url,setImageUrl] = useState();
    const [image_date,setImageDate] = useState();
    const [file,setFile] = useState();
    const [min_time,setMinTime] = useState();
    let b = [[10.435,5.3456],[13.4356,23.654]]

    useEffect(()=>{
        console.log(context.currentDate)
        try{

            if(context.currentDate !== undefined){
                setImageDate(context.currentDate.split('-').join(''))
                setMinTime(new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1])
                setFile(require(`../../data/map_images/chinfire/${image_date}/${min_time}/FY3D_MERSI_GBAL_L1_${image_date}_${min_time}_1000M_MS.txt`))
                axios.get(file).then(response => {
                        setBounds([[Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])],[Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])]])
                        console.log(response.data)
                        console.log(bounds)
                    }
                ).catch(
                    error =>
                        console.log(error)
                )
                setImageUrl(require(`../../data/map_images/chinfire/${image_date}/${min_time}/FY3D_MERSI_GBAL_L1_${image_date}_${min_time}_1000M_MS_7_20_21.png`))
            }
        }
        catch (error){
            console.log(error.message)
        }
        console.log(bounds,b)
    },[context])
    return <>
        <MapContainer zoomControl={false} minZoom={3.6} maxZoom={13} zoom={4} center={center} ref={setMap} doubleClickZoom={false} maxBounds={[[-110,-170],[100,200]]} >
            <ZoomControl position={'bottomleft'}/>
            <ScaleControl position={"bottomleft"} />
            <Ruler />

            <Header />


            <MouseCoordinates />

            <Context.Provider value={[context, setContext]}>
                <GeoJSON >
                    <MemoizedChildComponentMark_render />
                </GeoJSON>
                <MainNavBar map={map}/>
                <MemoizedChildComponentTimeline />
                {/*<CurrentDayDisplay />*/}


                <LayersControl>
                    <BaseLayer name="Спутник">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url={'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViaW5uYXciLCJhIjoiY2xiMTFmcnZmMXBnbDNwbXA4bHFkcDdyciJ9.CxX9zdanJzvnGxgEDz7bJw'}
                        />
                    </BaseLayer>
                    <BaseLayer name="Улицы" checked={true} >
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
                            <ImageOverlay url={image_url} bounds={bounds}>
                            </ImageOverlay>
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
            </Context.Provider>
        </MapContainer>

    </>
    }