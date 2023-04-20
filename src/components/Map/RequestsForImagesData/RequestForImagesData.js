import axios from "axios";
import {URL_FOR_IMAGES} from "../../../config/config";

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

        if(context.singleDay && context.min_datetime !== undefined){
            date = context.currentDate.split('-').join('')
            min_time = new Date(context.min_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.min_datetime).toString().split(' ')[4].split(':')[1]
            max_time = new Date(context.max_datetime).toString().split(' ')[4].split(':')[0] + new Date(context.max_datetime).toString().split(' ')[4].split(':')[1]
        }

        for(let cycle_time = min_time;cycle_time <= max_time; cycle_time++){
            try{

                current_time = currentTimeToString(cycle_time)
                file = require(`../../../${URL_FOR_IMAGES.SOURCE}/${date}/${current_time}/${URL_FOR_IMAGES.IMAGE_TXT_START_NAME}${date}_${current_time}${URL_FOR_IMAGES.TXT_END_NAME}`)

                if(file){
                axios.get(file).then(response => {
                    if(response.data.length !== 0){
                        console.log('time: ',currentTimeToString(cycle_time))
                        imagesTime.push(currentTimeToString(cycle_time))
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