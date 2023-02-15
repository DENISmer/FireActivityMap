import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../Restore_Page/Restore.css'

export default function Restore(){

    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    // Должно работать так: Пользваоетль вводит данные,
    // введённые данные проверяются с данными в базе,
    // если совпадение есть(такой пользваоетль существует) -
    // на указанную почту приходит письмо с ссылкой на страницу восстановления пароля, если совпадений в базе нет -
    // сообщение об ошибке: "Пользователь с такими данными не зарегистрирован".

    return<>
        <form>
            <div className='parent'>
                <div className='logo'>
                    <h1>Вы используете сервис Fire Activity Map -<br/>Сервис для мониторинга пожаров и очагов возгорания<br/>по всему миру</h1>
                </div>
                <video className={'video'} autoPlay muted loop>
                    <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
                </video>
                <div className='block_restore'>
                    <div className='block_header'>
                        <h2>Восстановление доступа</h2>
                    </div>
                    <div className='inputs_block_restore'>

                        <legend>Укажите адрес электронной почты</legend>
                        <input type={'email'} placeholder='Email' onChange={e => setMail(e.target.value)} value={mail}></input>
                    </div>
                    <div className="form_footer">

                        <button className={'restore_button'}>Восстановить доступ</button>
                        <br/>
                        <a className={'ref_signin'} href="" onClick={()=> navigate('/')}>Авторизация</a>

                    </div>
                </div>
            </div>
        </form>
    </>
}