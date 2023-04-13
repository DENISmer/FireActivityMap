import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import newStyle from './Auth.module.css';
import { useNavigate } from "react-router-dom";



export function Login(){

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    }

    const navigate = useNavigate();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [emailDirty, setEmailDirty] =useState(false);
    // const [passwordDirty, setPasswordlDirty] =useState(false);
    // const [formValid, setFormValid] = useState(false);
    //
    // const [emailError, setEmailError] = useState('Email не можкт быть пустым');
    // const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    //
    // useEffect(() => {
    //     if (emailError || passwordError){
    //         setFormValid(false)
    //     }else{
    //         setFormValid(true)
    //     }
    // },[emailError,passwordError])
    //
    // const blurHandler = (e) =>{
    //     switch (e.target.name){
    //         case 'email':
    //             setEmailDirty(true);
    //             break
    //         case 'password':
    //             setPasswordlDirty(true);
    //             break
    //     }
    // }
    //
    // const emailHandler = (e) =>{
    //     setEmail(e.target.value)
    //     const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     if (!re.test(String(e.target.value).toLowerCase())){
    //         setEmailError('Некорректный Email')
    //     }else {
    //         setEmailError('')
    //     }
    // }
    //
    // const passwordHandler = (e) =>{
    //     setPassword(e.target.value)
    //     if (e.target.value < 6 || e.target.value > 12){
    //         setPasswordError('Пароль должен быть больше 6 и меньше 12 символов');
    //         if (!e.target.value){
    //             setPasswordError('Пароль не может быть пустым')
    //         }
    //     }else{
    //         setPasswordError('')
    //     }
    // }

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
                            className={newStyle.email_input}
                            {...register("Email",{
                                required: "Это поле обязательно для заполнения",
                                maxLength: {
                                    value : 20,
                                    message: "Маскимум 15 символов"
                                },
                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                            })}
                        />
                        <label className={newStyle.email_label}>Email</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.Email && <p>{errors?.Email?.message || "Неверный формат!"}</p>}
                    </div>

                    <div className={newStyle.input_box}>
                        <input type="password" className={newStyle.password_input} required/>
                        <label htmlFor="" className={newStyle.password_label}>Пароль</label>
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