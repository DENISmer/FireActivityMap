import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Profile_Style from "./Profile_style.module.css";
import "../background-space.css"
import axios from "axios";
import { URL_FOR_USER} from "../../config/config";
import {useCookies} from "react-cookie";
import loader from "../../icons/loading-loading-forever.gif";
import '../../components/Map/Map.css'
import Manual_Style from "../Users_guide/User_manual.module.css";

export function Profile(){

    const navigate = useNavigate();

    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const [userInfo,setUserInfo] = useState({
        email : 'нет информации',
        firstName : 'нет информации',
        middleName : 'нет информации',
        lastName : 'нет информации',
        organizationName : 'нет информации',
    })

    const [userAccess, setUserAccess] = useState(false)


    useEffect(()=>{
        axios((URL_FOR_USER.URL_GET_USER_INFO),{
            method: 'GET',
            headers :
                {
                    Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                }
        })
            .then(async response => {
                await setUserInfo({email: response.data.email ? response.data.email : 'нет информации',
                    firstName: (!response.data.first_name || response.data.first_name === "") ? 'нет информации' : response.data.first_name,
                    lastName: (!response.data.last_name || response.data.last_name === "") ? '' : response.data.last_name,
                    middleName: (!response.data.middle_name || response.data.middle_name === "") ? '' : response.data.middle_name,
                    organizationName: (!response.data.organization_name || response.data.organization_name === "") ? 'нет информации' : response.data.organization_name
                })
                await setUserAccess(true)

            }
            )
            .catch(error => {
                if(error.request.status === 403 || error.request.status === 401){
                    axios(URL_FOR_USER.URL_REFRESH,
                        {
                            method : 'POST',
                            data : {
                                refresh_token: refreshTokenCookies['refreshToken']
                            }
                        })
                        .then(response => {
                            setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)
                            setUserAccess(true)
                            axios((URL_FOR_USER.URL_GET_USER_INFO),{
                                method: 'GET',
                                headers :
                                    {
                                        Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                                    }
                            })
                                .then(async response => {
                                    await setUserInfo({email: response.data.email ? response.data.email : 'нет информации',
                                        firstName: (!response.data.first_name || response.data.first_name === "") ? 'нет информации' : response.data.first_name,
                                        lastName: (!response.data.last_name || response.data.last_name === "") ? '' : response.data.last_name,
                                        middleName: (!response.data.middle_name || response.data.middle_name === "") ? '' : response.data.middle_name,
                                        organizationName: (!response.data.organization_name || response.data.organization_name === "") ? 'нет информации' : response.data.organization_name
                                    })

                                    }
                                )
                            console.log(response.data)
                        })
                        .catch((e) => {
                            removeRefreshTokenCookie('refreshToken')
                            setUserAccess(false)
                            setTimeout(()=>{navigate('/')},1500)

                        })
                }
                else if(error.request.status >= 500){
                    removeRefreshTokenCookie('refreshToken')
                    setUserAccess(false)
                    setTimeout(()=>{navigate('/')},1500)
                }
            })
    },[])

    const logoutHandle = () => {
        removeRefreshTokenCookie('refreshToken',{path: '/'})
        removeRefreshTokenCookie('accessToken',{path: '/'})
        navigate('/')
    }

    return<>
        { userAccess ? <div className={Profile_Style.parent}>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className={Profile_Style.panel}>
                <h3 className={Profile_Style.h}>Информация о пользователе</h3>
                <div className={Profile_Style.leftBox}>
                    <div className={Profile_Style.Navigation}>
                        <a className={Profile_Style.hrefNavigation} onClick={() => navigate('/Map')}>Перейти к карте</a>
                        <hr className={Profile_Style.hr}/>
                    </div>

                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation} onClick={()=> navigate("/Manual")}>Руководство пользователя</a>
                        <hr className={Manual_Style.hr} />
                    </div>

                    <div className={Profile_Style.Navigation}>
                        <a className={Profile_Style.hrefNavigation}>О нас</a>
                        <hr className={Profile_Style.hr} />
                    </div>

                    <div className={Profile_Style.exit}>
                        <hr className={Profile_Style.hrExit}/>
                        <a className={Profile_Style.hrefNavigation} onClick={() => logoutHandle()}>Выйти</a>
                    </div>
                </div>

                <div className={Profile_Style.rightBox}>
                    <div>
                        <label className='labels'>Имя</label>
                        <legend
                            className={Profile_Style.legends}>{userInfo.lastName + ' ' + userInfo.firstName + ' ' + userInfo.middleName}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Название организации</label>
                        <legend className={Profile_Style.legends}>{userInfo.organizationName}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Email</label>
                        <legend className={Profile_Style.legends}>{userInfo.email}</legend>
                    </div>
                    <hr/>
                    <br/>
                    <button className={Profile_Style.button} onClick={() => navigate("/restore_access")}>Изменить
                        пароль
                    </button>
                    <button className={Profile_Style.button} onClick={() => navigate("/Admin")}>Администрирование
                    </button>
                </div>
            </div>
        </div> : <div className={'userLoadingDiv'}><img className={'userLoading'} width={100} height={100} src={loader} alt={'#'}/></div>}
    </>
}