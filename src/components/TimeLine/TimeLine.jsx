import React, {react, useCallback, useContext, useEffect, useState} from 'react';
import Timeline from  "./TimeLine.module.css";
import {CSSTransition} from "react-transition-group";
import NavBarCloseIcon from "../../icons/closeButton/2x/twotone_close_black_24dp.png";
import TimeLineIcon from "../../icons/timeLineButton/2x/outline_calendar_month_black_24dp.png"
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {Card} from "./Card/Card";
import TextField from '@mui/material/TextField'
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {CurrentDayDisplay} from "./CurrentDayDisplay/CurrentDayDisplay";
import {Context} from "../Map/Context";
import {ClocksForDate} from "./ClocksForDate/ClocksForDate";
import {RequestForDataView} from "./RequestForDataView";



export function TimeLine(){
    const [showTimeLine, setShowTimeLine] = useState(false)
    const [value, setValue] = React.useState(dayjs(Date.now()));
    const [month,setMonth] = useState([]);
    const [context,setContext] = useContext(Context)
    const [showTimePanel, setShowTimePanel] = useState(false);
    let infoAboutMarks;

    //setCookie('currentDay','2022-5-11', {path: '/',maxAge: 5 * 3600})
    let currentMonth = [];

    const handle = () =>{
        setShowTimeLine(!showTimeLine)
        setMonth(month)

        if (showTimeLine === true){
            setShowTimePanel(false);
        }
    }

    const show_time_panel = () =>{
        setShowTimePanel(!showTimePanel);
    }

    const getMonth = (daysInMonth) =>{
        currentMonth = [];
        for(let i = 1;i <= daysInMonth;i++){
            currentMonth.push(i)
        }
        setMonth(currentMonth)
        console.log('month: ', value.month());
        return month
    }

    const getDays = (year,month) =>{
        return getMonth(new Date(year,month,0).getDate())
    }



    const setTime = (min_time, max_time) => {
        if(context.singleDay){
            let min_datetime_as_date = Date.parse(context.currentDate + 'T' + min_time);
            let max_datetime_as_date = Date.parse(context.currentDate + 'T' + max_time);

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
    const call = useCallback(()=>{
        return RequestForDataView()

    },[showTimeLine])

    return(
            <>
                <button  className={Timeline.TimeLine_button} onClick={()=>handle()}>
                    {showTimeLine ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={TimeLineIcon} width={32} height={35}/>}
                </button>
                {context.singleDay &&
                    <CSSTransition in={showTimeLine} timeout={300} classNames={{
                        enterActive: Timeline.transition_enter,
                        enterDone: Timeline.transition_enter_active,
                        exitActive: Timeline.transition_exit_active,
                        exitDone: Timeline.transition_exit
                    }} unmountOnExit>

                        <ClocksForDate />
                    </CSSTransition>}

                <CSSTransition in={!showTimeLine} timeout={300} classNames={{
                    enterActive: Timeline.transition_enter,
                    enterDone: Timeline.transition_enter_active,
                    exitActive: Timeline.transition_exit_active,
                    exitDone: Timeline.transition_exit
                }} unmountOnExit>

                    <CurrentDayDisplay date={context}/>
                </CSSTransition>


                <CSSTransition in={showTimeLine} timeout={300} classNames={{
                    enterActive: Timeline.transition_enter,
                    enterDone: Timeline.transition_enter_active,
                    exitActive: Timeline.transition_exit_active,
                    exitDone: Timeline.transition_exit
                }} unmountOnExit>
                    <div className={Timeline.Main_TimeLine}>

                        <button name={'scrollRollback'}>{'<='}</button>
                        <div className={Timeline.scrollDays}>
                            <ScrollMenu
                                scrollToSelected={true}
                            >
                                {showTimeLine && month.map((day, index) =>(
                                    <Card index={index + 1} day={day} key={index} info={call()} month={value.month() + 1} year={value.year()}/>
                                ))}
                            </ScrollMenu>
                        </div>
                        <button name={'scrollForward'}>=></button>
                        <div className={Timeline.datePicker}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year', 'month']}
                                    label="Год и месяц"
                                    minDate={dayjs('2012-03-01')}
                                    maxDate={Date.now()}
                                    value={value}
                                    onChange={(value) => {
                                        setValue(value)
                                        getDays(value.year(), value.month() + 1)
                                    }
                                    }
                                    renderInput={(params) => <TextField size={"small"}{...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </CSSTransition>
            </>
    )

}