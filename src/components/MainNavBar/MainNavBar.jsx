import React, {useState} from "react";
import './MainNavBar.css';
import UnstyledButtonsSimple from "../buttons/materialui buttons";
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";

export function MainNavBar(){

    const [showNavBar, setShowNavBar] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    return(
        <>
            <button  className="show_hide_NavBar" onClick={() => setShowNavBar(!showNavBar)}>
                {showNavBar ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={NavBarIcon} width={32} height={35}/>}
            </button>
            <CSSTransition in={showNavBar} timeout={300} classNames='transition' unmountOnExit>

                <div className="navBar">

                    <div className="navBarMainInstuments_Calendar">
                        <label>Now date is: </label>
                        <a className={"hover_calendar"}>{date.toDateString()}</a>
                        <br/><button className="change_date_button" onClick={() => setShowCalendar(!showCalendar)}>Изменить дату</button>

                        <CSSTransition in={showCalendar} timeout={500} classNames='transition' unmountOnExit>
                            <Calendar className="calendar" onChange={setDate} value={date}></Calendar>
                        </CSSTransition>
                    </div>

                    <div className="navBarMainInstuments">
                        <h2>
                            <UnstyledButtonsSimple />
                            <br/>
                            <UnstyledButtonsSimple />
                            <br/>
                            <UnstyledButtonsSimple />
                            <button className='navBar_button'>first</button>
                            <button className='navBar_button'>second</button>
                            <button className='navBar_button'>third</button>
                        </h2>
                    </div>

                    <div className="navBarMainInstuments">
                        <h2>доп информация</h2>
                    </div>

                </div>
            </CSSTransition>
        </>
    );
}