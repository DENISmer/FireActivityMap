import React, {useCallback, useEffect, useState} from "react";
import NavBarStyles from './MainNavBar.module.css';
import UnstyledButtonsSimple from "../buttons/materialui buttons";
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {coordsToLatLng} from "leaflet/src/layer/GeoJSON";
import {numberFormat} from "leaflet-measure/src/utils";



export function MainNavBar({map}){
    const [showNavBar, setShowNavBar] = useState(false);
    const [showFlyToForm,setshowFlyToForm] = useState(false);
    const [latitude,setLatitude] = useState();
    const [longitude,setLongitude] = useState();


    const DisplayPosition = useCallback(() => {
        console.log(latitude,typeof longitude)
        map.flyTo([latitude,longitude], 13)
    }, [map])
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
                        <button onClick={() => setshowFlyToForm(!showFlyToForm)}>onclick</button>
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
                                           onChange={(e) => {setLatitude(Number(e.target.value))}}
                                />
                                <TextField
                                    label="долгота"
                                    variant="outlined"
                                    size={"small"}
                                    type={"number"}
                                    className={NavBarStyles.input2}
                                    value={longitude}
                                    onChange={(e) => {setLongitude(Number(e.target.value))}}
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