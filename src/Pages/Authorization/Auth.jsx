import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import newStyle from './Auth.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import {URL_FOR_USER} from "../../config/config";


export function Login(){
    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);
    //const [accessTokenCookies,setAccessTokenCookie,removeAccessTokenCookie] = useCookies(['accessToken']);

    const [loginError,setLoginError] = useState(false)
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    useEffect(()=>{
        axios(URL_FOR_USER.URL_REFRESH,
            {
                method : 'POST',
                data : {
                    refresh_token: refreshTokenCookies['refreshToken']
                }
            })
            .then(async (response)=>{
                await setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)
                navigate('/Map')
                }
            )
            .catch((e)=>{
                console.log(e.message)
            })
    },[])

    const onSubmit = async (data) => {
        //alert(JSON.stringify(data.Pass));
        //reset()
        // console.log(data.Email, data.Pass)
        await axios(URL_FOR_USER.URL_CREATE,{
            method: 'POST',
            data :
            {
                email: data.Email,
                password: data.Pass
            },
            headers: {
            'Content-Type': "application/json",
                }
    }).then(response => {
            if(response.status === 200){
                //console.log(response.data.refresh)
                setRefreshTokenCookie('refreshToken',response.data.refresh, {maxAge: 5 * 3600})
                setRefreshTokenCookie('accessToken',response.data.access, {maxAge: 5 * 3600})
                navigate('/Map')
            }
            else{
                //setLoginError(true)
            }
        }).catch(e => {
            // console.log(e.message)
            setLoginError(true)
            }
        )
    }

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


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
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            onClick={()=> setLoginError(false)}
                            className={newStyle.email_input}
                            {...register("Email",{
                                required: "Это поле обязательно для заполнения",
                                maxLength: {
                                    value : 30,
                                    message: "Маскимум 30 символов"
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
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}
                               onClick={()=> setLoginError(false)}
                               {...register("Pass",{
                                   required: "Это поле обязательно для заполнения",
                                   maxLength: {
                                       value : 15,
                                       message: "Маскимум 15 символов"
                                   }
                               })}
                               required/>
                        <label htmlFor="" className={newStyle.password_label}>Пароль</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.Pass && <p>{errors?.Pass?.message || "Неверный формат!"}</p>}
                        {loginError ? <p>{"Пожайлуйста, проверьте введенные данные"}</p> : null}
                    </div>
                    <input className={newStyle.button} type="submit" value="Войти" onClick={() => setLoginError(false)} disabled={!isValid}/>

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