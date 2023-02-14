import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Profile_style.css"

export function Profile(){

    const navigate = useNavigate();

    const Ivan_Ivanovich_Ivanov = 'Ivan Ivanovich Ivanov';

    const[anim, setAnim] = useState(0);
    console.log(anim);

    return<>
        <div className='parent'>
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
                        <legend className='legends'>{Ivan_Ivanovich_Ivanov}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Название организации</label>
                        <legend className='legends'>{Ivan_Ivanovich_Ivanov}</legend>
                    </div>
                    <hr className='hr'/>
                    <div>
                        <label className='labels'>Email</label>
                        <legend className='legends'>{Ivan_Ivanovich_Ivanov}</legend>
                    </div>
                    <hr/>
                    <br/>
                    <button className='restore_button'>Изменить пароль</button>
                    <button className='test' onClick={()=> setAnim(1)} onAnimationEnd={()=>setAnim(0)} anim={anim}>ffff</button>
                </div>
            </div>
        </div>
    </>
}