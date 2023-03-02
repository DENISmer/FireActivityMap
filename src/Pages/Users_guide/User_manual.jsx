import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./User_manual.css";
import "../background-space.css"

export function User_manual(){

    const navigate = useNavigate();


    return<>
        <div className='parent'>
            <div className="space Stars1"></div>
            <div className="space Stars2"></div>
            <div className="space Stars3"></div>
            <div className='panel'>
                <h3 className='h'>На этой стрице вы можете ознакомиться с руководством пользователя</h3>
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

                    <a className='href-navigation' onClick={()=>navigate('/Test_Page')}>TEST</a>
                </div>
            </div>
        </div>
    </>
}