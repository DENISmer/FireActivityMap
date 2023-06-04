import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {FormEvent} from "react";
import newStyle from "./Restore.module.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import {URL_FOR_USER} from "../../config/config";
import auth from '../Authorization/Auth.module.css'
import {useCookies} from "react-cookie";



export default function Restore() {

    const navigate = useNavigate();

    const [ seconds, setSeconds ] = useState(60);
    const [ timerActive, setTimerActive ] = useState(false);
    const [ restoreSuccess, setRestoreSuccess ] = useState(false);
    const [ active, setActive] = useState(true);
    const [ requestError, setRequestError] = useState(false)

    const [refreshEmailCookie,setEmailCookie,removeEmailCookie] = useCookies(['email']);
    useEffect(()=>{

        if (active && timerActive){
            let timerId = setInterval(()=> {timerActive && setSeconds((seconds)=>(seconds >= 1 ? seconds - 1 : 0))},1000);
            setTimeout(()=>{ setActive(false); clearInterval(timerId)},60000);

            isValid();
        }else {
            setActive(false);
            setTimerActive(false);
        }

    }, [active, timerActive,restoreSuccess]);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        reset();
        axios(URL_FOR_USER.URL_RESTORE_PASSWORD,{
            method: 'POST',
            data:{
                email: data.Email
            }
        })
            .then((response)=> {
                if(response.data.user_info === '10'){// сюда надо старт счетчика для повторного запроса
                    setRestoreSuccess(true)
                    setTimerActive(true)
                    setEmailCookie(data.Email)
                }
            })
            .catch((error)=>{
                if(error.request.status === 400 || error.request.status === 403 ) {
                    setRequestError(true)
                }
            })
    }

    return<>
        <section className={newStyle.section}>

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={newStyle.h2}>Восстановление пароля</h2>

                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.restore_input}
                            onClick={() => {setRequestError(false)}}
                            {...register("Email",{
                                required: "Это поле обязательно для заполнения",
                                maxLength: {
                                    value : 30,
                                    message: "Маскимум 30 символов"
                                },
                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                            })}
                        />
                        <label className={newStyle.restore_label}>Email</label>
                    </div>
                    <div className={auth.error}>
                        {errors?.Email && <p>{errors?.Email?.message || "Неверный формат!"}</p>}
                        {requestError && <p>Проверьте введенные данные</p>}
                    </div>
                    <div className={auth.success}>
                        {restoreSuccess && <p>Письмо отправлено на указанную почту</p>}
                    </div>


                        {seconds
                            ? <React.Fragment>
                                <button className={newStyle.button} onClick={()=> {
                                    setTimerActive(!timerActive)
                                }} disabled={active || !isValid}>Восстановить доступ</button>
                                <div className={newStyle.seconds}>{seconds}</div>

                            </React.Fragment>
                            : <button className={newStyle.button} onClick={() => setSeconds(60)}>Отправить запрос повторно</button>}


                    <div className={newStyle.login}>
                        <p><a href="" onClick={()=> navigate('/')}>Авторизация</a></p>
                    </div>

                </form>
            </div>
        </section>
    </>
}