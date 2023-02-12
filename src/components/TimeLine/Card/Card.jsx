import react from 'react';
import card from './Card.module.css'


export function Card(props){
    let currentDayArr = [];
    let currentDay;
    const dayClick = () => {
        currentDayArr = [props.year, props.month, props.day]
        currentDay = currentDayArr.join("-");
        console.log(currentDay)
    }
    return<>
            <div className={card.Card} value={props.day} onClick={dayClick}>
                <span>{props.day}</span>
            </div>
    </>
}