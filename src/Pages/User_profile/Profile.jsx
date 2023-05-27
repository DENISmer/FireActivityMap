import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Profile_Style from "./Profile_style.module.css";
import "../background-space.css"
import {removeClass} from "leaflet/src/dom/DomUtil";

export function Profile(){

    const navigate = useNavigate();

    const name = 'Ivan Ivanovich Ivanov';
    const email = 'Ivanich@mail.rom';
    const organization_name = 'SupremeUltimateTurboV-powerUndergroundCompany';


    return<>
        <div className={Profile_Style.parent}>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className={Profile_Style.panel}>
                <h3 className={Profile_Style.h}>Информация о пользователе</h3>
                <div className={Profile_Style.leftBox}>
                    <div className={Profile_Style.Navigation}>
                        <a className={Profile_Style.hrefNavigation} onClick={()=> navigate('/Map')}>Перейти к карте</a>
                        <hr className={Profile_Style.hr}/>
                    </div>

                    <div className={Profile_Style.Navigation}>
                        <a className={Profile_Style.hrefNavigation}>FAQ</a>
                        <hr className={Profile_Style.hr}/>
                    </div>

                    <div className={Profile_Style.Navigation}>
                        <a className={Profile_Style.hrefNavigation}>О нас</a>
                        <hr className={Profile_Style.hr}/>
                    </div>

                    <div className={Profile_Style.exit}>
                        <hr className={Profile_Style.hrExit}/>
                        <a className={Profile_Style.hrefNavigation} onClick={()=> navigate('/')}>Выйти</a>
                    </div>
                </div>

                <div className={Profile_Style.rightBox}>
                    <div>
                        <label className='labels'>Имя</label>
                        <legend className={Profile_Style.legends}>{name}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Название организации</label>
                        <legend className={Profile_Style.legends}>{organization_name}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Email</label>
                        <legend className={Profile_Style.legends}>{email}</legend>
                    </div>
                    <hr/>
                    <br/>
                    <button className='restore_button' onClick={()=> navigate("/restore_access")}>Изменить пароль</button>
                    <button className='restore_button' onClick={()=> navigate("/Admin")}>Администрирование</button>
                    <a className='href-navigation' href={'https://fam.rcpod.space/admin/'} target={'_blank'} >TEST</a>
                </div>
            </div>
        </div>
    </>
}