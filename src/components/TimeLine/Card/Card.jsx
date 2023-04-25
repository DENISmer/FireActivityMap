import react, {useContext, useEffect, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';
import {RequestForImagesData} from "../../Map/RequestsForImagesData/RequestForImagesData";

export function Card(props){

    const [context, setContext] = useContext(Context);
    const [isActive,setIsActive] = useState({active: false, day: null})
    let newDate = [];
    let result;
    let CARD_DATE_AS_DATE = Date.parse([props.year, props.month, props.day].join("-"));
    let card_day = props.day.toString();

    if(props.day < 10 && props.month < 10){
        newDate = [props.year, '0' + props.month, '0' + props.day]
    }
    else if(props.month < 10){
        newDate = [props.year, '0' + props.month, props.day]
    }
    else{
        newDate = [props.year, props.month, props.day]
    }
    CARD_DATE_AS_DATE = Date.parse(newDate.join('-'))


    const dayClick = () => {
        result = newDate.join("-");

        setContext({
            singleDay: true,
            week: false,
            today: false,
            last_24_hours: false,
            daysInRange: false,
            currentDate: result,
            min_date:'',
            max_date:'',
            min_datetime: Date.parse(result + 'T00:00:00'),
            max_datetime: Date.parse(result + 'T23:59:59')
        })
        try {
            //props.updateTime(RequestForImagesData(context))
        }
        catch (e){
            console.log(e.message)
        }

    };

    return<>
        {}
        <button className={((CARD_DATE_AS_DATE >= Date.parse(context.min_date)) && (CARD_DATE_AS_DATE <= Date.parse(context.max_date))) || Date.parse(context.currentDate) === CARD_DATE_AS_DATE ? card.Active : card.Card} value={card_day} onClick={() =>dayClick()}><span>{props.day}</span></button>
    </>
}