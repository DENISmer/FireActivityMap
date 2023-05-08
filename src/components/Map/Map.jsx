import L from 'leaflet';
import {
    LayersControl,
    MapContainer,
    ScaleControl,
    TileLayer,
    ZoomControl,
    Polyline, Marker
} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './Map.css';
import React from "react";
import {MainNavBar} from "../MainNavBar/MainNavBar";
import {Header} from "../Header/Header";
import {MouseCoordinates} from "../Info/Coordinates";
import {useState, createContext, useMemo} from "react";
import {TimeLine} from "../TimeLine/TimeLine";
import {Ruler} from './Ruler/Ruler.jsx'
import { Context } from "./Context";
import {useCookies} from "react-cookie";
import {MutableImageOverlay} from "./MutableImageOverlay";
import {MarkersLayer} from "./MarkersLayer/markersLayer";
import axios from "axios";
import {URL_FOR_MARKS} from "../../config/config";
import {CounrtyBorders} from "./layers/countryBorders";
import {NatureReserves} from "./layers/NatureReservesBorders";
import {SettLements} from "./layers/localities";
import {ModalReportPDF} from "../MainNavBar/reportModal/ModalPDF";
import {ModalReportSHP} from "../MainNavBar/reportModal/ModalSHP";
import {disableMapDragging,enableMapDragging} from "./MapEvents/MapEvents";


const MyContext = createContext("Without provider");

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

//const MemoizedChildComponentMark_render = React.memo(Mark_render);
//const MemoizedChildComponentTimeline = React.memo(TimeLine);

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
        {name: 'Точки возгорания', type: 'markersOverlay', url: null},
        {name: 'Границы регионов', type: 'regionBorders', url: MutableImageOverlay},
        {name: 'Заповедники', type: 'natureReserves', url: null},
        {name: 'Населённые пункты', type: 'settLement', url: null},
        {name: 'FY-3D 250M', type: 'imageOverlayFY3D250', url: null},
        {name: 'FY-3D 1000M', type: 'imageOverlayFY3D1000', url: null}
    ]
    const [SHPModalActive, setSHPModalActive] = useState(false)
    const [PDFModalActive, setPDFModalActive] = useState(false)
    const [baseLayer,setBaseLayer] = useState(layersDict[0].url);
    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [showMarkers,setShowMarkers] = useState(false);
    const [showBorders,setShowBorders] = useState(false);
    const [showNatureReserves, setShowNatureReserves] = useState(false);
    const [showFy3d250ImageOverlay,setShowFy3d250ImageOverlay] = useState(false);
    const [showFy3d1000ImageOverlay, setShowFy3d1000ImageOverlay] = useState(false);
    const MemoizedTimeline = useMemo(()=> TimeLine,[context]);
    const [infoAboutMarks, setInfoAboutMarks] = useState();
    const [settLementShow, setSettLementShow] = useState();

    //const MemoizedMutableImageOverlay = useMemo(()=> MutableImageOverlay,[context])
    const MemoizedChildComponentMark_render = useMemo(() => MarkersLayer, [context])

    const requestForInfoWhenMapIsReady = () => {//запрос дней на наличие точек
        axios.get(URL_FOR_MARKS.URL_GET_INFO).then(async response =>{
            await setInfoAboutMarks(response.data.date)
            }
        )
    }

    const modalSHP = () =>{
        setSHPModalActive(true)
    }

    const modalPDF = () =>{
        setPDFModalActive(true)
    }

    const settLement = () =>{
        setSettLementShow(!settLementShow)
    }
    //показ~скрытие слоев
    const borders = () => {
        setShowBorders(!showBorders)
    }
    const fy3d1000ImageOverlay = () =>{
        //setShowImageOverlay(true);
        setShowFy3d1000ImageOverlay(!showFy3d1000ImageOverlay)
        setShowFy3d250ImageOverlay(false)
    }
    const fy3d250ImageOverlay = () =>{
        //setShowImageOverlay(true);
        setShowFy3d1000ImageOverlay(false)
        setShowFy3d250ImageOverlay(!showFy3d250ImageOverlay);
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

    return <div onMouseUp={() => enableMapDragging(map)}>
        <MapContainer zoomControl={false} maxZoom={16} zoom={4} minZoom={2}
                      center={center}
                      ref={setMap}
                      whenReady={requestForInfoWhenMapIsReady}
                      doubleClickZoom={false}
                      maxBounds={[[-110,-170],[100,200]]}
        >

            <ZoomControl position={'bottomleft'}/>
            <ScaleControl position={"bottomleft"} />
            <Ruler />

            <Header />
            <SettLements/>



            <MouseCoordinates />

            <Context.Provider value={[context, setContext]}>

                <ModalReportPDF active={PDFModalActive} setActive={setPDFModalActive}/>
                <ModalReportSHP active={SHPModalActive} setActive={setSHPModalActive}/>

                <MainNavBar map={map}
                            layers={layersDict}
                            layersChange={changeLayer}
                            layersValue={baseLayer}
                            bordersValue={showBorders}
                            natureReservesValue = {showNatureReserves}
                            markersValue={showMarkers}

                            SHPmodalValue = {SHPModalActive}
                            PDFmodalValue = {PDFModalActive}
                            modalPDF={modalPDF}
                            modalSHP={modalSHP}

                            settLementValue={settLementShow}
                            settLementShow={settLement}

                            fy3d250Value={showFy3d250ImageOverlay}
                            fy3d250Show={fy3d250ImageOverlay}

                            fy3d1000Value={showFy3d1000ImageOverlay}
                            fy3d1000Show={fy3d1000ImageOverlay}

                            imageValue={showImageOverlay}
                            imageOverlayShow={imageOverlay}
                            NatureReservesShow={natureReserves}
                            markersShow={markers}
                            bordersShow={borders}
                />
                <MemoizedTimeline info={infoAboutMarks}/>
                <TileLayer url={baseLayer}/>

                {showFy3d1000ImageOverlay && <MutableImageOverlay  fy3d1000Settings={showFy3d1000ImageOverlay}/>}
                {showFy3d250ImageOverlay && <MutableImageOverlay  fy3d250Settings={showFy3d250ImageOverlay}/>}
                {showBorders && <CounrtyBorders/>}
                {showNatureReserves && <NatureReserves/>}
                {showMarkers && <MemoizedChildComponentMark_render />}

            </Context.Provider>
        </MapContainer>
    </div>
    }