import react, {useContext} from 'react'
import CurrentDateStyle from './CurrentDayDisplay.module.css'
import {Context} from "../../Map/Context";
export function CurrentDayDisplay(props){
    const [context, setContext] = useContext(Context);

    return<>
        {context.singleDay && <div className={CurrentDateStyle.currentDate}>{context.currentDate}</div>}
        {context.today && <div className={CurrentDateStyle.currentDate}>сегодня</div>}
        {context.week && <div className={CurrentDateStyle.currentDate}>неделя</div>}
        {context.last_24_hours && <div className={CurrentDateStyle.currentDate}>24 часа</div>}
        {context.daysInRange && <div className={CurrentDateStyle.currentDate}>{context.min_date}:{context.max_date}</div>}
    </>
}