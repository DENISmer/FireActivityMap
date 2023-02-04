import react, {useState} from 'react'
import {Marker, Popup, useMapEvent} from "react-leaflet";
import React from "react";
import nationalParks from "../Info/national-parks.json";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import {Tooltip} from "@mui/material";

function GetIcon(_iconSize){
    return L.icon({
        iconUrl: require("../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}

export function Mark_render() {

    return(<>
            <MarkerClusterGroup
                //onClick={(e) => (<Popup> text here<Popup/>)}
                spiderfyDistanceMultiplier={1}
                maxClusterRadius={20}
                singleMarkerMode={true}
                >
                {nationalParks.map(nat =>(
                    <Marker icon={GetIcon(10,10)}
                            key = {nat.frp}
                            position = {[nat.latitude,nat.longitude]}>
                        <Popup tittle={nat.acq_time}>
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