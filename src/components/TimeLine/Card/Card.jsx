import react from 'react';
import card from './Card.module.css'

export function Card(props){


    return<>
            <div className={card.Card} key={props.key}>
                {props.day}
            </div>
    </>
}