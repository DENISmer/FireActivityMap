import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import newStyle from "./Restore.module.css";
import {useForm} from "react-hook-form";

export function Restore_password(){

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

    const [password,setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');




    return<>
        <section className={newStyle.section}>

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={newStyle.h2}>Смена пароля</h2>

                    <div className={newStyle.input_box}>
                        <input type="password" className={newStyle.restore_input} />
                        <label htmlFor="" className={newStyle.restore_label}>Введите новый пароль</label>
                    </div>

                    <input className={newStyle.button} type="submit" value="Войти" disabled={!isValid}/>


                    <div className={newStyle.login}>
                        <p>Авторизация: <a href="" onClick={()=> navigate('/')}>Перейти</a></p>
                    </div>
                </form>
            </div>
        </section>
    </>
}