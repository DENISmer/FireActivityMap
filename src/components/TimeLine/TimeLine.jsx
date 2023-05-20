import React, {react, useCallback, useContext, useEffect, useState} from 'react';
import Timeline from  "./TimeLine.module.css";
import {CSSTransition} from "react-transition-group";
import NavBarCloseIcon from "../../icons/closeButton/2x/twotone_close_black_24dp.png";
import TimeLineIcon from "../../icons/timeLineButton/2x/outline_calendar_month_black_24dp.png"
import BackArrow from "../../icons/2x/outline_arrow_back_black_24dp.png";
import ForwardArrow from "../../icons/2x/outline_arrow_forward_black_24dp.png";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {Card} from "./Card/Card";
import TextField from '@mui/material/TextField'
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ru} from 'date-fns/locale'
import {CurrentDayDisplay} from "./CurrentDayDisplay/CurrentDayDisplay";
import {Context} from "../Map/Context";
import {ClocksForDate} from "./ClocksForDate/ClocksForDate";
import {disableMapDragging,enableMapDragging} from "../Map/MapEvents/MapEvents";


export function TimeLine(props){
    const [showTimeLine, setShowTimeLine] = useState(false)
    const [value, setValue] = useState(Date.now());
    const [month,setMonth] = useState([]);
    const [context,setContext] = useContext(Context)
    const [showTimePanel, setShowTimePanel] = useState(false);
    //setCookie('currentDay','2022-5-11', {path: '/',maxAge: 5 * 3600})
    let currentMonth = [];

    const handle = () =>{
        setShowTimeLine(!showTimeLine)
        setMonth(month)

        if (showTimeLine === true){
            setShowTimePanel(false);
        }
    }

    const getMonth = (daysInMonth) =>{
        currentMonth = [];
        for(let i = 1;i <= daysInMonth;i++){
            currentMonth.push(i)
        }
        setMonth(currentMonth)
        console.log('month: ', month);
        //return month
    }

    const getDays = (year,month) => {
        return getMonth(new Date(year,month,0).getDate());
    }

    const setPrevMonthValue = () =>{//установка предыдущего месяца
        setValue(new Date(value.getFullYear(),(value.getMonth()),0))
    }
    const setNextMonthValue = () =>{//установка следующего месяца
        setValue(new Date(value.getFullYear(),(value.getMonth() + 2),0))
    }

    useEffect(()=>{
        try{
            console.log(value.getMonth() + 1)
            getDays(value.getFullYear(), value.getMonth() + 1)
        }
        catch (e){
            console.warn(e.message)
        }
    },[value])
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

                        <ClocksForDate map={props.map}/>
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
                    <div className={Timeline.Main_TimeLine} onMouseDown={() => disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>


                        <div className={Timeline.scrollDays}>
                            <ScrollMenu
                                scrollToSelected={true}
                            >
                                {showTimeLine && month.map((day, index) =>(
                                    <Card index={index + 1} day={day} info={props.info} key={index} month={value.getMonth() + 1} year={value.getFullYear()}/>
                                ))}
                            </ScrollMenu>




                        </div>

                        <div className={Timeline.datePicker}>
                            <button className={Timeline.switch_month} onClick={() =>setPrevMonthValue()}>
                            <img src={BackArrow} width={20} height={20}></img>
                        </button>
                            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    label="Год и месяц"
                                    minDate={dayjs('2012-03-01')}
                                    maxDate={Date.now()}
                                    value={value}

                                    onChange={(value) => {
                                        setValue(value)
                                        getDays(value.getFullYear(), value.getMonth() + 1)
                                    }
                                    }
                                    renderInput={(params) => <TextField size={"small"}{...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                            <button className={Timeline.switch_month} onClick={() => setNextMonthValue()}>
                            <img src={ForwardArrow} width={20} height={20}></img>
                        </button>
                        </div>
                    </div>
                </CSSTransition>
            </>
    )

}