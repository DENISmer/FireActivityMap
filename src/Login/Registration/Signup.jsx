import React from "react";
import './Signup.css'
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();

    return<>
        <div className='parent'>
            <img className='logos-img' src="https://img3.akspic.ru/crops/7/4/5/5/25547/25547-zemlya-noch-prostranstvo-vselennaya-kosmos-1920x1080.jpg"/>
        <div className='block'>
            <div className='block_header'>
                <h2>Регистрация</h2>
            </div>
            <div className='inputs_block'>
                <input placeholder='Ф.И.О'></input>
                <input placeholder='Почта'></input>
                <input placeholder='Наименование организации'></input>
                <input type="password" placeholder='Пароль'></input>
                <input type="password" placeholder='Повтор пароля'></input>
            </div>
            <div>
                <button>Зарегистрироваться</button>
                <a href="" onClick={()=> navigate('/')}>Уже есть аккаунт?</a>
            </div>
        </div>
    </div>
    </>
}