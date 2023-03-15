import react, {useContext, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';
import {useCookies} from 'react-cookie';

export function Card(props){

    const [context, setContext] = useContext(Context);
    const [isActive,setIsActive] = useState({active: false, day: null})
    let newDate = [];
    let newDateForMaxDate = [];
    let resultForMax;
    let result;
    let CARD_DATE_AS_DATE = Date.parse([props.year, props.month, props.day].join("-"));
    let RESULT_DATE_AS_DATE;
    let c = 0;
    let card_day = props.day.toString();
    const min_max = {
        min: '08:00:00',
        max: '10:00:00'
    }
    //const [cookies,setCookie] = useCookies(['currentDay']);
    //setContext(cookies.currentDay)

    // if(counter === 1){
    //     setCookie('currentDay',result, {path: '/',maxAge: 5 * 3600})
    // }
    //setContext({id: 1})
    const dayClick = () => {
            if(props.day < 10 && props.month < 10){
                newDate = [props.year, '0' + props.month, '0' + props.day]
            }
            else if(props.month < 10){
                newDate = [props.year, '0' + props.month, props.day]
            }
            else{
                newDate = [props.year, props.month, props.day]
            }


                result = newDate.join("-");

                RESULT_DATE_AS_DATE = Date.parse(context.currentDate)

                setContext({
                    singleDay: true,
                    week: false,
                    today: false,
                    last_24_hours: false,
                    daysInRange: false,
                    currentDate: result,
                    min_date:'',
                    max_date:'',
                    min_time: result + 'T' + min_max.min,
                    max_time: result + 'T' + min_max.max
                })
                // if (context.id === 2) {
                //     setContext({min_date: context.min_date, max_date: resultForMax, id: c += 2})
                // } else if (context.id === 4) {
                //     console.log('3d state=', context.id)
                //     //setIsActive({active: false, day: 10})
                // }


        console.log(Date.parse(context.max_time))
        //(cardDate <= context.max_date && cardDate >= context.min_date && context.max_date !== 'none') || (context.min_date === cardDate && context.max_date === 'none')
        return null
    };


    return<>
        {}
        <button className={CARD_DATE_AS_DATE === RESULT_DATE_AS_DATE ? card.Active : card.Card} value={card_day} onClick={dayClick}><span>{props.day}</span></button>
    </>
}