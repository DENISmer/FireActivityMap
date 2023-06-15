import { Marker, Popup,} from 'react-leaflet';
import React, {useContext, useEffect, useState} from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import clusters from './Mark_render.module.css'
import L from 'leaflet';
import {Context} from './Context'
import axios from 'axios';
import loader from '../../icons/loading-loading-forever.gif'
import {useCookies} from "react-cookie";
import {URL_FOR_MARKS, URL_FOR_USER} from '../../config/config'
import {useNavigate} from "react-router-dom";
function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/fire point/favicon-32x32.png"),
        iconSize: [_iconSize],
    })
}

function convertToDms (dd, isLng) {
    let dir = dd < 0
        ? isLng ? ' з' : ' ю'
        : isLng ? ' в' : ' с';

    let absDd = Math.abs(dd);
    let deg = absDd | 0;
    let frac = absDd - deg;
    let min = (frac * 60) | 0;
    let sec = frac * 3600 - min * 60;
    // Round it to 2 decimal points.
    sec = Math.round(sec * 100) / 100;
    return deg + "°" + min + "'" + sec + '"' + dir;
}

export function Mark_render(onDateChange) {
    const [contextCookies,setContextCookie,removeContextCookie] = useCookies(['context']);
    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const navigate = useNavigate();
    const [context, setContext] = useContext(Context);
    const [localCurrentDay,setLocalCurrentDay] = useState()


    const URL_S = {
        URL_SINGLE_DAY : `${URL_FOR_MARKS.URL_SINGLE_DAY}${context.currentDate}`,
        URL_TODAY : `${URL_FOR_MARKS.URL_TODAY}`,
        URL_DAYS_RANGE : `${URL_FOR_MARKS.URL_DAYS_RANGE}${context.min_date}T00:00:00&date_max=${context.max_date}T23:59:59`,
        URL_WEEK : `${URL_FOR_MARKS.URL_WEEK}`,
        URL_LAST_24_HOURS : `${URL_FOR_MARKS.URL_LAST_24_HOURS}`,
    }

    const [points,setPoints] = useState([])
    const [isRender,setIsRender] = useState(false)
    const [serverError, setServerError] = useState(false)




    const RequestForData = (context,url) =>{
        let unmounted = false


        axios.get(`${url}`,
            {
            headers:
                {Authorization: `Bearer ${refreshTokenCookies['accessToken']}`}
            })
            .then(async response => {
                if(response.data.points.length === 0){
                    setIsRender(false)
                }

                await setPoints(response.data.points)
                //console.log(response.data.points)
                if(!unmounted){
                    setTimeout(()=>{
                        setIsRender(false)
                    },100)
                }
            })
            .catch(error=>{
                setIsRender(false)

                if(error.request.status === 403 || error.request.status === 401){
                    axios(URL_FOR_USER.URL_REFRESH,
                        {
                            method : 'POST',
                            data : {
                                refresh_token: refreshTokenCookies['refreshToken']
                            }
                        })
                        .then(async response =>{
                            await setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)

                            await axios.get(`${url}`,
                                {
                                    headers:
                                        {
                                            Authorization: `Bearer ${response.data.access}`
                                        }
                                })

                                .then(async response => {
                                    if(response.data.points.length === 0){
                                        setIsRender(false)
                                    }
                                    // console.log("Вторая попытка", error.message)
                                    await setPoints(response.data.points)
                                })
                                .catch((e) => {
                                    // console.log(e.message)
                                })
                            // console.log("Первая попытка", error.message)

                    })
                        .catch((e) => {
                            navigate('/')
                            removeRefreshTokenCookie('refreshToken')
                        })
                }
                else if(error.request.status >= 500){
                    setServerError(false)
                    setIsRender(false)
                }
                // console.log(error.status)
            })
        //removeContextCookie(['context'])
        setContextCookie('context',context,5 * 3600);
        //console.log(contextCookies.context)
        return () => {unmounted = true}
    }

    useEffect(  ()=>{
        if(context.currentDate === undefined || context.daysInRange === undefined){
            if(contextCookies.context !== undefined){
                setContext(contextCookies.context)
            }
        }
        else {
            // console.log(localCurrentDay, context.currentDate)
            setIsRender(true)
            if (context.today) {
                RequestForData(context, URL_S.URL_SINGLE_DAY)
                //console.log(context)
            } else if(localCurrentDay === context.currentDate){
                // console.log('the same day')
                setIsRender(false)
            }else if (context.singleDay) {
                RequestForData(context, URL_S.URL_SINGLE_DAY)
                // console.log('singleDay')
                setLocalCurrentDay(context.currentDate)
            } else if (context.daysInRange) {
                RequestForData(context, URL_S.URL_DAYS_RANGE)
                // console.log('daysInRange')
            } else if (context.week) {
                RequestForData(context, URL_S.URL_WEEK)
                // console.log('week')
            } else if (context.last_24_hours) {
                RequestForData(context, URL_S.URL_LAST_24_HOURS)
                // console.log('last_24_hours')
            } else {
                setIsRender(false)
            }

        }
        //localStore(points)
        //console.log('request: ', points);
    },[context]);


    const createClusterCustomIcon1 = function (cluster) {
        let CUSTOM_CLUSTER_STYLE;
        let markersInCluster = cluster.getAllChildMarkers();
        let extraHotClusterCounter = 0, redClusterCounter = 0, orangeClusterCounter = 0, greenClusterCounter = 0;
        let childrensBrightness;

        markersInCluster.find((marker, index) => {

                childrensBrightness = marker.options.children.props.children[7];
                //console.log(marker.options.children.props.children[6])
                GetIcon(5,5,childrensBrightness)
                if(childrensBrightness >= 390){
                    extraHotClusterCounter += 1;
                }
                else if(childrensBrightness <= 389 && childrensBrightness >= 320){
                    redClusterCounter += 1;
                }
                else if(childrensBrightness >= 319 && childrensBrightness <= 339){
                    orangeClusterCounter += 1;
                }
                else if(childrensBrightness < 319){
                    greenClusterCounter += 1;
                }
            }
        )
        if(extraHotClusterCounter >= 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_extra_hot;
        }
        else if(redClusterCounter >= 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_red
        }
        else if(orangeClusterCounter >= 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_orange;
        }
        else if(greenClusterCounter >= 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_green
        }
        else{
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_orange;
            // console.log(childrensBrightness)
        }
        return L.divIcon({
            //mar = cluster.getAllChildMarkers().find(marker => marker.options.brightness > 320)
            html: cluster.getChildCount(),
            className: CUSTOM_CLUSTER_STYLE,
            iconSize: L.point(45, 35, true),
        })
    }
    return(<>
            {serverError && <div className={clusters.isRender}></div>}
            {isRender && <div className={clusters.isRender}><img src={loader}/></div>}
            <MarkerClusterGroup
                key={Date.now()}
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={3}
                zoomToBoundsOnClick={true}
                disableClusteringAtZoom={11}
                maxClusterRadius={95}
                singleMarkerMode={false}
                animated={false}
            >
                {context.singleDay && points.length!== 0 && points.map((nat, index) => (
                    (context.min_datetime <= Date.parse(nat.datetime) && Date.parse(nat.datetime) <= context.max_datetime) &&
                    <Marker icon={GetIcon(20, 20, nat.temperature)}
                            key={index}
                            position={L.latLng(nat.latitude,nat.longitude)}
                    >
                        <Popup closeButton={false} key={index}>
                            Широта: {convertToDms(nat.latitude, false) + ".ш"}
                            <br/>
                            Долгота: {convertToDms(nat.longitude, true) + ".д"}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}

                        </Popup>
                    </Marker>
                ))}
                {context.last_24_hours && points.length!== 0 && points.map((nat, index) => (
                    <Marker icon={GetIcon(20, 20, nat.temperature)}
                            key={index}
                            position={L.latLng(nat.latitude,nat.longitude)}
                    >
                        <Popup closeButton={false} key={index}>
                            Широта: {convertToDms(nat.latitude, false) + ".ш"}
                            <br/>
                            Долгота: {convertToDms(nat.longitude, true) + ".д"}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}

                        </Popup>
                    </Marker>
                ))}
                {context.today && points.length!== 0 && points.map((nat, index) => (
                    <Marker icon={GetIcon(20, 20, nat.temperature)}
                            key={index}
                            position={L.latLng(nat.latitude,nat.longitude)}
                    >
                        <Popup closeButton={false} key={index}>
                            Широта: {convertToDms(nat.latitude, false) + ".ш"}
                            <br/>
                            Долгота: {convertToDms(nat.longitude, true) + ".д"}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}

                        </Popup>
                    </Marker>
                ))}
                {context.week && points.length!== 0 && points.map((nat, index) => (
                    <Marker icon={GetIcon(20, 20, nat.temperature)}
                            key={index}
                            position={L.latLng(nat.latitude,nat.longitude)}
                    >
                        <Popup closeButton={false} key={index}>
                            Широта: {convertToDms(nat.latitude, false) + ".ш"}
                            <br/>
                            Долгота: {convertToDms(nat.longitude, true) + ".д"}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}

                        </Popup>
                    </Marker>
                ))}
                {context.daysInRange && points.length!== 0 && points.map((nat, index) => (
                    <Marker icon={GetIcon(10, 10, nat.temperature)}
                            key={index}
                            position={new L.LatLng(nat.latitude, nat.longitude)}
                            updateWhenZooming={false}
                            updateWhenIdle={true}
                    >
                        <Popup closeButton={false} key={index}>
                            Широта: {convertToDms(nat.latitude, false) + ".ш"}
                            <br/>
                            Долгота: {convertToDms(nat.longitude, true) + ".д"}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </>
    );
}