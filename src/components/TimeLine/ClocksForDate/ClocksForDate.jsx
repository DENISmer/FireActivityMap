import react, {useContext, useEffect, useState} from 'react'
import TimeField from "react-simple-timefield";
import Timeline from  "../TimeLine.module.css";
import Slider from "@mui/material/Slider";
import React from "react";
import {Context} from "../../Map/Context";
import {RequestForImagesData} from "../../Map/RequestsForImagesData/RequestForImagesData";

export function ClocksForDate(props){
    const [context,setContext] = useContext(Context)
    let localFormattingArray = [];
    const [timeRange,setTimeRange] = useState([]);


    const timeValue = (e, val)=>{
        //console.warn(timeRange)
        let currentTime = timeSlider.find((element) => element.value === val).label.split('')
        let minTime = currentTime[0] + currentTime[1] + ':' + currentTime[2] + currentTime[3] + ':00';

        let datetime_as_date = Date.parse(context.currentDate + 'T' + minTime);
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
        updateTime(RequestForImagesData(context))

    },[context])

    const updateTime = (timeArray) =>{
        setTimeRange(timeArray)
        for(let i = 0;i < timeRange.length;i++){
            localFormattingArray.push({value: i*9, label: timeRange[i]})
            console.log(timeArray[i])
        }
        setTimeSlider(localFormattingArray)
    }

    return(<>
            <div className={Timeline.divSlider}>
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