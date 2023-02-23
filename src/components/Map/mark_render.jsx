import { Marker, Popup,} from 'react-leaflet';
import React, {useContext, useEffect, useState} from 'react';
import nationalParks from '../Info/national-parks.json';
import MarkerClusterGroup from 'react-leaflet-cluster';
import clusters from './Mark_render.module.css'
import L from 'leaflet';
import {Context} from './Context'
import {PointsRequest} from "./PointsRequest/PointsRequest";
import axios from 'axios';
import loader from '../../icons/loading-loading-forever.gif'

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}
export default function Mark_render(onDateChange) {

    const [context, setContext] = useContext(Context);

    const url = 'http://192.168.56.1:8080/api/fires/points/?date=';
    const [points,setPoints] = useState([])
    const [isRender,setIsRender] = useState(false)

    useEffect( ()=>{
        setIsRender(true);
         axios
            .get(`${url}${context}`)
            .then(response => {
                setPoints(response.data.points)
                setIsRender(false)
            })
             .catch(error=>{
                 setIsRender(false)
                 console.log(error.message)
             })
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
        else if(redClusterCounter >= orangeClusterCounter && redClusterCounter >= greenClusterCounter){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_red
        }
        else if( orangeClusterCounter > redClusterCounter && orangeClusterCounter >= greenClusterCounter){
            CUSTOM_CLUSTER_STYLE = clusters.custom_marker_cluster_orange;
        }
        else if(greenClusterCounter >= orangeClusterCounter && greenClusterCounter > redClusterCounter){
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
            {isRender ? <img className={clusters.isRender} src={loader} alt={null}/> : null}
            <MarkerClusterGroup
                key={Date.now()}
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={1}
                maxClusterRadius={80}
                singleMarkerMode={false}
            >
                {points.map((nat, index) => (
                    <Marker icon={GetIcon(10,10,nat.temperature)}
                            key = {index}
                            position = {[nat.latitude,nat.longitude]}
                    >
                        <Popup closeButton={false}>
                            Координаты: {nat.latitude}, {nat.longitude}
                            <br/>
                            Температура: {nat.temperature}
                            <br/>
                        </Popup>
                    </Marker>
                ))}</MarkerClusterGroup>
        </>
    );
}