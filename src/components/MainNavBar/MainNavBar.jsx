import React, {useContext, useState} from "react";
import NavBarStyles from './MainNavBar.module.css';
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";
import {Context} from "../Map/Context";
import Button from "@mui/material/Button";
import L from 'leaflet';
import {Checkbox, List, ListItem, Switch} from "@mui/material";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Range_days from "./MainNavBar.module.css";
import TimeField from "react-simple-timefield";
import transition from "react-element-popper/animations/transition"
import DatePicker, {DateObject} from "react-multi-date-picker";
import {value} from "lodash/seq";




export function MainNavBar(props){
    const [showNavBar, setShowNavBar] = useState(false);
    const [showFlyToForm,setshowFlyToForm] = useState(false);
    const [latitude,setLatitude] = useState(1);
    const [longitude,setLongitude] = useState(1);
    const [context, setContext] = useContext(Context);
    const [dateRange, setDateRange] = useState([new DateObject()]);



    const DisplayPosition = () => {
        console.log(latitude,typeof longitude)
        props.map.flyTo(L.latLng(Number(latitude),Number(longitude)), 13)
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
                    <div className={NavBarStyles.navBarMainInstruments}>
                        <List className={NavBarStyles.list}>
                            <b>Варианты подстилающей карты</b>
                            { props.layers.map((listItem,index)=>(listItem.type === 'baseLayer' ?
                                    <div className={NavBarStyles.style_map}>
                                        <ListItem key={index}>
                                            {listItem.name}{
                                            <Checkbox
                                                checked={listItem.name === props.layers.find(name => name.url === props.layersValue).name}
                                                edge="end"
                                                onChange={()=>props.layersChange(listItem.url)}
                                            />
                                        }
                                        </ListItem>
                                    </div>
                                    : listItem.type === 'imageOverlay' ?
                                        <div>
                                            <b>Отображение дополнительных данных</b>
                                            <ListItem key={index}>
                                                {listItem.name}{
                                                <Switch
                                                    checked={props.imageValue}
                                                    edge="end"
                                                    onChange={()=>props.imageOverlayShow()}
                                                    //inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            </ListItem>
                                        </div>
                                        : listItem.type === 'markersOverlay' ?
                                            <ListItem key={index}>
                                                {listItem.name}{
                                                <Switch
                                                    checked={props.markersValue}
                                                    edge="end"
                                                    onChange={()=>props.markersShow()}
                                                    //inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            </ListItem>
                                            : listItem.type === 'natureReserves' ?
                                                <ListItem key={index}>
                                                    {listItem.name}{
                                                    <Switch
                                                        checked={props.natureReservesValue}
                                                        edge="end"
                                                        onChange={()=>props.NatureReservesShow()}
                                                        //inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                }
                                                </ListItem> : <ListItem key={index}>
                                                    {listItem.name}{
                                                    <Switch
                                                        checked={props.bordersValue}
                                                        edge="end"
                                                        onChange={()=>props.bordersShow()}
                                                        //inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                }
                                                </ListItem>
                            ))
                            }
                        </List>
                    </div>



                    {/*<div className={NavBarStyles.navBarMainInstuments_Calendar} >*/}
                    {/*    <button className={NavBarStyles.navBar_button} onClick={() => setshowFlyToForm(!showFlyToForm)}>Найти место</button>*/}
                    {/*    <CSSTransition in={showFlyToForm} timeout={300} classNames={{*/}
                    {/*        enterActive: NavBarStyles.transition_enter,*/}
                    {/*        enterDone: NavBarStyles.transition_enter_active,*/}
                    {/*        exitActive: NavBarStyles.transition_exit_active,*/}
                    {/*        exitDone: NavBarStyles.transition_exit*/}
                    {/*    }} unmountOnExit>*/}

                    {/*        <div className={NavBarStyles.wrapper}>*/}
                    {/*            <TextField*/}
                    {/*                label="широта"*/}
                    {/*                variant="outlined"*/}
                    {/*                size={"small"}*/}
                    {/*                type={"number"}*/}
                    {/*                className={NavBarStyles.latitude}*/}
                    {/*                value={latitude}*/}
                    {/*                onChange={(e) => {setLatitude(e.target.value)}}*/}
                    {/*            />*/}
                    {/*            <TextField*/}
                    {/*                label="долгота"*/}
                    {/*                variant="outlined"*/}
                    {/*                size={"small"}*/}
                    {/*                type={"number"}*/}
                    {/*                className={NavBarStyles.longitude}*/}
                    {/*                value={longitude}*/}
                    {/*                onChange={(e) => {setLongitude(e.target.value)}}*/}
                    {/*            />*/}
                    {/*            <button className={NavBarStyles.fly_to_button} onClick={()=>DisplayPosition(props.map)}>Найти!</button>*/}
                    {/*        </div>*/}
                    {/*    </CSSTransition>*/}
                    {/*</div>*/}

                    <div className={NavBarStyles.navBarSortDate}>
                        <b className={NavBarStyles.heading_sort}>Сортировать данные за:</b>
                        <Button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: true,
                            singleDay: false,
                            week: false,
                            last_24_hours: false,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: ''
                        })} size={"small"} variant={"contained"} title={'Точки пожаров за сегодня'}>Сегодня</Button>

                        <Button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: false,
                            singleDay: false,
                            week: false,
                            last_24_hours: true,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: ''
                        })} size={"small"} variant={"contained"} title={'Точки пожаров за 24 часа'}>24 часа</Button>

                        <Button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: false,
                            singleDay: false,
                            week: true,
                            last_24_hours: false,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: ''
                        })} size={"small"} variant={"contained"} title={'Точки пожаров за неделю'}>Неделя</Button>
                    </div>


                    <div className={Range_days.navBarMainInstruments}>
                        <b>Сбор данных за несколько дней (не более 7 дней):</b>
                        <div className={Range_days.date_time_max_div}>
                            <p4 className={Range_days.date_time_label}>Укажите начальный и конечный день: </p4>
                            <DatePicker
                                range
                                value={dateRange}
                                maxDate={new DateObject()}
                                onChange={setDateRange}
                                plugins={[<DatePanel/>]}
                                rangeHover
                                animations={[
                                    transition({
                                        from: 35,
                                        transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                    }),
                                ]}
                            />
                        </div>
                        <div className={Range_days.button_time}>
                            <button className={Range_days.save_time} >Сохранить</button>
                            <button className={Range_days.reset_time}  >Сбросить</button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}