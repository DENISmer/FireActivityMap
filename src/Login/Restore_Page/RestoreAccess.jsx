import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import '../Restore_Page/Restore.css'
import {FormEvent} from "react";


export default function Restore() {

    const navigate = useNavigate();


    const [mail, setMail] = useState('');
    const [mailMessage, setMailMessage] = useState('');


    const [ seconds, setSeconds ] = useState(60);
    const [ timerActive, setTimerActive ] = useState(false);
    const [ restoreSuccess, setRestoreSuccess ] = useState();
    const [ active, setActive] = useState(true);

    useEffect(()=>{

        if (active && timerActive){
            console.log('if is true')
            let timerId = setInterval(()=> {timerActive && setSeconds((seconds)=>(seconds >= 1 ? seconds - 1 : 0))},1000);
            setTimeout(()=>{ setActive(false); clearInterval(timerId)},60000);

            isValid();
            console.log('restoreSuccess: ' + restoreSuccess);
        }else {
            setActive(false);
            setTimerActive(false);
        }

    }, [active, timerActive,restoreSuccess]);

    const isValid = ()=>{
        let result;

        setMailMessage("");
        if (mail.length < 1) {
            console.log("Error")
            setMailMessage("Некорректный Email");
            result = false;
            setRestoreSuccess(result);
        }else {
            result = true;
            setRestoreSuccess(result);
            setTimerActive(true);
            setActive(true);
            setMailMessage("Сслыка для восстановления пароля отправлена на указаную почту");
        }
        return result;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isValid();
    }
    // Должно работать так: Пользваоетль вводит данные,
    // введённые данные проверяются с данными в базе,
    // если совпадение есть(такой пользваоетль существует) -
    // на указанную почту приходит письмо с ссылкой на страницу восстановления пароля, если совпадений в базе нет -
    // сообщение об ошибке: "Пользователь с такими данными не зарегистрирован".

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
                        <h2>Восстановление доступа</h2>
                    </div>

                    <div className='inputs_block_restore'>
                        <legend>Укажите адрес электронной почты</legend>
                        <input type={'email'} placeholder='Email' onChange={e => setMail(e.target.value)} value={mail}></input>
                        {mailMessage && <div className="error">{mailMessage}</div>}
                    </div>

                    <div className="form_footer">
                        {seconds
                        ? <React.Fragment>
                                <button className='restore_button' onClick={()=> setTimerActive(!timerActive)} disabled={active}>Восстановить доступ</button>
                                <div >{seconds}</div>

                            </React.Fragment>
                        : <button className='restore_button' onClick={() => setSeconds(60)}>Отправить запрос повторно</button>}
                        <br/>
                        <a className={'ref_signin'} href="" onClick={()=> navigate('/')}>Авторизация</a>
                    </div>
                </div>
            </div>
        </form>
    </>
}