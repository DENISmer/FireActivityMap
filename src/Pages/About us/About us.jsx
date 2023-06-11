import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import About_us_Style from "../Users_guide/User_manual.module.css";
import Style from "./About us Style.module.css"
import "../background-space.css"
import Profile_Style from "../User_profile/Profile_style.module.css";
import axios from "axios";
import {URL_FOR_MARKS, URL_FOR_USER} from "../../config/config";
import {useCookies} from "react-cookie";
import loader from "../../icons/loading-loading-forever.gif";


export function AboutUs(){

    const navigate = useNavigate();

    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const [userAccess, setUserAccess] = useState(false)

    const logoutHandle = () => {
        removeRefreshTokenCookie('refreshToken',{path: '/'})
        removeRefreshTokenCookie('accessToken',{path: '/'})
        navigate('/')
    }

    const requestForInfoWhenMapIsReady = () => {//запрос дней на наличие точек
        axios.get(URL_FOR_MARKS.URL_GET_INFO,{headers :
                {
                    Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                }
        })
            .then(async response =>{
                    await setUserAccess(true)
                }
            )
            .catch(error=>{
                if(error.request.status === 403 || error.request.status === 401){
                    axios(URL_FOR_USER.URL_REFRESH,
                        {
                            method : 'POST',
                            data : {
                                refresh_token: refreshTokenCookies['refreshToken']
                            }
                        })
                        .then(async response => {
                            setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)

                            setUserAccess(true)
                            axios.get(URL_FOR_MARKS.URL_GET_INFO,{headers :
                                    {
                                        Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                                    }
                            })
                                .then(response =>{
                                        setUserAccess(true)
                                    }
                                )
                        })
                        .catch((e) => {
                            setUserAccess(false)
                            removeRefreshTokenCookie('refreshToken')
                            setTimeout(()=>{navigate('/')},1500)

                        })
                }
                else if(error.request.status >= 500){
                    // console.log(error.message)
                }
                // console.log(error.status)
            })
    }
    useEffect(()=>{
        requestForInfoWhenMapIsReady()
    },[])
    return<>
        {userAccess ? <div className={About_us_Style.parent}>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className={About_us_Style.panelManual}>
                <h3 className={About_us_Style.h}>О нас</h3>

                <div className={About_us_Style.leftBox}>
                    <div className={About_us_Style.Navigation}>
                        <a className={About_us_Style.hrefNavigation} onClick={() => navigate('/Map')}>Перейти к карте</a>
                        <hr className={About_us_Style.hr}/>
                    </div>

                    <div className={About_us_Style.Navigation}>
                        <a className={About_us_Style.hrefNavigation} onClick={() => navigate('/Profile')}>Профиль</a>
                        <hr className={About_us_Style.hr}/>
                    </div>

                    <div className={About_us_Style.Navigation}>
                        <a className={About_us_Style.hrefNavigation} onClick={() => navigate('/Manual')}>Руководство Пользователя</a>
                        <hr className={About_us_Style.hr}/>
                    </div>

                    <div className={Profile_Style.exit}>
                        <hr className={Profile_Style.hrExit}/>
                        <a className={Profile_Style.hrefNavigation} onClick={() => logoutHandle()}>Выйти</a>
                    </div>
                </div>

                <div className={About_us_Style.rightBox}>
                    <div className={About_us_Style.aboutUs}>
                        <font color={'black'}>
                            Сибирский центр Федерального государственного бюджетного учреждения "Научно-исследовательский центр космической гидрометеорологии "Планета" (ФГБУ НИЦ "Планета")"<br/>
                            Адрес: 630099, Россия, г.Новосибирск ул.Советская 30<br/>
                            Телефон: +7 383 363-46-05<br/>
                            E-mail: kav@racpod.siberia.net<br/>
                            <a href={'https://rcpod.ru/contacts/'}>https://rcpod.ru</a>
                        </font>
                    </div>
                </div>
                <div className={About_us_Style.rightBottomBox}>
                    <div className={About_us_Style.aboutUs}>
                        <font color={'black'}>
                            Сервис выполнен выпускниками ВКИ НГУ:
                            <br/>
                            <a>Бельским Артемом Сергеевичем</a>
                            <br/>
                            <a>Голопапа Денисом Юрьевичем</a>
                            <br/>
                            <a>Сербиновичем Григорием Сергеевичем</a>
                        </font>
                    </div>
                </div>

            </div>
        </div> : <div className={'userLoadingDiv'}><img className={'userLoading'} width={100} height={100} src={loader} alt={'#'}/></div>}
    </>
}