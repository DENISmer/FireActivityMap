import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import newStyle from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";



export function Login(){

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = async (data) => {
        //alert(JSON.stringify(data.Pass));
        //reset()
        console.log(data.Email, data.Pass)
        await axios({url: `https://fam.rcpod.space/api/auth/jwt/create/`,
            method: 'POST',
            data :
            {
                email: data.Email,
                password: data.Pass

                //refresh_token: JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NTIwMDcyMiwiaWF0IjoxNjg1MDI3OTIyLCJqdGkiOiIzZWExYzczOS0xZjI5LTQ3NDEtOTc2Yi0zZjIxNzAwODI3N2YiLCJ1c2VyX2lkIjo5fQ.r4sJa2LFHLyXAxiyeqgoMb1q7tpMbwEfuc9ZHBd56Ak")
            },
            headers: {
            'Content-Type': "application/json",
            //'Cache-Control': 'no-cache'
            //'Access-Control-Allow-Headers': '*',
            //'Access-Control-Allow-Methods': "POST"
            //'Access-Control-Allow-Origin': "*"
                }
    }).then(data => { if(data.status === 200){
            navigate('/Map')
        }
        }).catch(e => console.log(e.message))
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    // const [emailError, setEmailError] = useState('Email не можкт быть пустым');
    // const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

    const URL = "https://jsonplaceholder.typicode.com/users/";


    return<>
        <section className={newStyle.section}>

            <div className={newStyle.logo_div}>
                <h1 className={newStyle.logo_h1}>Вы используете сервис Fire Activity Map -<br/>Сервис для мониторинга пожаров и очагов возгорания</h1>
            </div>

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={newStyle.h2}>Авторизация</h2>

                    <div className={newStyle.input_box}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={newStyle.email_input}
                            {...register("Email",{
                                required: "Это поле обязательно для заполнения",
                                maxLength: {
                                    value : 20,
                                    message: "Маскимум 15 символов"
                                },
                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                            })}
                            required
                        />
                        <label className={newStyle.email_label}>Email</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.Email && <p>{errors?.Email?.message || "Неверный формат!"}</p>}
                    </div>

                    <div className={newStyle.input_box}>
                        <input type="password" className={newStyle.password_input}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               {...register("Pass",{
                                   required: "Это поле обязательно для заполнения",
                                   maxLength: {
                                       value : 20,
                                       message: "Маскимум 15 символов"
                                   }
                               })}
                               required/>
                        <label htmlFor="" className={newStyle.password_label}>Пароль</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.Pass && <p>{errors?.Pass?.message || "Неверный формат!"}</p>}
                    </div>
                    <input className={newStyle.button} type="submit" value="Войти" disabled={!isValid}/>

                    <div className={newStyle.register}>
                        <p>Нет аккаунта? <a href="" onClick={()=> navigate('/Registration')}>Зарегистрироваться</a></p>
                    </div>

                    <div className={newStyle.restore}>
                        <p>Забыли пароль? <a href="" onClick={()=> navigate('/restore_access')}>Восстановить доступ</a></p>
                    </div>
                </form>
            </div>
        </section>
    </>
}