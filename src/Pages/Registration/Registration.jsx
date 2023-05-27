import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form'
import newStyle from './registration.module.css';
import {useNavigate} from "react-router-dom";
import {URL_FOR_USER} from "../../config/config";
import axios from "axios";



export function Registration(){

    const [requestError, setRequestError] = useState(false);
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        // reset();
        //console.log(data.fileList[0])
        axios(URL_FOR_USER.URL_REGISTER,{
            method: 'POST',
            data: {
                email : data.Email,
                last_name : data.secondName,
                first_name : data.firstName,
                middle_name : data.surnameName,
                organization_name : data.organizationName,
                file : data.fileList[0]
            },headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data)
                navigate('/')
            })
            .catch(e => {
                console.log(e.message)
                setRequestError(true)
            })
    }

    const navigate = useNavigate();

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
                        <input className={newStyle.file_input} type={"file"} accept={'.docx,.doc,.pdf,.obt'}
                               {...register("fileList",{
                                    required: "Это поле обязательно для заполнения",
                        })}/>
                    </div>
                    <div className={newStyle.error}>
                        {requestError && <p>{"Ошибка авторизации! Проверьте введенные данные"}</p>}
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