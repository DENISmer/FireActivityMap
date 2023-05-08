import react, {useContext, useEffect, useState} from 'react'
import TimeField from "react-simple-timefield";
import Timeline from  "../TimeLine.module.css";
import Slider from "@mui/material/Slider";
import React from "react";
import {Context} from "../../Map/Context";
import {RequestForImagesData} from "../../Map/RequestsForImagesData/RequestForImagesData";
import {disableMapDragging,enableMapDragging} from "../../Map/MapEvents/MapEvents";

export function ClocksForDate(props){
    const [context,setContext] = useContext(Context)

    let localFormattingArray = [];

    const [timeRange,setTimeRange] = useState([]);

    let localContextCurrentDay;

    const timeValue = (e, val)=>{
        //console.warn(timeRange)
        let currentTime = timeSlider.find((element) => element.value === val).label.split('')
        let minTime = currentTime[0] + currentTime[1] + ':' + currentTime[2] + currentTime[3] + ':00';

        let datetime_as_date = Date.parse(context.currentDate + 'T' + minTime);
        console.log(datetime_as_date)
        setContext({
            singleDay: true,
            week: false,
            today: false,
            last_24_hours: false,
            daysInRange: false,
            currentDate: context.currentDate,
            min_date:'',
            max_date:'',
            min_datetime: datetime_as_date,
            max_datetime: datetime_as_date
        })

    }
    const [timeSlider, setTimeSlider] = useState([]);
    const resetTime = () =>{
        if(context.singleDay){
            let min_datetime_as_date = Date.parse(context.currentDate + 'T00:00:00');
            let max_datetime_as_date = Date.parse(context.currentDate + 'T23:59:59');

            setContext({
                singleDay: true,
                week: false,
                today: false,
                last_24_hours: false,
                daysInRange: false,
                currentDate: context.currentDate,
                min_date:'',
                max_date:'',
                min_datetime: min_datetime_as_date,
                max_datetime: max_datetime_as_date
            })
        }
        else return null
    }
    useEffect(()=>{
            try {
                RequestForImagesData(context).then(response =>{
                    for(let i = 0;i < response.length;i++){
                        localFormattingArray.push({value: i*9, label: response[i]})
                        console.log(response[i])
                    }
                    if(localFormattingArray.length >=1){
                        setTimeSlider(localFormattingArray);
                    }
                    else{
                        return null
                    }
                    }
                )
                console.log('NO ERROR')
            }
            catch (e){
                console.warn(e.message)
            }

    },[context])

    const updateTime = (timeArray) =>{
        console.log(timeArray.length)
        for(let i = 0;i < timeArray.length;i++){
            localFormattingArray.push({value: i*9, label: timeArray[i]})
            console.log(timeArray[i])
        }
        if(localFormattingArray.length >=1){
            setTimeSlider(localFormattingArray);
        }
        else{
            return null
        }

    }

    return(<>
            <div className={Timeline.divSlider} onMouseDown={() => disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>
                <button className={Timeline.val} onClick={resetTime}>Сбросить время</button>
                <Slider
                    color='primary'
                    sx={{
                        width: 700,
                        '& .MuiSlider-mark': {
                            height: 10
                        }
                    }}
                    defaultValue={10}
                    track={false}
                    onChange={timeValue}
                    step={9}
                    marks={timeSlider}
                    min={0}
                    max={175}
                />
            </div>
        </>
    )
}