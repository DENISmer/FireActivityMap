import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Manual_Style from "./User_manual.module.css";
import "../background-space.css"
import Profile_Style from "../User_profile/Profile_style.module.css";

export function User_manual(){

    const navigate = useNavigate();


    return<>
        <div>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className={Manual_Style.panelManual}>
                <h3 className={Manual_Style.h}>На этой стрице вы можете ознакомиться с руководством пользователя</h3>
                <div className={Manual_Style.leftBox}>
                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation} onClick={()=> navigate('/Map')}>Перейти к карте</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation}>FAQ</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Manual_Style.Navigation}>
                        <a className={Manual_Style.hrefNavigation}>О нас</a>
                        <hr className={Manual_Style.hr}/>
                    </div>

                    <div className={Profile_Style.exit}>
                        <hr className={Profile_Style.hrExit}/>
                        <a className={Profile_Style.hrefNavigation} onClick={()=> navigate('/')}>Выйти</a>
                    </div>
                </div>

                <div className={Manual_Style.rightBox}>
                    {/*onClick={()=>navigate('/Test_Page')}*/}
                    <a className='href-navigation' >TEST</a>
                </div>
            </div>
        </div>
    </>
}