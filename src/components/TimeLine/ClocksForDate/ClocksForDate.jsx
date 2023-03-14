import react from 'react'
import ClocksForDateStyle from './ClocksForDate.module.css'
import {LocalizationProvider, StaticTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export function ClocksForDate(props){
    const handle = (value) =>{
        props.updateShow(false)
        h = false
    }

    let h = props.show

    return(<>{props.show &&
            <div className={ClocksForDateStyle}>
                <h1 onClick={handle}>qwerty</h1>
            </div>
        }

        </>
    )
}