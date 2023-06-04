import {Context} from "./Context";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import L from 'leaflet'
import {URL_FOR_IMAGES} from "../../config/config";
import {TileLayer} from "react-leaflet";
import dayjs from "dayjs";

export function MutableImageOverlay(props){
    const [context,setContext] = useContext(Context)
    let min_time;
    let max_time;

    const satellite = {
        Suomi_NPP : '37849',
        NOAA_20 : '43013'
}

    const [urlForImage,setUrlForImage] = useState()


    useEffect( () =>{
        let currentTime;
        let currentDate;
        let currentSatellite = props.fy3d250Settings ? satellite.Suomi_NPP : satellite.NOAA_20

        if(context.singleDay && context.currentDate){
            currentDate = dayjs(context.currentDate).format("YYYYMMDD")
            if(dayjs(context.min_datetime).format("HHmmss") !== "000000"){
                currentTime = "A" + dayjs(context.min_datetime).format("HHmmss")
                setUrlForImage(`${URL_FOR_IMAGES.IMG_DOMAIN}/${currentSatellite}/${currentDate}/${currentTime}/${props.composite}/{z}/{x}/{y}.png`)
            }
            else{
                currentTime = "D"
                setUrlForImage(`${URL_FOR_IMAGES.IMG_DOMAIN}/${currentSatellite}/${currentDate}/${currentTime}/${props.composite}/{z}/{x}/{y}.png`)
            }
        }
        console.log('curTime: ',currentTime)

    },[context,props.composite,props.fy3d1000Settings,props.fy3d250Settings])


    return(<>
        {props.fy3d250Settings && context.singleDay && urlForImage && <TileLayer
            url={urlForImage}
        />}
        {props.fy3d1000Settings && context.singleDay && urlForImage && <TileLayer
            url={urlForImage}
        />}
    </>)
}