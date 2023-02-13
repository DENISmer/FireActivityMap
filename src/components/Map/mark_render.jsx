import { Marker, Popup,} from "react-leaflet";
import React, {useContext, useState} from "react";
import nationalParks from "../Info/national-parks.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import clusters from './Mark_render.module.css'
import L from 'leaflet';
import {Context} from './Context'


function GetIcon(_iconSize){
        return L.icon({
            iconUrl: require("../../icons/red_dot_marker.png"),
            iconSize: [_iconSize]
        })
}
export function Mark_render(onDateChange) {
    const [context, setContext] = useContext(Context);


    const createClusterCustomIcon1 = function (cluster) {

        let CUSTOM_CLUSTER_STYLE;
        let markersInCluster = cluster.getAllChildMarkers();
        let extraHotClusterCounter = 0, redClusterCounter = 0, orangeClusterCounter = 0, greenClusterCounter = 0;
        let childrensBrightness;

        markersInCluster.find((marker, index) => {

            childrensBrightness = marker.options.children.props.children[9];
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
            <MarkerClusterGroup
                key={Date.now()}
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={1}
                maxClusterRadius={40}
                singleMarkerMode={false}
            >
                {nationalParks.map((nat, index) => (
                    nat.acq_date === context &&
                    <Marker icon={GetIcon(10,10,nat.brightness)}
                            key = {index}
                            position = {[nat.latitude,nat.longitude]}c
                            >
                        <Popup closeButton={false}>
                            Время: {nat.acq_time}
                            <br/>
                            Координаты: {nat.latitude}, {nat.longitude}
                            <br/>
                            Температура: {nat.brightness}
                            <br/>
                            Трэк: {nat.track}
                            <br/>
                            Скан: {nat.scan}
                        </Popup>
                    </Marker>
            ))}</MarkerClusterGroup>
    </>
    );
}