import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import newStyle from './registration.module.css';
import { useNavigate } from "react-router-dom";
import {value} from "lodash/seq";



export function Registration(){

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

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={newStyle.h2}>Регистрация</h2>


                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.registration_input}
                            {...register("firstName",{
                                required: "Это поле обязательно для заполнения",
                                minLength: {
                                    value : 2,
                                    message: "Минимум 2 символа"
                                },
                                maxLength: {
                                    value : 15,
                                    message: "Максимум 15 символов"
                                },
                                pattern: /[A-Za-zА-Яа-я]{3}/
                            })}
                        />
                        <label htmlFor="" className={newStyle.registration_label}>Имя</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.firstName && <p>{errors?.firstName?.message || "Недопустимые символы!"}</p>}
                    </div>


                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.registration_input}
                            {...register("secondName",{
                                required: "Это поле обязательно для заполнения",
                                minLength: {
                                    value : 2,
                                    message: "Минимум 2 символа"
                                },
                                maxLength: {
                                    value : 15,
                                    message: "Маскимум 15 символов"
                                },
                                pattern: /[A-Za-zА-Яа-я]{3}/
                            })}
                        />
                        <label htmlFor="" className={newStyle.registration_label}>Фамилия</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.secondName && <p>{errors?.secondName?.message || "Недопустимые символы!"}</p>}
                    </div>


                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.registration_input}
                            {...register("surnameName",{
                                required: "Это поле обязательно для заполнения",
                                minLength: {
                                    value : 2,
                                    message: "Минимум 2 символа"
                                },
                                maxLength: {
                                    value : 15,
                                    message: "Маскимум 15 символов"
                                },
                                pattern: /[A-Za-zА-Яа-я]{3}/
                            })}
                        />
                        <label htmlFor="" className={newStyle.registration_label}>Отчество</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.surnameName && <p>{errors?.surnameName?.message || "Недопустимые символы!"}</p>}
                    </div>


                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.registration_input}
                            {...register("organizationName",{
                                required: "Это поле обязательно для заполнения",
                                minLength: {
                                    value : 5,
                                    message: "Минимум 2 символа"
                                },
                                maxLength: {
                                    value : 20,
                                    message: "Маскимум 15 символов"
                                },
                            })}
                        />
                        <label className={newStyle.registration_label}>Название организации</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.organizationName && <p>{errors?.organizationName?.message || "Ошибка!"}</p>}
                    </div>

                    <div className={newStyle.input_box}>
                        <input
                            className={newStyle.registration_input}
                            {...register("Email",{
                                required: "Это поле обязательно для заполнения",
                                maxLength: {
                                    value : 20,
                                    message: "Маскимум 15 символов"
                                },
                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                            })}
                        />
                        <label className={newStyle.registration_label}>Email</label>
                    </div>
                    <div className={newStyle.error}>
                        {errors?.Email && <p>{errors?.Email?.message || "Неверный формат!"}</p>}
                    </div>

                    <div className={newStyle.file_input_box}>
                        <label className={newStyle.file_label}>Прикрепите документ, подтверждающий информацию</label>
                        <input className={newStyle.file_input} type={"file"} required/>
                    </div>

                    <input className={newStyle.button} type="submit" disabled={!isValid}/>

                    <div className={newStyle.login}>
                        <p>Уже есть аккаунт? <a href="" onClick={()=> navigate('/')}>Авторизация</a></p>
                    </div>

                    <div className={newStyle.restore}>
                        <p>Забыли пароль? <a href="" onClick={()=> navigate('/restore_access')}>Восстановить доступ</a></p>
                    </div>
                </form>
            </div>
        </section>

    </>
}