import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Manual_Style from "./User_manual.module.css";
import "../background-space.css"
import Profile_Style from "../User_profile/Profile_style.module.css";
import axios from "axios";
import {URL_FOR_MARKS, URL_FOR_USER} from "../../config/config";
import {useCookies} from "react-cookie";
import loader from "../../icons/loading-loading-forever.gif";
import '../../components/Map/Map.css'
export function User_manual(){

    const navigate = useNavigate();

    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const [userAccess, setUserAccess] = useState(false)

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
                    console.log(error.message)
                }
                console.log(error.status)
            })
    }
    useEffect(()=>{
        requestForInfoWhenMapIsReady()
    },[])
    return<>
        {userAccess ? <div className={Manual_Style.parent}>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className={Manual_Style.panelManual}>
                <h3 className={Manual_Style.h}>На этой стрице вы можете ознакомиться с руководством пользователя</h3>
                <div className={Manual_Style.leftBox}>
                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation} onClick={() => navigate('/Map')}>Перейти к карте</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation} onClick={() => navigate('/Profile')}>Профиль</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation}>О нас</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Profile_Style.exit}>
                        <hr className={Profile_Style.hrExit}/>
                        <a className={Profile_Style.hrefNavigation} onClick={() => navigate('/')}>Выйти</a>
                    </div>
                </div>

                <div className={Manual_Style.rightBox}>
                    <a className='href-navigation'>TEST</a>
                </div>
            </div>
        </div> : <div className={'userLoadingDiv'}><img className={'userLoading'} width={100} height={100} src={loader} alt={'#'}/></div>}
    </>
}