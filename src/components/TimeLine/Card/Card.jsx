import react, {useContext, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';
import {useCookies} from 'react-cookie';

export function Card(props){

    const [context, setContext] = useContext(Context);

    let newDate = [];
    let result;

    let cardDate = [props.year, props.month, props.day].join("-");

    const [cookies,setCookie] = useCookies(['currentDay']);

    setContext(cookies.currentDay)

    const dayClick = () => {
        newDate = [props.year, props.month, props.day]
        result = newDate.join("-");

        setCookie('currentDay',result, {path: '/',maxAge: 5 * 3600})
        setContext(result);

    };

    return<>
        {}
        <button className={cardDate === context ? card.Active : card.Card} value={cardDate} onClick={dayClick}><span>{props.day}</span></button>
    </>
}