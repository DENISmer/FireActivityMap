import react, {useContext, useRef, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';
import {useCookies} from 'react-cookie';

export function Card(props){

    const [context, setContext] = useContext(Context);
    const [isActive,setIsActive] = useState({active: false, day: null})
    let newDate = [];
    let result;
    let cardDate = [props.year, props.month, props.day].join("-")
    let card_day = props.day.toString();
    let timer = useRef();
    clearTimeout(timer);

    //const [cookies,setCookie] = useCookies(['currentDay']);
    //setContext(cookies.currentDay)
    // const doubleDayClick = () =>{
    //     newDate = [props.year, props.month, props.day]
    //     result = newDate.join("-");
    //
    //     setContext({
    //         week: false,
    //         today: false,
    //         last_24_hours: false,
    //         daysInRange: true,
    //         singleDay: false,
    //         min_date: context.currentDate,
    //         max_date: result
    //     })
    //     console.log('dc: ',context.currentDate)
    //     console.log('double click')
    // }
    const dayClick = event => {
            newDate = [props.year, props.month, props.day]
            result = newDate.join("-");

            setContext({
                currentDate: result,
                singleDay: true,
                week: false,
                today: false,
                last_24_hours: false,
                daysInRange: false
            })
            console.log(context)


        //(cardDate <= context.max_date && cardDate >= context.min_date && context.max_date !== 'none') || (context.min_date === cardDate && context.max_date === 'none')
        return null
    };


    return<>
        {}
        <button className={cardDate === context.currentDate ? card.Active : card.Card} value={card_day} onClick={dayClick} >
            <span>{props.day}</span></button>
    </>
}