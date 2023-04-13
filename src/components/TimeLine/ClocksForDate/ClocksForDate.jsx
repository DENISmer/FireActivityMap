import react, {useState} from 'react'
import TimeField from "react-simple-timefield";
import Timeline from  "../TimeLine.module.css";

export function ClocksForDate(props){

    const [min_time, setMin_Time] = useState('00:00:00');
    const [max_time, setMax_Time] = useState('23:59:59');


    return(<>
        <div className={Timeline.date_time_div}>
            <div className={Timeline.date_time_min_div}>
                <b className={Timeline.date_time_label}>Укажите начальное время: </b>
                <TimeField showSeconds={true}
                           onChange={(event, value) =>{setMin_Time(value)}}
                />
            </div>
            <div className={Timeline.date_time_max_div}>
                <b className={Timeline.date_time_label}>Укажите конечное время: </b>
                <TimeField value={max_time} showSeconds={true}
                           onChange={(event, value) =>{setMax_Time(value)}}
                />
            </div>
            <div>
                <button className={Timeline.save_time} onClick={() => props.updateTime(min_time,max_time)}>Сохранить</button>
                <button className={Timeline.reset_time} onClick={(event) => {props.resetTime(); setMax_Time('23:59:59'); setMin_Time('00:00:00')}}>Сбросить</button>
            </div>
        </div>
        </>
    )
}