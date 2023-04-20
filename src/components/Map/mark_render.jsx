import {LayerGroup, Marker, Popup,} from 'react-leaflet';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import nationalParks from '../Info/national-parks.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import clusters from './Mark_render.module.css'
import L from 'leaflet';
import {Context} from './Context'
import {PointsRequest} from "./PointsRequest/PointsRequest";
import axios from 'axios';
import loader from '../../icons/loading-loading-forever.gif'
import gsap from 'gsap';
import {useCookies} from "react-cookie";
import {RequestForImagesData} from "./RequestsForImagesData/RequestForImagesData";
import {URL_FOR_MARKS} from '../../config/config'
function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}
export function Mark_render(onDateChange) {
    const [contextCookies,setContextCookie,removeContextCookie] = useCookies(['context']);
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

    // if(cookies.currentDay){
    //     setContext(cookies.currentDay)
    // }
    // else {
    //     setCookie('2022-15-05')
    // }
    const RequestForData = (context,url) =>{
        let unmounted = false
        //localStorage.clear();
        console.log(url)
        axios.get(`${url}`)
            .then(async response => {
                if(response.data.points.length === 0){
                    setIsRender(false)
                }
                //console.log('request: ', response.data.points);
                await setPoints(response.data.points)
                //await localStorage.setItem('points',JSON.stringify(response.data.points))
                if(!unmounted){
                    setTimeout(()=>{
                        setIsRender(false)
                    },100)
                }
            })
            .catch(error=>{
                setIsRender(false)
                if(error.request.status === 400){
                }
                else if(error.request.status >= 500){
                    setServerError(false)
                    setIsRender(false)
                }
                console.log(error.status)
            })
        //removeContextCookie(['context'])
        setContextCookie('context',context,5 * 10);
        //console.log(contextCookies.context)
        return () => {unmounted = true}
    }

    const localStore = async (points) =>{
        //console.log('localStore works')
        await setPoints(JSON.parse(localStorage.getItem('points')))
    }
    useEffect(  ()=>{
        if(context.currentDate === undefined || context.daysInRange === undefined){
            if(contextCookies.context !== undefined){
                setContext(contextCookies.context)
                //setPoints(JSON.parse(localStorage.getItem('points')))
                // console.log('context is empty')
                // console.log(context)
            }
        }
        else {
            console.log(localCurrentDay, context.currentDate)
            setIsRender(true)
            if (context.today) {
                RequestForData(context, URL_S.URL_TODAY)
                console.log('today')
            } else if(localCurrentDay === context.currentDate){
                console.log('the same day')
                setIsRender(false)
            }else if (context.singleDay) {
                RequestForData(context, URL_S.URL_SINGLE_DAY)
                console.log('singleDay')
                setLocalCurrentDay(context.currentDate)
            } else if (context.daysInRange) {
                RequestForData(context, URL_S.URL_DAYS_RANGE)
                console.log('daysInRange')
            } else if (context.week) {
                RequestForData(context, URL_S.URL_WEEK)
                console.log('week')
            } else if (context.last_24_hours) {
                RequestForData(context, URL_S.URL_LAST_24_HOURS)
                console.log('last_24_hours')
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

                childrensBrightness = marker.options.children.props.children[6];
                //console.log(marker.options.children.props.children[6])
                GetIcon(5,5,childrensBrightness)
                if(childrensBrightness >= 390){
                    extraHotClusterCounter += 1;
                }
                if(childrensBrightness >= 340){
                    redClusterCounter += 1;
                }
                else if(childrensBrightness > 320 && childrensBrightness <= 340){
                    orangeClusterCounter += 1;
                }
                else if(childrensBrightness <= 320){
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
        else if( orangeClusterCounter > 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_orange;
        }
        else if(greenClusterCounter >= 1){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_green
        }
        else{
            console.log(childrensBrightness)
        }
        return L.divIcon({
            //mar = cluster.getAllChildMarkers().find(marker => marker.options.brightness > 320)
            html: cluster.getChildCount(),
            className: CUSTOM_CLUSTER_STYLE,
            iconSize: L.point(35, 35, true),
        })
    }
    return(<>
            {serverError && <div className={clusters.isRender}></div>}
            {isRender && <div className={clusters.isRender}><img src={loader}/></div>}
            <MarkerClusterGroup
                key={Date.now()}
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={3}
                maxClusterRadius={95}
                singleMarkerMode={false}
                animated={false}
            >
                {context.singleDay && points.length!== 0 && points.map((nat, index) => (
                    (context.min_datetime <= Date.parse(nat.datetime) && Date.parse(nat.datetime) <= context.max_datetime) &&
                    <Marker icon={GetIcon(10, 10, nat.temperature)}
                            key={index}
                            position={new L.LatLng(nat.longitude,nat.latitude)}
                    >
                        <Popup closeButton={false} key={index}>
                            Координаты: {nat.latitude}, {nat.longitude}
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
                            position={new L.LatLng(nat.longitude, nat.latitude)}
                            updateWhenZooming={false}
                            updateWhenIdle={true}
                    >
                        <Popup closeButton={false} key={index}>
                            Координаты: {nat.latitude}, {nat.longitude}
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