import react, {useContext} from 'react'
import CurrentDateStyle from './CurrentDayDisplay.module.css'
import {Context} from "../../Map/Context";
export function CurrentDayDisplay(props){
    //const [context, setContext] = useContext(Context);
    // let displayContent = context.split('-');
    // displayContent = displayContent.reverse().join(".")

    return<>
        <div className={CurrentDateStyle.currentDate}>{props.date.currentDate !== undefined ? props.date.currentDate.toString() : null}</div>
    </>
}