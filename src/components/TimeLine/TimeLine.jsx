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
import {forEach} from "react-bootstrap/ElementChildren";
import {put} from "axios";

export function TimeLine(){
    const [showTimeLine, setShowTimeLine] = useState(false)
    const [value, setValue] = React.useState(dayjs(Date.now()));

    const [month,setMonth] = useState([]);
    let currentMonth = [1,2,3,4,5,6,7,8,8,9,10];

    const getMonth = (daysInMonth) =>{
        console.log(daysInMonth)
        for(let i = 1;i <= daysInMonth;i++){
            setMonth(month.concat(i))
        }
        //setMonth(month => month+=1)
        console.log(month)
        return currentMonth
    }

    const getDays = (year,month) =>{
        return getMonth(new Date(year,month,0).getDate())
    }

    return(
            <>
                <button  className={Timeline.TimeLine_button} onClick={() => setShowTimeLine(!showTimeLine)}>
                    {showTimeLine ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={TimeLineIcon} width={32} height={35}/>}
                </button>

                <CSSTransition in={showTimeLine} timeout={300} classNames={'transition'} unmountOnExit>

                    <div className={Timeline.Main_TimeLine}>
                        <ScrollMenu
                            scrollToSelected={true}
                        >
                            {month.map((day,index) =>{
                                <Card key={index} day={day} />
                            })}
                        </ScrollMenu>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    views={['year', 'month']}
                                    label="Year and Month"
                                    minDate={dayjs('2012-03-01')}
                                    maxDate={dayjs('2024-06-01')}
                                    value={value}
                                    onChange={(value) =>
                                        getDays(value.year(), value.month() + 1)
                                    }
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                            </LocalizationProvider>
                        </div>
                    </div>
                </CSSTransition>

            </>
    )

}

