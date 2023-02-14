import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../Restore_Page/Restore.css'
import {FormEvent} from "react";

export function Restore_password(){

    const navigate = useNavigate();

    const [password,setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

    const isValid = (): boolean =>{
        let result = true;
        setPasswordError('');
        setPasswordRepeatError('');

        if (password.length <= 7){
            setPasswordError('Ненадёжный пароль!');
            result = false;
        }else if (/[a-zA-Z]/.test(password)){
            setPasswordError('Недопустимые символы!');
            result = false;
        }
        if (!(password === passwordRepeat)){
            setPasswordRepeatError('Пароли не совпадают!')
            result = false;
        }
        return result;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isValid();
    }



    return<>
        <form onSubmit={handleSubmit}>
            <div className='parent'>
                <div className='logo'>
                    <h1>Вы используете сервис Fire Activity Map -<br/>Сервис для мониторинга пожаров и очагов возгорания<br/>по всему миру</h1>
                </div>
                <video className={'video'} autoPlay muted loop>
                    <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
                </video>
                <div className='block_restore'>
                    <div className='block_header'>
                        <h2>Смена пароля</h2>
                    </div>
                    <div className='inputs_block_restore'>

                        <legend>Введите новый пароль</legend>
                        <input type={'password'} placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}></input>
                        {passwordError && <div className={'error'}>{passwordError}</div>}

                        <legend>Повторите пароль</legend>
                        <input type="password" placeholder='Повтор пароля' onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat}></input>
                        {passwordRepeatError && <div className={'error'}>{passwordRepeatError}</div>}

                    </div>
                    <div className="form_footer">

                        <button className={'restore_button'}>Сменить пароль</button>
                        <br/>
                        <a className={'ref_signin'} href="" onClick={()=> navigate('/')}>Авторизация</a>

                    </div>
                </div>
            </div>
        </form>
    </>
}