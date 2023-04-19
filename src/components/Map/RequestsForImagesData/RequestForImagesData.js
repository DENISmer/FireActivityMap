import {useContext, useEffect, useState} from "react";
import {Context} from "../Context";
import axios from "axios";
import L from "leaflet";
import {ImageOverlay} from "react-leaflet/ImageOverlay";
//import {image} from '../../../data/map_images/chinfire/20220515/0705/'
export function RequestForImagesData(context){
    let file;
    let min_time;
    let max_time;
    let date;
    let imagesTime = []

    const currentTimeToString = (current_time) =>{
        if(current_time < 10) {
            return '000' + current_time.toString();
        }else if(current_time < 100){
            return '00' + current_time.toString();
        }else if(current_time < 1000){
            return '0' + current_time.toString();
        }
        else return current_time.toString();
    }

        let current_time;

        if(context.singleDay){
            date = context.currentDate.split('-').join('')
            min_time = new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1]
            max_time = new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1]
        }

        for(let cycle_time = min_time;cycle_time <= max_time; cycle_time++){
            try{

                current_time = currentTimeToString(cycle_time)
                file = require(`../../../data/map_images/chinfire/${date}/${current_time}/FY3D_MERSI_GBAL_L1_${date}_${current_time}_1000M_MS.txt`)

                if(file){
                axios.get(file).then(response => {
                    if(response.data.length !== 0){
                        console.log('time: ',currentTimeToString(cycle_time))
                        imagesTime.push(currentTimeToString(cycle_time))
                        //localDataArray.push({img: require(`../../../data/map_images/chinfire/20220515/${current_time}/FY3D_MERSI_GBAL_L1_20220515_${current_time}_0250M_MS_smoke_250M.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
                        //console.log(localDataArray)
                        if(Number(current_time) === 1000){
                            console.log('data= ', response.data)
                        }
                    }
                })
                }
            }
            catch (e){
                //console.log(e.message)
                //continue
            }
        }
    return imagesTime;
}