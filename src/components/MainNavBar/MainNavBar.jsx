import React, {useContext, useEffect, useState} from "react";
import NavBarStyles from './MainNavBar.module.css';
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';
import 'react-calendar/dist/Calendar.css';
import {CSSTransition} from "react-transition-group";
import {Context} from "../Map/Context";
import {Checkbox, List, ListItem, Switch} from "@mui/material";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Range_days from "./MainNavBar.module.css";
import transition from "react-element-popper/animations/transition"
import DatePicker, {DateObject} from "react-multi-date-picker";
import {disableMapDragging,enableMapDragging} from '../Map/MapEvents/MapEvents'




export function MainNavBar(props){
    const [showNavBar, setShowNavBar] = useState(false);
    const [showFlyToForm,setshowFlyToForm] = useState(false);
    const [latitude,setLatitude] = useState(1);
    const [longitude,setLongitude] = useState(1);
    const [context, setContext] = useContext(Context);
    const [dateRange, setDateRange] = useState([new DateObject()]);
    const today = [new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth(),new Date(Date.now()).getDate()].join('-');

    const mouseDown = ()=> {
        if(showNavBar) {
            if (props.map) props.map.dragging.disable();
        }
        else{
            if (props.map) props.map.dragging.enable();
        }
    }
    const mouseUp = () => {
        if(props.map) props.map.dragging.enable();
    }


    const setToday = () =>{
        return [new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth(),new Date(Date.now()).getDate()].join('-');
    }
    const resetDaysInRangeIntoToday = () => {
        let today = [new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth(),new Date(Date.now()).getDate()].join('-');
        setDateRange([new DateObject()]);
        console.log(today)
          setContext({
              singleDay: false,
              week: false,
              today: true,
              last_24_hours: false,
              daysInRange: false,
              currentDate: today,
              min_date: null,
              max_date: null,
              min_datetime: Date.parse(today + 'T' + '00:00:00'),
              max_datetime: Date.parse(today + 'T' + '23:59:59')
          })
        console.log('resetDaysInRangeIntoToday')
    }
    const setValidDate = (dateRange) =>{
        let minDate = dateRange[0].year + '-' + dateRange[0].month.number + '-' + dateRange[0].day;
        let maxDate = dateRange[1].year + '-' + dateRange[1].month.number + '-' + dateRange[1].day;
        console.log(dateRange)
        setDaysInRange(minDate,maxDate)
    }
    const setDaysInRange = (minDate,maxDate) =>{
         setContext({
                    singleDay: false,
                    week: false,
                    today: false,
                    last_24_hours: false,
                    daysInRange: true,
                    currentDate: '',
                    min_date: minDate,
                    max_date: maxDate,
                    min_datetime: Date.parse('2022-05-11T00:00:00'),
                    max_datetime: Date.parse('2022-05-11T23:59:59')
                })
        console.log('firstDate: ',minDate);
        console.log('firstDate: ',maxDate)
    }

    // const DisplayPosition = () => {
    //     console.log(latitude,typeof longitude)
    //     props.map.flyTo(L.latLng(Number(latitude),Number(longitude)), 13)
    // }

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

                <div className={NavBarStyles.navBar} onMouseDown={() =>disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>
                    <div className={NavBarStyles.reportPdf}>
                        <button className={NavBarStyles.reportButton} onClick={props.modalPDF}>Отчёт в PDF</button>
                    </div>
                    <div className={NavBarStyles.reportShp}>
                        <button className={NavBarStyles.reportButton} onClick={props.modalSHP}>Отчёт в SHP</button>
                    </div>
                    <div className={NavBarStyles.navBarMainInstruments}>
                        <List className={NavBarStyles.list}>
                            <b>Варианты подстилающей карты</b><br/>
                            { props.layers.map((listItem,index)=>(listItem.type === 'baseLayer' ?
                                    <div className={NavBarStyles.style_map}>
                                        <ListItem  key={index}>
                                            {listItem.name}{
                                            <Checkbox
                                                checked={listItem.name === props.layers.find(name => name.url === props.layersValue).name}
                                                edge="end"
                                                onChange={()=>props.layersChange(listItem.url)}
                                            />
                                        }
                                        </ListItem>
                                    </div>
                                        : listItem.type === 'markersOverlay' ?
                                        <div className={NavBarStyles.divSwitch}>
                                            <b>Отображение дополнительных данных</b>
                                            <ListItem className={NavBarStyles.listItem} key={index}>
                                                {listItem.name}{
                                                <Switch
                                                    checked={props.markersValue}
                                                    edge="end"
                                                    onChange={()=>props.markersShow()}
                                                    //inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            }
                                            </ListItem>
                                            {props.markersValue && <div className={NavBarStyles.markersDiv}>
                                                <div className={NavBarStyles.markersYellow}>
                                                    <span className={NavBarStyles.spanInfo}>{'<593K'}</span>
                                                </div>
                                                <div className={NavBarStyles.markersOrange}>
                                                    <span className={NavBarStyles.spanInfo}>{'>593K<613K'}</span>
                                                </div>
                                                <div className={NavBarStyles.markersRed}>
                                                    <span className={NavBarStyles.spanInfo}>{'>613K<663K'}</span>
                                                </div>
                                                <div className={NavBarStyles.markersExtraHot}>
                                                    <span className={NavBarStyles.spanInfo}>{'>663K'}</span>
                                                </div>
                                            </div>}
                                        </div>
                                            : listItem.type === 'natureReserves' ?
                                            <div className={NavBarStyles.divSwitch}>
                                                <ListItem className={NavBarStyles.listItem} key={index}>
                                                    {listItem.name}{
                                                    <Switch
                                                        checked={props.natureReservesValue}
                                                        edge="end"
                                                        onChange={()=>props.NatureReservesShow()}
                                                        //inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                }
                                                </ListItem>
                                            </div>
                                                : listItem.type === 'imageOverlayFY3D250' ?
                                                <div className={NavBarStyles.divSwitch}>
                                                    <ListItem className={NavBarStyles.listItem} key={index}>
                                                        {listItem.name}{
                                                        <Switch
                                                            checked={props.fy3d250Value}
                                                            edge="end"
                                                            onChange={()=>props.fy3d250Show()}
                                                        />
                                                    }
                                                    </ListItem>
                                                </div>
                                                    : listItem.type === 'imageOverlayFY3D1000' ?
                                                    <div  className={NavBarStyles.divSwitch}>
                                                        <ListItem className={NavBarStyles.listItem} key={index}>
                                                            {listItem.name}{
                                                            <Switch
                                                                checked={props.fy3d1000Value}
                                                                edge="end"
                                                                onChange={()=>props.fy3d1000Show()}
                                                                //inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        </ListItem>
                                                    </div>
                                                    : listItem.type === 'settLement' ?
                                                        <div  className={NavBarStyles.divSwitch}>
                                                            <ListItem className={NavBarStyles.listItem} key={index}>
                                                                {listItem.name}{
                                                                <Switch
                                                                    checked={props.settLementValue}
                                                                    edge="end"
                                                                    onChange={()=>props.settLementShow()}
                                                                    //inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            }
                                                            </ListItem>
                                                        </div>
                                                        :
                                                    <div className={NavBarStyles.divSwitch}>
                                                        <ListItem className={NavBarStyles.listItem} key={index}>
                                                            {listItem.name}{
                                                            <Switch
                                                                checked={props.bordersValue}
                                                                edge="end"
                                                                onChange={()=>props.bordersShow()}
                                                                //inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        </ListItem>
                                                    </div>
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
                        <button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: true,
                            singleDay: true,
                            week: false,
                            last_24_hours: false,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: today,
                            min_datetime: setToday() + 'T00:00:00',
                            max_datetime: setToday() + 'T23:59:59',
                        })} title={'Точки пожаров за сегодня'}>Сегодня</button>

                        <button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: false,
                            singleDay: false,
                            week: false,
                            last_24_hours: true,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: ''
                        })} title={'Точки пожаров за 24 часа'}>24 часа</button>

                        <button className={NavBarStyles.buttonSort} onClick={()=>setContext({
                            today: false,
                            singleDay: false,
                            week: true,
                            last_24_hours: false,
                            daysInRange: false,
                            min_date: '',
                            max_date: '',
                            currentDate: ''
                        })} title={'Точки пожаров за неделю'}>Неделя</button>
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
                            <button className={Range_days.save_time} onClick={()=>setValidDate(dateRange)}>Сохранить</button>
                            <button className={Range_days.reset_time} onClick={()=>resetDaysInRangeIntoToday()} >Сбросить</button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}