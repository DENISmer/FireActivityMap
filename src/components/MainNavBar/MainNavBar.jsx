import React, {useContext, useState} from "react";
import NavBarStyles from './MainNavBar.module.css';
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";
import TextField from "@mui/material/TextField";
import {Context} from "../Map/Context";
import Button from "@mui/material/Button";



export function MainNavBar({map}){
    const [showNavBar, setShowNavBar] = useState(false);
    const [showFlyToForm,setshowFlyToForm] = useState(false);
    const [latitude,setLatitude] = useState(1);
    const [longitude,setLongitude] = useState(1);
    const [context, setContext] = useContext(Context);

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
                        <button className={NavBarStyles.navBar_button} onClick={() => setshowFlyToForm(!showFlyToForm)}>Найти место</button>
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
                                           className={NavBarStyles.latitude}
                                           value={latitude}
                                           onChange={(e) => {setLatitude(e.target.value)}}
                                />
                                <TextField
                                    label="долгота"
                                    variant="outlined"
                                    size={"small"}
                                    type={"number"}
                                    className={NavBarStyles.longitude}
                                    value={longitude}
                                    onChange={(e) => {setLongitude(e.target.value)}}
                                />
                                <button className={NavBarStyles.fly_to_button} onClick={()=>DisplayPosition(map)}>Найти!</button>
                            </div>

                        </CSSTransition>

                    </div>

                    <div className={NavBarStyles.navBarMainInstuments}>
                            <Button onClick={()=>setContext({
                                today: true,singleDay: false,
                                week: false,
                                last_24_hours: false,
                                daysInRange: false,
                            })} size={"small"} variant={"contained"} title={'Точки пожаров за сегодня'}>Сегодня</Button>

                            <Button onClick={()=>setContext({
                                today: false,
                                singleDay: false,
                                week: false,
                                last_24_hours: true,
                                daysInRange: false,
                            })} size={"small"} variant={"contained"} title={'Точки пожаров за 24 часа'}>24 часа</Button>

                            <Button onClick={()=>setContext({
                                today: false,
                                singleDay: false,
                                week: true,
                                last_24_hours: false,
                                daysInRange: false,
                            })} size={"small"} variant={"contained"} title={'Точки пожаров за неделю'}>Неделя</Button>
                    </div>

                    <div className="navBarMainInstuments">
                        <h2>доп информация</h2>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}