import {Context} from "./Context";
import {createContext, useContext, useEffect, useState} from "react";
import {ImageOverlay} from "react-leaflet/ImageOverlay";
import axios from "axios";
import {latLngBounds, LatLngBounds} from "leaflet/src/geo";
import L from 'leaflet'
import {isString} from "lodash";
import {error} from "autoprefixer/lib/utils";
export function MutableImageOverlay(){
    const [context,setContext] = useContext(Context)
    //let bounds = [[55.833,103.909],[33.865, 144.393]];
    const [image_url,setImageUrl] = useState();
    const [image_date,setImageDate] = useState();
    let file;
    const [min_time,setMinTime] = useState();
    const [max_time,setMaxTime] = useState()
    const [imgTxt,setImgTxt] = useState([])
    let contextImageDate;
    let localdataArray = [];
    let min_time_for_images;
    let min_time_array;
    let min_time_array_new = [];

    //[{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]}]
    const request = (date,time) =>{
        file = require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS.txt`)
        axios.get(file).then(response => {
            console.log(response.data)
            if(response.data.length !== 0){
                console.log('time: ',time)
                localdataArray.push({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
                setImgTxt(localdataArray)
                //setImgTxt({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
            }
            else {
                setImgTxt([])
            }
        })

        console.log(imgTxt)
    }


    useEffect(()=>{
        try{
            setImageDate(context.currentDate.split('-').join(''))
            setMinTime(new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1])
            setMaxTime(new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1])
            //min_time_array = min_time.split('');
            console.log("min_time: ", Number(min_time[3]), "max_time: ",max_time);

        }
        catch (err){
            console.log(err.message)
        }
        if(context.singleDay){
            for(let time = 0;time < 2359;time++){
                try{
                     if(image_date !== undefined && min_time !== undefined){

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
                        console.log(`localDatArray: ${time}|`,localdataArray)
                }
                catch (error){
                    console.log(error.message)
                }
            }
        }

    },[context])
    return(<>

        {context.singleDay && context.currentDate.split('-').join('') === image_date && imgTxt.map((image,index)=> (
            <ImageOverlay url={image.img} bounds={image.txt} key={index}/>
            )
        )}

    </>)
}