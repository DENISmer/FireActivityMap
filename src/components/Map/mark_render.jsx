import {FeatureGroup, Marker, Popup, useMapEvent, useMapEvents} from "react-leaflet";
import React, {useMemo, useState} from "react";
import nationalParks from "../Info/national-parks.json";
import MarkerClusterGroup from "react-leaflet-cluster";
import clusters from './Mark_render.module.css'
import L from 'leaflet';

function GetIcon(_iconSize){
        return L.icon({
            iconUrl: require("../../icons/red_dot_marker.png"),
            iconSize: [_iconSize]
        })
}


export function Mark_render(props) {
    const onClusterHandleClick = () => {
        return (<>
            <Popup closeButton={false}>
                Info about cluster
            </Popup>
            </>
        );
    }

    const createClusterCustomIcon1 = function (cluster: MarkerCluster) {

        let CUSTOM_CLUSTER_STYLE;
        let markersInCluster = cluster.getAllChildMarkers();
        let resultCluster;
        let extraHotClusterCounter = 0, redClusterCounter = 0, orangeClusterCounter = 0, greenClusterCounter = 0;
        let childrensBrightness;

        markersInCluster.find((marker, index) =>{

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
            console.log(childrensBrightness)
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

        return resultCluster = L.divIcon({
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
                maxClusterRadius={20}
                singleMarkerMode={true}
                onClusterClick={onClusterHandleClick()}
            >
                {nationalParks.map((nat, index) =>(
                    <Marker icon={GetIcon(10,10,nat.brightness)}
                            key = {index}
                            position = {[nat.latitude,nat.longitude]}c
                            >
                        <Popup closeButton={false}>
                            Time: {nat.acq_time}
                            <br/>
                            Coordinates: {nat.latitude}, {nat.longitude}
                            <br/>
                            Brightness: {nat.brightness}
                            <br/>
                            Track: {nat.track}
                            <br/>
                            Scan: {nat.scan}
                        </Popup>
                    </Marker>
            ))}</MarkerClusterGroup>
    </>
    );
}