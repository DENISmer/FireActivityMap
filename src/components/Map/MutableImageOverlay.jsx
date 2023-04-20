import {Context} from "./Context";
import {createContext, useContext, useEffect, useState} from "react";
import {ImageOverlay} from "react-leaflet/ImageOverlay";
import axios from "axios";
import L from 'leaflet'
import {URL_FOR_IMAGES} from "../../config/config";

export function MutableImageOverlay(){
    const [context,setContext] = useContext(Context)
    let file;
    let min_time;
    let max_time;
    const [imgTxt,setImgTxt] = useState([])
    let localdataArray = [];
    let img;

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

    const request = async (date,min_time,max_time) =>{
        console.log(date,min_time,max_time)
        let current_time;
            for(let cycle_time = Number(min_time);cycle_time <= Number(max_time); cycle_time++){
                try{
                current_time = currentTimeToString(cycle_time)
                    console.log(`../../${URL_FOR_IMAGES.SOURCE}/${date}/${current_time}/${URL_FOR_IMAGES.IMAGE_TXT_START_NAME}${date}_${current_time}${URL_FOR_IMAGES.IMAGE_FY_3D_0250M_END_NAME}`)
                file = require(`../../${URL_FOR_IMAGES.SOURCE}/${date}/${current_time}/${URL_FOR_IMAGES.IMAGE_TXT_START_NAME}${date}_${current_time}${URL_FOR_IMAGES.TXT_END_NAME}`)

                await axios.get(file).then(response => {
                    console.log(date)
                    if(response.data.length !== 0){
                        console.log('time: ',current_time)
                        localdataArray.push({img: require(`../../${URL_FOR_IMAGES.SOURCE}/${date}/${current_time}/${URL_FOR_IMAGES.IMAGE_TXT_START_NAME}${date}_${current_time}${URL_FOR_IMAGES.IMAGE_FY_3D_0250M_END_NAME}`),txt: L.latLngBounds(L.latLng(Number(response.data.split('\n')[0]),Number(response.data.split('\n')[1])),L.latLng(Number(response.data.split('\n')[2]),Number(response.data.split('\n')[3])))})
                    }
                    else {

                    }
                })
                console.log(imgTxt)
            }
            catch (e){
                    //console.log(e.message)
                continue
                }
            }
            await setImgTxt(localdataArray)


    }


    useEffect( () =>{
        if(context.singleDay && context.min_datetime !== undefined && !context.today){
            img = context.currentDate.split('-').join('')
            console.log(min_time)
            min_time = new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1]
            max_time = new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1]

            request(img,min_time,max_time)
        }
        console.log(imgTxt)
        setImgTxt([])
        localdataArray = [];

    },[context])
    return(<>
        {()=> console.log(imgTxt.length)}
        {context.singleDay && imgTxt && imgTxt.map((image,index)=> (
            <ImageOverlay
                // updateWhenZooming={false}
                // updateWhenIdle={true}
                //preferCanvas={true}
                url={image.img}
                bounds={image.txt}
                key={index}/>
            )
        )}

    </>)
}