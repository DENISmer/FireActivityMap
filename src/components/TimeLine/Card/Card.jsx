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
    let CURRENT_DATE_AS_DATE;
    let MIN;
    let MAX;
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
        CURRENT_DATE_AS_DATE = Date.parse(context.currentDate)
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

            RESULT_DATE_AS_DATE = Date.parse(newDate.join('-'))

            if(RESULT_DATE_AS_DATE === CURRENT_DATE_AS_DATE){
                return null
            }
            else {
                setContext({
                    singleDay: true,
                    week: false,
                    today: false,
                    last_24_hours: false,
                    daysInRange: false,
                    currentDate: result,
                    min_date:'',
                    max_date:'',
                    min_datetime: Date.parse(result + 'T' + '00:00:00'),
                    max_datetime: Date.parse(result + 'T' + '23:59:59')
                })
                if(context.singleDay && RESULT_DATE_AS_DATE > Date.parse(context.currentDate) && RESULT_DATE_AS_DATE - Date.parse(context.currentDate) <= 518400000){
                    setContext({
                        singleDay: false,
                        week: false,
                        today: false,
                        last_24_hours: false,
                        daysInRange: true,
                        currentDate: '',
                        min_date: context.currentDate,
                        max_date: result,
                        min_datetime: Date.parse(result + 'T' + '00:00:00'),
                        max_datetime: Date.parse(result + 'T' + '23:59:59')
                    })
                    MIN = Date.parse(context.min_date);
                }


            }
            console.log('MIN: ', MIN,Date.parse('2022-5-1'))
            console.log(new Date(1651536000000),new Date(1651363200000))
        return null

    };


    return<>
        {CARD_DATE_AS_DATE}
        <button className={((CARD_DATE_AS_DATE >= Date.parse(context.min_date)) && (CARD_DATE_AS_DATE <= Date.parse(context.max_date))) || MIN === CARD_DATE_AS_DATE ? card.Active : card.Card} value={card_day} onClick={() =>dayClick()}><span>{props.day}</span></button>
    </>
}