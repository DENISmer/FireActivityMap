import {Context} from "./Context";
import {createContext, useContext, useEffect, useState} from "react";
import {ImageOverlay} from "react-leaflet/ImageOverlay";
import axios from "axios";
import {LatLngBounds} from "leaflet/src/geo";
import L from 'leaflet'
import {isString} from "lodash";
import {error} from "autoprefixer/lib/utils";
export function MutableImageOverlay(){
    const [context,setContext] = useContext(Context)
    let bounds = [[55.833,103.909],[33.865, 144.393]];
    const [image_url,setImageUrl] = useState();
    const [image_date,setImageDate] = useState();
    let file;
    const [min_time,setMinTime] = useState();
    const [imgTxt,setImgTxt] = useState({img: '',txt: LatLngBounds})
    let contextImageDate;
    let localdataArray = [];
    //[{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]}]
    const request = (date,time) =>{
        file = require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS.txt`)
        axios.get(file).then(response => {
            console.log(response.data)
            if(response.data){
                localdataArray.push({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
                //setImgTxt({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
            }
        })
        //.catch(error=>{
        //     console.log(error.message)
        // })

        console.log(imgTxt)
    }

    useEffect(()=>{
        if(context.singleDay){
            try{
                setImageDate(context.currentDate.split('-').join(''))
                setMinTime(new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1])
                if(image_date !== undefined && min_time !== undefined){
                    for(let time = 0;time < 2359;time++){
                        if(time < 10){
                            request(image_date,'000' + time.toString())
                        }
                        else if(time < 100){
                            request(image_date,'00' + time.toString())
                        }
                        else if(time < 1000){
                            request(image_date,'0' + time.toString())
                        }

                    }
                    console.log('localDatArray: ',localdataArray)
                }
                if(bounds.length === 2){
                    setImageUrl(require(`../../data/map_images/chinfire/${image_date}/${min_time}/FY3D_MERSI_GBAL_L1_${image_date}_${min_time}_1000M_MS_7_20_21.png`).default)
                }
            }
            catch (error){
                console.log(error.name)
            }
        }
    },[context])
    return(<>

            <ImageOverlay url={imgTxt.img} bounds={imgTxt.txt} />

    </>)
}