import React from 'react';
import {useNavigate} from "react-router-dom";

export function Signin(){
    const navigate = useNavigate();

    return<>
        <div className='parent'>
            <img className='logos-img' src="https://img3.akspic.ru/crops/7/4/5/5/25547/25547-zemlya-noch-prostranstvo-vselennaya-kosmos-1920x1080.jpg"/>
            <div className='block'>
                <div className='block_header'>
                    <h2>Авторизация</h2>
                </div>
                <div className='inputs_block'>
                    <input placeholder='Почта'></input>
                    <input type="password" placeholder='Пароль'></input>
                </div>
                <div>
                    <button onClick={()=> navigate('/Map')}>Войти</button>
                    <a href="" onClick={()=> navigate('/Signup')}>Нет аккаунта?</a>
                </div>
            </div>
        </div>
    </>
}