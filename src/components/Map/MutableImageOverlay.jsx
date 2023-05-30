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
    const [currentDate,setCurrentDate] = useState(dayjs().format("YYYYMMDD"))



    useEffect( () =>{
        setCurrentDate(dayjs(context.currentDate).format("YYYYMMDD"))
        if(context.singleDay && context.min_datetime !== undefined && !context.today){

            console.log(min_time)
            min_time = new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1]
            max_time = new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1]

            console.log(min_time,max_time)
        }

    },[context])
    return(<>
        {props.fy3d250Settings && context.singleDay && <TileLayer
            url={`https://geosib.rcpod.ru/tile/tile/zxy/${satellite.Suomi_NPP}/${currentDate}/D/~gi5t_-C220+300+.5~ri3a_+C.04.8+2_i2a_+_i1a_+/{z}/{x}/{y}.png`}
        />}
        {props.fy3d1000Settings && context.singleDay && <TileLayer
            url={`https://geosib.rcpod.ru/tile/tile/zxy/${satellite.NOAA_20}/${currentDate}/D/~gi5t_-C220+300+.5~ri3a_+C.04.8+2_i2a_+_i1a_+/{z}/{x}/{y}.png`}
        />}


    </>)
}