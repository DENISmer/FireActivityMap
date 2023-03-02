import react, {useContext, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';
import {useCookies} from 'react-cookie';

export function Card(props){

    const [context, setContext] = useContext(Context);
    let newDate = [];
    let newDateForMaxDate = [];
    let resultForMax;
    let result;
    let cardDate = [props.year, props.month, props.day].join("-");
    let c = 0;
    let card_day = Number(props.day);
    let current_day;
    let daysRange = [];
    //const [cookies,setCookie] = useCookies(['currentDay']);
    //setContext(cookies.currentDay)

    // if(counter === 1){
    //     setCookie('currentDay',result, {path: '/',maxAge: 5 * 3600})
    // }
    //setContext({id: 1})
    const dayClick = () => {

            newDate = [props.year, props.month, props.day]
            newDateForMaxDate = [props.year, props.month, props.day + 1]

            card_day = props.day.toString();
            resultForMax = newDateForMaxDate.join("-");
            result = newDate.join("-");

            daysRange = [result.split('-')[2],resultForMax.split('-')[2]]

            setContext({min_date:result,max_date:'none',id: c+=1})
            if(context.id === 1){
                setContext({min_date: result,max_date:'none',id: c+=1});
            }
            else if(context.id === 2){
                setContext({min_date: context.min_date, max_date: resultForMax,id: c+=2})
            }
            else if(context.id === 3){
                console.log('3d state=', context.id)
            }

        console.log(daysRange[0] <= card_day, daysRange[1] >= card_day)
        //console.log('cardDate', cardDate)

        return null
    };


    return<>
        {}
        <button className={daysRange[0] <= card_day <= daysRange[1] ? card.Active : card.Card} value={cardDate} onClick={()=>dayClick()}><span>{props.day}</span></button>
    </>
}