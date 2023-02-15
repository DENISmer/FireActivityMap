import react, {useContext, useState} from 'react';
import card from './Card.module.css'
import { Context } from '../../Map/Context';


export function Card(props){

    const [context, setContext] = useContext(Context);
    let newDate = [];
    const [isActive, setIsActive] = useState(false);
    let result;

    const dayClick = () => {
        newDate = [props.year, props.month, props.day]
        result = newDate.join("-");
        setContext(result);
        setIsActive(current =>! current);
        console.log(isActive)
        console.log(result)
    };

    return<>
            {/*<div className={isActive ? card.Card : card.CardActive} value={props.day} onClick={dayClick}>*/}
            {/*    <span>{props.day}</span>*/}
            {/*</div>*/}
        <button className={isActive ? card.Active : card.Card} value={newDate} onClick={() => dayClick()}><span>{props.day}</span></button>
    </>
}