import {FeatureGroup, Marker, Popup, useMapEvent} from "react-leaflet";
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
function GetIcon1(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/marker.png"),
        iconSize: [_iconSize]
    })
}

const createClusterCustomIcon = function (cluster: MarkerCluster) {
    return L.divIcon({
        html: cluster.getChildCount(),
        className: clusters.custom_marker_cluster,
        iconSize: L.point(20, 20, true),
    })
}
    const createClusterCustomIcon1 = function (cluster: MarkerCluster) {
        return L.divIcon({
        html: cluster.getChildCount(),
        className: clusters.custom_marker_cluster1,
        iconSize: L.point(20, 20, true),
    })
}

export function Mark_render() {
    const [color,setColor] = useState(true);

    return(<>
            <MarkerClusterGroup
                iconCreateFunction={createClusterCustomIcon1}
                spiderfyDistanceMultiplier={1}
                maxClusterRadius={20}
                singleMarkerMode={true}
                >
                {nationalParks.map(nat =>(

                    <Marker icon={color ? GetIcon(10,10) : GetIcon1(10,10)}
                            key = {nat.frp}
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