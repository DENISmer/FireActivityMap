import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import newStyle from "./Restore.module.css";
import {useForm} from "react-hook-form";
import {URL_FOR_USER} from "../../config/config";
import axios from "axios";

export function Restore_password(){

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = () => {
        //alert(JSON.stringify());
        //reset();
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
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
       let email: ''
       let token: ''
       let uuid: ''
    const navigate = useNavigate();

    const [password,setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

    useEffect(()=>{
        let params = (new URL(document.location)).searchParams;
        email =  params.get("email");
        token = params.get("token");
        uuid = params.get("uuid");
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
                        <div className={newStyle.input_box}>
                            <input type="text" className={newStyle.password_input}
                                   value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                                   />
                        </div>
                    </div>

                    <input className={newStyle.button} type="submit" onClick={() => onSubmit()} value="Войти" disabled={!isValid}/>


                    <div className={newStyle.login}>
                        <p>Авторизация: <a href="" onClick={()=> navigate('/')}>Перейти</a></p>
                    </div>
                </form>
            </div>
        </section>
    </>
}