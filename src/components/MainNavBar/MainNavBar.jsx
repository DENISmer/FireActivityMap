import React, {useCallback, useEffect, useState} from "react";
import NavBarStyles from './MainNavBar.module.css';
import UnstyledButtonsSimple from "../buttons/materialui buttons";
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";
import TextField from "@mui/material/TextField";



export function MainNavBar({map}){
    const [showNavBar, setShowNavBar] = useState(false);
    const [showFlyToForm,setshowFlyToForm] = useState(false);
    const [latitude,setLatitude] = useState(1);
    const [longitude,setLongitude] = useState(1);


    const DisplayPosition = () => {
        console.log(latitude,typeof longitude)
        map.flyTo([Number(latitude),Number(longitude)], 13)
    }
    return(
        <>
            <button  className={NavBarStyles.show_hide_NavBar} onClick={() => setShowNavBar(!showNavBar)}>
                {showNavBar ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={NavBarIcon} width={32} height={35}/>}
            </button>
            <CSSTransition in={showNavBar} timeout={300} classNames={{
                enterActive: NavBarStyles.transition_enter,
                enterDone: NavBarStyles.transition_enter_active,
                exitActive: NavBarStyles.transition_exit_active,
                exitDone: NavBarStyles.transition_exit
            }} unmountOnExit>

                <div className={NavBarStyles.navBar}>

                    <div className={NavBarStyles.navBarMainInstuments_Calendar} >
                        <button onClick={() => setshowFlyToForm(!showFlyToForm)}>К точке</button>
                        <CSSTransition in={showFlyToForm} timeout={300} classNames={{
                            enterActive: NavBarStyles.transition_enter,
                            enterDone: NavBarStyles.transition_enter_active,
                            exitActive: NavBarStyles.transition_exit_active,
                            exitDone: NavBarStyles.transition_exit
                        }} unmountOnExit>

                            <div className={NavBarStyles.wrapper}>
                                <TextField label="широта"
                                           variant="outlined"
                                           size={"small"}
                                           type={"number"}
                                           className={NavBarStyles.input1}
                                           value={latitude}
                                           onChange={(e) => {setLatitude(e.target.value)}}
                                />
                                <TextField
                                    label="долгота"
                                    variant="outlined"
                                    size={"small"}
                                    type={"number"}
                                    className={NavBarStyles.input2}
                                    value={longitude}
                                    onChange={(e) => {setLongitude(e.target.value)}}
                                />
                                <button className={NavBarStyles.fly_to_button} onClick={()=>DisplayPosition(map)}>К точке!</button>
                            </div>

                        </CSSTransition>
                    </div>

                    <div className={NavBarStyles.navBarMainInstuments}>
                        <h3>
                            <br/>
                            <UnstyledButtonsSimple />
                            <button className={NavBarStyles.navBar_button}>first</button>
                            <button className={NavBarStyles.navBar_button}>second</button>
                            <button className={NavBarStyles.navBar_button}>third</button>
                        </h3>
                    </div>

                    <div className="navBarMainInstuments">
                        <h2>доп информация</h2>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}