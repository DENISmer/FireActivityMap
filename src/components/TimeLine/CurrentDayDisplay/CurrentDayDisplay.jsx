import react, {useContext} from 'react'
import CurrentDateStyle from './CurrentDayDisplay.module.css'
import {Context} from "../../Map/Context";
export function CurrentDayDisplay(){
    const [context, setContext] = useContext(Context);
    // let displayContent = context.split('-');
    // displayContent = displayContent.reverse().join(".")

    return<>
        <div className={CurrentDateStyle.currentDate}>{' от '+context.min_date + ' до ' + context.max_date}</div>
    </>
}