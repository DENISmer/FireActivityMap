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


    //[{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]},{url:'',laLng:[]}]
    const request = (date,time) =>{
        file = require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS.txt`)
        axios.get(file).then(response => {
            console.log(response.data)
            if(response.data){
                console.log(time)
                localdataArray.push({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
                setImgTxt(localdataArray)
                //setImgTxt({img: require(`../../data/map_images/chinfire/${date}/${time}/FY3D_MERSI_GBAL_L1_${date}_${time}_1000M_MS_7_20_21.png`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
            }
        })

        console.log(imgTxt)
    }

    useEffect(()=>{
        try{
            setImageDate(context.currentDate.split('-').join(''))
            setMinTime(new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1])
            setMaxTime(new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1])
            console.log("min_time: ", min_time[1], "max_time: ",max_time);

        }
        catch (err){
            console.log(err.message)
        }

        if(context.singleDay){
            for(let time = Number(min_time);time < Number(max_time);time++){
                try{
                     if(image_date !== undefined && min_time !== undefined){

                            if(Number(min_time) < 10){
                                request(image_date,'000' + Number(min_time).toString())
                            }
                            else if(Number(min_time) < 100){
                                request(image_date,'00' + Number(min_time).toString())
                            }
                            else if(Number(min_time) < 1000){
                                request(image_date,'0' + Number(min_time).toString())
                            }

                        }
                        console.log(`localDatArray: ${time}|`,localdataArray)
                }
                catch (error){
                    console.log(error.name)
                }
            }
        }

    },[context])
    return(<>

        {context.singleDay && imgTxt.map((image,index)=> (
            <ImageOverlay url={image.img} bounds={image.txt} key={index}/>
            )
        )}

    </>)
}