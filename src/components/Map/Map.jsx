import L from 'leaflet';
import {
    GeoJSON,
    LayerGroup,
    LayersControl,
    MapContainer,
    ScaleControl,
    TileLayer,
    ZoomControl,
    Polyline
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
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import axios from "axios";
import {LatLngBounds} from "leaflet/src/geo";
import {isRouteErrorResponse} from "react-router-dom";
import {useCookies} from "react-cookie";
import {MutableImageOverlay} from "./MutableImageOverlay";
import CoordsData from "./countreCoords.json";

const MyContext = createContext("Without provider");

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

const MemoizedChildComponentMark_render = React.memo(Mark_render);
const MemoizedChildComponentTimeline = React.memo(TimeLine);

// function MutableImageOverlay(props) {
//     const [bounds,setBounds] = useState()
//     const [imageURL,setImageURL] = useState()
//     const [txtURL,setTxtURL] = useState()
//     try{
//         let imageDate = props.context.currentDate.split('-').join('')
//         let minImageTime = new Date(props.context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(props.context.min_datetime).toString().split(' ')[4].split(':')[1]
//
//         setTxtURL(require(`../../data/map_images/chinfire/${imageDate}/${minImageTime}/FY3D_MERSI_GBAL_L1_${imageDate}_${minImageTime}_1000M_MS.txt`))
//         setImageURL(require(`../../data/map_images/chinfire/${imageDate}/${minImageTime}/FY3D_MERSI_GBAL_L1_${imageDate}_${minImageTime}_1000M_MS_7_20_21.png`))
//
//         axios.get(txtURL).then(response => {
//             setBounds([[Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])],[Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])]])
//         })
//         return(<>
//             {bounds && imageDate? <ImageOverlay url={imageURL} bounds={bounds} /> : null}
//         </>)
//     }
//     catch (err){console.log(err)}
//
//     return null
//
//
// }
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

    const [cookies,setCookie] = useCookies(['currentDay']);

    // if(cookies.currentDay !== undefined){
    //     setContext(cookies.currentDay)
    // }

    //const bounds = [[40.712216, -74.22655], [40.773941, -74.12544]]

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
                            {/*<MutableImageOverlay context={context}/>*/}
                            {/*{bounds && <ImageOverlay url={image_url} bounds={bounds}/>}*/}
                            <MutableImageOverlay />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Show border outline" checked={false}>
                        <LayerGroup>
                            {CoordsData.map((port) => (<Polyline positions={port} color={'pink'}/>))}
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