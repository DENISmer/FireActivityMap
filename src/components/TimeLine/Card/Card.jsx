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
    let cardDate = [props.year, props.month, props.day].join("-");
    let c = 0;
    let card_day = props.day.toString();
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

                resultForMax = newDateForMaxDate.join("-");
                result = newDate.join("-");

                //daysRange = [context.min_date.split('-')[2], context.max_date.split('-')[2]]

                //setIsActive({active: true, day: Number(result.split('-')[2])})
                setContext({min_date: result, max_date: 'none', id: c += 2})
                // if(context.id === 1){
                //     setContext({min_date: result,max_date:'none',id: c+=1});
                // }
                if (context.id === 2) {
                    setContext({min_date: context.min_date, max_date: resultForMax, id: c += 2})
                } else if (context.id === 4) {
                    console.log('3d state=', context.id)
                    //setIsActive({active: false, day: 10})
                }


        console.log(isActive)
        console.log(context.id)
        //(cardDate <= context.max_date && cardDate >= context.min_date && context.max_date !== 'none') || (context.min_date === cardDate && context.max_date === 'none')
        return null
    };


    return<>
        {}
        <button className={isActive.active ? card.Active : card.Card} value={card_day} onClick={dayClick} onD><span>{props.day}</span></button>
    </>
}