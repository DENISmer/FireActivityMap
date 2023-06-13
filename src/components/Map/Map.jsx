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
import React, {useEffect} from "react";
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

import {CounrtyBorders} from "./layers/countryBorders";
import {NatureReserves} from "./layers/NatureReservesBorders";
import {Settlements} from "./layers/localities";
import {ModalReportPDF} from "../MainNavBar/reportModal/ModalPDF";
import {ModalReportSHP} from "../MainNavBar/reportModal/ModalSHP";
import {enableMapDragging} from "./MapEvents/MapEvents";

import {layersDict} from "../../config/config";
import {URL_FOR_MARKS, URL_FOR_USER} from "../../config/config";
import {imageSettings} from "../../config/config";

import { useNavigate } from "react-router-dom";
import loader from '../../icons/loading-loading-forever.gif'
import "./Map.css"

const MyContext = createContext("Without provider");


//const MemoizedChildComponentMark_render = React.memo(Mark_render);
//const MemoizedChildComponentTimeline = React.memo(TimeLine);

export function MapComponent(){
    const [context, setContext] = useState(Context);
    const {BaseLayer} = LayersControl;
    const center = L.latLng(65.505, 106.09)
    const [map,setMap] = useState(null)


    const [SHPModalActive, setSHPModalActive] = useState(false)
    const [PDFModalActive, setPDFModalActive] = useState(false)

    const [baseLayer,setBaseLayer] = useState(layersDict[0].url);
    const [compositeForImage,setCompositeForImage] = useState(imageSettings[0].composite)

    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [showMarkers,setShowMarkers] = useState(false);
    const [showBorders,setShowBorders] = useState(false);
    const [showNatureReserves, setShowNatureReserves] = useState(false);

    const [showSuomiNPPImageOverlay,setShowSuomiNPPImageOverlay] = useState(false);
    const [showNOAAImageOverlay, setShowNOAAImageOverlay] = useState(false);

    const MemoizedTimeline = useMemo(()=> TimeLine,[context]);

    const [infoAboutMarks, setInfoAboutMarks] = useState();
    const [settLementShow, setSettLementShow] = useState(false);

    const [userAuthAccess,setUserAuthAccess] = useState(false)

    const [brightnessValue,setBrightnessValue] = useState(0)
    const [contrastValue, setContrastValue] = useState(0)


    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const navigate = useNavigate();

    //const MemoizedMutableImageOverlay = useMemo(()=> MutableImageOverlay,[context])
    const MemoizedChildComponentMark_render = useMemo(() => MarkersLayer, [context])

    //const MemoizedChildComponentSettlements = useMemo(() => Settlements, [context])


    const requestForInfoWhenMapIsReady = () => {//запрос дней на наличие точек
        axios.get(URL_FOR_MARKS.URL_GET_INFO,{headers :
                {
                    Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                }
        })
            .then(async response =>{
            await setInfoAboutMarks(response.data.date)
            setUserAuthAccess(true)
            }
        )
            .catch(error=>{
                if(error.request.status === 403 || error.request.status === 401){
                    axios(URL_FOR_USER.URL_REFRESH,
                        {
                            method : 'POST',
                            data : {
                                refresh_token: refreshTokenCookies['refreshToken']
                            }
                        })
                        .then(async response => {
                            setUserAuthAccess(true)
                            setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)
                            setInfoAboutMarks(response.data.date)

                            axios.get(URL_FOR_MARKS.URL_GET_INFO,{headers :
                                    {
                                        Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                                    }
                            })
                                .then(async response =>{
                                        await setInfoAboutMarks(response.data.date)
                                        setUserAuthAccess(true)
                                    }
                                )
                        })
                        .catch((e) => {
                            setUserAuthAccess(false)
                            removeRefreshTokenCookie('refreshToken')
                            setTimeout(()=>{navigate('/')},1500)

                        })
                }
                else if(error.request.status >= 500){
                    setUserAuthAccess(false)
                    setTimeout(()=>{navigate('/')},1500)
                    // console.log(error.message)
                }
                // console.log(error.status)
            })
    }

    useEffect(()=>{
        requestForInfoWhenMapIsReady();
    },[])

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
    const NOAAImageOverlay = () =>{
        //setShowImageOverlay(true);
        setShowNOAAImageOverlay(!showNOAAImageOverlay)
        setShowSuomiNPPImageOverlay(false)
    }
    const SuomiImageOverlay = () =>{
        //setShowImageOverlay(true);
        setShowNOAAImageOverlay(false)
        setShowSuomiNPPImageOverlay(!showSuomiNPPImageOverlay);
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

    const changeLayer = (layer) => {
        setBaseLayer(layer)
    }

    const changeComposite = (composite) => {
        setCompositeForImage(composite)
    }

    const changeBrightness = (brightness) =>{
        setBrightnessValue(brightness)
    }
    const changeContrast = (contrast) =>{
        setContrastValue(contrast)
    }

    const [cookies,setCookie] = useCookies(['currentDay']);

    return <>
        {userAuthAccess ? <div onMouseUp={() => enableMapDragging(map)}>
            <MapContainer zoomControl={false} maxZoom={15} zoom={4} minZoom={3}
                          center={center}
                          ref={setMap}
                          whenReady={() => requestForInfoWhenMapIsReady()}
                          doubleClickZoom={false}
                          maxBounds={[[-110, -170], [100, 200]]}

            >

                <ZoomControl position={'bottomleft'}/>
                <ScaleControl position={"bottomleft"}/>
                <Ruler/>

                <Header map={map}/>


                <MouseCoordinates map={map}/>

                <Context.Provider value={[context, setContext]}>


                    <ModalReportPDF active={PDFModalActive} setActive={setPDFModalActive} map={map}/>

                    <ModalReportSHP active={SHPModalActive} setActive={setSHPModalActive} map={map}/>

                    <MainNavBar map={map}
                                layers={layersDict}
                                layersChange={changeLayer}
                                layersValue={baseLayer}

                                bordersValue={showBorders}
                                natureReservesValue={showNatureReserves}
                                markersValue={showMarkers}

                                SHPmodalValue={SHPModalActive}
                                PDFmodalValue={PDFModalActive}
                                modalPDF={modalPDF}
                                modalSHP={modalSHP}

                                settLementValue={settLementShow}
                                settLementShow={settLement}

                                SuomiValue={showSuomiNPPImageOverlay}
                                SuomiShow={SuomiImageOverlay}

                                NOAAValue={showNOAAImageOverlay}
                                NOAAShow={NOAAImageOverlay}

                                compositeList={imageSettings}
                                ImageComposite={compositeForImage}
                                compositeChange={changeComposite}

                                contrastChange={changeContrast}
                                contrastValue={contrastValue}

                                brightnessChange={changeBrightness}
                                brightnessValue={brightnessValue}

                                imageValue={showImageOverlay}
                                imageOverlayShow={imageOverlay}

                                NatureReservesShow={natureReserves}
                                markersShow={markers}
                                bordersShow={borders}
                    />

                    <MemoizedTimeline info={infoAboutMarks}
                                      map={map}
                                      satelliteSuomi={showSuomiNPPImageOverlay}
                                      satelliteNoaa={showNOAAImageOverlay}
                    />

                    <TileLayer url={baseLayer}/>

                    {showNOAAImageOverlay && <MutableImageOverlay noaaShow={showNOAAImageOverlay}
                                                                  composite={compositeForImage}
                                                                  contrast={contrastValue}
                                                                  brightness={brightnessValue}/>}

                    {showSuomiNPPImageOverlay && <MutableImageOverlay suomiShow={showSuomiNPPImageOverlay}
                                                                      composite={compositeForImage}
                                                                      contrast={contrastValue}
                                                                      brightness={brightnessValue}/>}

                    {showBorders && <CounrtyBorders/>}

                    {showNatureReserves && <NatureReserves/>}

                    {showMarkers && <MemoizedChildComponentMark_render isActive={showMarkers}/>}

                    {settLementShow && <Settlements map={map}/>}

                </Context.Provider>
            </MapContainer>
        </div> : <div className={'userLoadingDiv'}><img className={'userLoading'} width={100} height={100} src={loader} alt={'#'}/></div>}
    </>


    }