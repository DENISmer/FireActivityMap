import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Profile_style.css";
import "../background-space.css"
import {removeClass} from "leaflet/src/dom/DomUtil";

export function Profile(){

    const navigate = useNavigate();

    const name = 'Ivan Ivanovich Ivanov';
    const email = 'Ivanich@mail.rom';
    const organization_name = 'SupremeUltimateTurboV-powerUndergroundCompany'


    return<>
        <div className='parent'>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className='panel'>
                <h3 className='h'>Информация о пользователе</h3>
                <div className='left-box'>
                    <div className='Navigation'>
                        <a className='href-navigation' onClick={()=> navigate('/Map')}>Перейти к карте</a>
                        <hr className='hr'/>
                    </div>

                    <div className='Navigation'>
                        <a className='href-navigation'>FAQ</a>
                        <hr className='hr'/>
                    </div>

                    <div className='Navigation'>
                        <a className='href-navigation'>О нас</a>
                        <hr className='hr'/>
                    </div>

                    <div className='exit'>
                        <hr className='hr-exit'/>
                        <a className='href-navigation'onClick={()=> navigate('/')}>Выйти</a>
                    </div>
                </div>

                <div className='right-box'>
                    <div>
                        <label className='labels'>Имя</label>
                        <legend className='legends'>{name}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Название организации</label>
                        <legend className='legends'>{organization_name}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Email</label>
                        <legend className='legends'>{email}</legend>
                    </div>
                    <hr/>
                    <br/>
                    <button className='restore_button' onClick={()=> navigate("/restore_access")}>Изменить пароль</button>
                    <a className='href-navigation' onClick={()=>navigate('/Test_Page')}>TEST</a>
                </div>
            </div>
        </div>
    </>
}