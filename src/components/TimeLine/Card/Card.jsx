import card from './Card.module.css'
import {useState} from "react";


export function Card(props){
    let currentDayArr = [];
    const [isActive, setIsActive] = useState(false);
    let currentDay;
    const dayClick = () => {
        currentDayArr = [props.year, props.month, props.day]
        currentDay = currentDayArr.join("-");
        setIsActive(current =>! current);
        console.log(isActive)
        console.log(currentDay)
    };

    return<>
            {/*<div className={isActive ? card.Card : card.CardActive} value={props.day} onClick={dayClick}>*/}
            {/*    <span>{props.day}</span>*/}
            {/*</div>*/}
        <button className={isActive ? card.Active : card.Card} value={props.day} onClick={dayClick}><span>{props.day}</span></button>
    </>
}