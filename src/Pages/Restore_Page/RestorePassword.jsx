import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import newStyle from "./Restore.module.css";
import {useForm} from "react-hook-form";
import {URL_FOR_USER} from "../../config/config";
import axios from "axios";
import auth from '../Authorization/Auth.module.css'
export function Restore_password(){

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = () => {
        //alert(JSON.stringify());

        axios(URL_FOR_USER.URL_CONFIRM_RESTORE_PASS,{
            method: 'POST',
            data: {
                email: email,
                token: token,
                uuid: uuid,
                password: password
            }
        })
            .then((response)=> {
                setSuccessPassRefresh(true);
                setTimeout(()=>navigate('/'), 2500)
                reset();
            })
            .catch((error) => {
                reset();
                setSuccessPassRefresh(false);
                setPasswordError(true)
            })
    }
    const navigate = useNavigate();


    const [password,setPassword] = useState('');
    const [email,setEmail] = useState();
    const [token,setToken] = useState();
    const [uuid,setUuid] = useState();

    const [successPassRefresh,setSuccessPassRefresh] = useState(false)

    const [passwordError, setPasswordError] = useState(false);

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

    useEffect(()=>{
        try {
            let params = (new URL(document.location)).searchParams;
            setEmail(params.get("email"));
            setToken(params.get("token"));
            setUuid(params.get("uuid"));
        }
        catch {
            setPasswordError(true);
            setSuccessPassRefresh(false)
        }

    },[])


    return<>
        <section className={newStyle.section}>

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={newStyle.h2}>Смена пароля</h2>

                        <div className={newStyle.input_box}>
                            <input
                                placeholder={"Введите новый пароль"} type="password" className={newStyle.password_input}
                                   value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value);
                                       setSuccessPassRefresh(false);
                                       setPasswordError(false);
                                   }}
                                   />
                            { successPassRefresh && <div className={auth.success}>
                                <p>Пароль успешно изменен.</p>
                                <p>Автоматическая переадресация на страницу входа...</p>
                            </div>}
                            { passwordError && <div className={auth.error}>
                                <p>Упс! Что-то пошло не так</p>
                            </div>}

                        </div>

                        <input className={newStyle.button} type="submit" onClick={() => onSubmit()} value="Сохранить" disabled={!isValid}/>


                    <div className={newStyle.login}>
                        <p>Авторизация: <a href="" onClick={()=> navigate('/')}>Перейти</a></p>
                    </div>
                </form>
            </div>
        </section>
    </>
}