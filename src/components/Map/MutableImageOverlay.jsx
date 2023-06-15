import {Context} from "./Context";
import {useContext, useEffect, useState} from "react";
import {URL_FOR_IMAGES} from "../../config/config";
import {TileLayer} from "react-leaflet";
import dayjs from "dayjs";

export function MutableImageOverlay(props){
    const [context,setContext] = useContext(Context)

    const satellite = {
        Suomi_NPP : '37849',
        NOAA_20 : '43013'
}

    const [urlForImage,setUrlForImage] = useState()


    useEffect( () =>{
        let currentTime;
        let currentDate;
        let currentSatellite = props.suomiShow ? satellite.Suomi_NPP : satellite.NOAA_20

        if(context.singleDay && context.currentDate){
            currentDate = dayjs(context.currentDate).format("YYYYMMDD")
            if(dayjs(context.min_datetime).format("HHmmss") !== "000000"){
                currentTime = "B" +(dayjs(context.min_datetime).format("HH") + (dayjs(context.min_datetime).minute() + 1 < 10 ? "0" + (dayjs(context.min_datetime).minute() + 1) : dayjs(context.min_datetime).minute() + 1) + "00")
                console.log(currentTime)
                setUrlForImage(`${URL_FOR_IMAGES.IMG_DOMAIN}/${currentSatellite}/${currentDate}/${currentTime}/${props.composite}~c${props.contrast}~l${props.brightness}/{z}/{x}/{y}.png`)
            }
            else{
                currentTime = "D"
                setUrlForImage(`${URL_FOR_IMAGES.IMG_DOMAIN}/${currentSatellite}/${currentDate}/${currentTime}/${props.composite}~c${props.contrast}~l${props.brightness}/{z}/{x}/{y}.png`)
            }
        }
        // console.log('curTime: ',currentTime)

    },[context,props.composite,props.noaaShow,props.suomiShow,props.contrast,props.brightness])


    return(<>
        {props.suomiShow && context.singleDay && urlForImage && <TileLayer
            url={urlForImage}
        />}
        {props.noaaShow && context.singleDay && urlForImage && <TileLayer
            url={urlForImage}
        />}
    </>)
}