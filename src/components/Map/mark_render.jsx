import { Marker, Popup,} from 'react-leaflet';
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
import {map} from "react-bootstrap/ElementChildren";

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}
export default function Mark_render(onDateChange) {
    const [cookies,setCookie] = useCookies(['currentDay']);
    const [context, setContext] = useContext(Context);
    const [localCurrentDay,setLocalCurrentDay] = useState()
    const URL_S = {
        URL_SINGLE_DAY : `http://192.168.56.1:8080/api/fires/points/?date=${context.currentDate}`,
        URL_TODAY : 'http://192.168.56.1:8080/api/fires/points/today/',
        URL_DAYS_RANGE : `http://192.168.56.1:8080/api/fires/points/?date_min=${context.min_date}T00:00:00&date_max=${context.max_date}T23:59:59`,
        URL_WEEK : 'http://192.168.56.1:8080/api/fires/points/week/',
        URL_LAST_24_HOURS : 'http://192.168.56.1:8080/api/fires/points/twentyfourhours/',
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
        axios.get(`${url}`)
            .then(async response => {
                if(response.data.points.length === 0){
                    setIsRender(false)
                }
                console.log('request')
                await setPoints(response.data.points)
                if(!unmounted){
                    setTimeout(()=>{
                        setIsRender(false)
                    },5000)
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
            })
        //console.log(new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1])
        setCookie('currentDay',context,5 * 3600)
        return () => {unmounted = true}
        }

    useEffect(  ()=>{
        console.log('cookie: ',cookies.currentDay)
        console.log('context: ',context.currentDate)
        // if(context.currentDate === undefined){
        //     setContext(cookies.currentDay)
        // }
        // else {
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
        // }

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
    //console.log(points)
    return(<>
        {serverError && <div className={clusters.isRender}></div>}
            {isRender && <div className={clusters.isRender}><img src={loader}/></div>}
            <MarkerClusterGroup
                key={Date.now()}
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={3}
                maxClusterRadius={90}
                singleMarkerMode={false}
            >
                {context.singleDay && points.map((nat, index) => (
                    (context.min_datetime <= Date.parse(nat.datetime) && Date.parse(nat.datetime) <= context.max_datetime) &&
                    <Marker icon={GetIcon(10, 10, nat.temperature)}
                            key={index}
                            position={[nat.latitude, nat.longitude]}
                    >
                        <Popup closeButton={false}>
                            Координаты: {nat.latitude}, {nat.longitude}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                            Время: {nat.datetime}
                        </Popup>
                    </Marker>
                ))}
                {context.daysInRange && points.map((nat, index) => (
                    <Marker icon={GetIcon(10, 10, nat.temperature)}
                            key={index}
                            position={[nat.latitude, nat.longitude]}
                    >
                        <Popup closeButton={false}>
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