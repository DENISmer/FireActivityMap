import React, {react, useState} from 'react';
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


export function TimeLine(){
    const [showTimeLine, setShowTimeLine] = useState(false)
    const [value, setValue] = React.useState(dayjs(Date.now()));
    const [month,setMonth] = useState([]);
    let currentMonth = [];

    const handle = () =>{
        setShowTimeLine(!showTimeLine)
        setMonth(month)
    }

    const getMonth = (daysInMonth) =>{
        currentMonth = [];
        for(let i = 1;i <= daysInMonth;i++){
            currentMonth.push(i)
        }
        setMonth(currentMonth)
        return month
    }

    const getDays = (year,month) =>{
        return getMonth(new Date(year,month,0).getDate())
    }

    return(
            <>
                <button  className={Timeline.TimeLine_button} onClick={handle}>
                    {showTimeLine ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={TimeLineIcon} width={32} height={35}/>}
                </button>

                <CSSTransition in={!showTimeLine} timeout={300} classNames={{
                    enterActive: Timeline.transition_enter,
                    enterDone: Timeline.transition_enter_active,
                    exitActive: Timeline.transition_exit_active,
                    exitDone: Timeline.transition_exit
                }} unmountOnExit>

                    <CurrentDayDisplay />

                </CSSTransition>

                <CSSTransition in={showTimeLine} timeout={300} classNames={{
                    enterActive: Timeline.transition_enter,
                    enterDone: Timeline.transition_enter_active,
                    exitActive: Timeline.transition_exit_active,
                    exitDone: Timeline.transition_exit
                }} unmountOnExit>
                    <div className={Timeline.Main_TimeLine}>
                        <div className={Timeline.scrollDays}>
                            <ScrollMenu
                                scrollToSelected={true}
                            >
                                {showTimeLine && month.map((day, index) =>(
                                    <Card day={day} key={index} month={value.month() + 1} year={value.year()} />
                                ))}
                            </ScrollMenu>
                        </div>
                        <div className={Timeline.datePicker}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year', 'month']}
                                    label="Год и месяц"
                                    minDate={dayjs('2012-03-01')}
                                    maxDate={dayjs('2024-06-01')}
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

