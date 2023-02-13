import react, {useContext, useState} from 'react';
import card from './Card.module.css'
import {Mark_render} from "../../Map/mark_render";
import {CurrentDayTransfer} from "../../Map/mark_render";
import { Context } from '../../Map/Context';

export function Card(props){
    let newDate = [];
    let result;
    const [context,setContext] = useContext(Context);

    const dayClick = () => {
        newDate = [props.year, props.month, props.day];
        result = newDate.join('-');
        setContext(result)
    }
    return<>
            <div className={card.Card} value={newDate} onClick={() => dayClick()}>
                <span>{props.day}</span>
            </div>
    </>
}