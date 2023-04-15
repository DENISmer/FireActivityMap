import L from 'leaflet';
import {
    GeoJSON,
    LayerGroup,
    LayersControl,
    MapContainer,
    ScaleControl,
    TileLayer,
    ZoomControl,
    Polyline, FeatureGroup, AttributionControl, Polygon
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
import {useCookies} from "react-cookie";
import {MutableImageOverlay} from "./MutableImageOverlay";
import CoordsData from "./countreCoords.json";
import Nature_reserves_coords from "./Nature_reserves_data.json";
import {ImageOverlay} from "react-leaflet/ImageOverlay";

const MyContext = createContext("Without provider");

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

//const MemoizedChildComponentMark_render = React.memo(Mark_render);
const MemoizedChildComponentTimeline = React.memo(TimeLine);
const MemoizedMutableImageOverlay = React.memo(MutableImageOverlay)
const MemoizedChildComponentMark_render = React.memo(Mark_render)
export function MapComponent(){
    const [context, setContext] = useState(Context);
    const {BaseLayer} = LayersControl;
    const center = L.latLng(65.505, 106.09)
    const [map,setMap] = useState(null)

    const layersDict = [
        {name: 'Улицы', type: 'baseLayer', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'},
        {name: 'Спутник', type: 'baseLayer', url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViaW5uYXciLCJhIjoiY2xiMTFmcnZmMXBnbDNwbXA4bHFkcDdyciJ9.CxX9zdanJzvnGxgEDz7bJw'},
        {name: 'Тёмная', type: 'baseLayer', url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'},
        {name: 'ESRI', type: 'baseLayer', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'},
        {name: 'Спутниковые снимки', type: 'imageOverlay', url: MemoizedMutableImageOverlay},
        {name: 'Точки возгорания', type: 'markersOverlay', url: MemoizedChildComponentMark_render},
        {name: 'Границы регионов', type: 'regionBorders', url: MutableImageOverlay},
        {name: 'Заповедники', type: 'natureReserves', url: null}
    ]

    const [baseLayer,setBaseLayer] = useState(layersDict[0].url);
    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [showMarkers,setShowMarkers] = useState(false);
    const [showBorders,setShowBorders] = useState(false);
    const [showNatureReserves, setShowNatureReserves] = useState(false);

    const borders = () => {
        setShowBorders(!showBorders)
    }

    const natureReserves = () => {
        setShowNatureReserves(!showNatureReserves);
    }

    const markers = () => {
        setShowMarkers(!showMarkers)
    }
    const imageOverlay = () => {
        setShowImageOverlay(!showImageOverlay)
    }

    const changeLayer = (layer) =>{
        setBaseLayer(layer)
    }

    const [cookies,setCookie] = useCookies(['currentDay']);

    return <>
        <MapContainer zoomControl={false} maxZoom={18} zoom={4} minZoom={3.6}
                      center={center}
                      ref={setMap}
                      doubleClickZoom={false}
                      maxBounds={[[-110,-170],[100,200]]}
        >

            <ZoomControl position={'bottomleft'}/>
            <ScaleControl position={"bottomleft"} />
            <Ruler />

            <Header />

            <MouseCoordinates />

            <Context.Provider value={[context, setContext]}>
                <MainNavBar map={map}
                            layers={layersDict}
                            layersChange={changeLayer}
                            layersValue={baseLayer}
                            bordersValue={showBorders}
                            natureReservesValue = {showNatureReserves}
                            markersValue={showMarkers}
                            imageValue={showImageOverlay}
                            imageOverlayShow={imageOverlay}
                            NatureReservesShow={natureReserves}
                            markersShow={markers}
                            bordersShow={borders}
                />
                <MemoizedChildComponentTimeline />
                <TileLayer url={baseLayer}/>

                {showImageOverlay && <MemoizedMutableImageOverlay />}
                {showBorders && CoordsData.map((port) => (<Polyline positions={port} color={'pink'}/>))}
                {showNatureReserves && Nature_reserves_coords.map((port) => (<Polyline positions={port} color={'red'}/>))}
                {showMarkers && <MemoizedChildComponentMark_render />}

                {/*<LayersControl.>*/}
                {/*    <LayersControl.Overlay name="Точки пожаров" checked={false}>*/}
                {/*            <LayerGroup >*/}
                {/*                <MemoizedChildComponentMark_render />*/}
                {/*            </LayerGroup>*/}
                {/*    </LayersControl.Overlay>*/}

                {/*</LayersControl>*/}
            </Context.Provider>
        </MapContainer>

    </>
    }