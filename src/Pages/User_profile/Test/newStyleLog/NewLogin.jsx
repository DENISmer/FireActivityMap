import React, {useEffect, useState} from "react";
import newStyle from './new.module.css';
import { useNavigate } from "react-router-dom";
import {value} from "lodash/seq";

export function Login_new(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] =useState(false);
    const [passwordDirty, setPasswordlDirty] =useState(false);
    const [formValid, setFormValid] = useState(false);

    const [emailError, setEmailError] = useState('Email не можкт быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

    useEffect(() => {
        if (emailError || passwordError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    },[emailError,passwordError])

    const blurHandler = (e) =>{
        switch (e.target.name){
            case 'email':
                setEmailDirty(true);
                break
            case 'password':
                setPasswordlDirty(true);
                break
        }
    }

    const emailHandler = (e) =>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный Email')
        }else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) =>{
        setPassword(e.target.value)
        if (e.target.value < 6 || e.target.value > 12){
            setPasswordError('Пароль должен быть больше 6 и меньше 12 символов');
            if (!e.target.value){
                setPasswordError('Пароль не может быть пустым')
            }
        }else{
            setPasswordError('')
        }
    }

    const URL = "https://jsonplaceholder.typicode.com/users/";

    // const isValid = (): boolean =>{
    //     let result = true;
    //     setEmailError("");
    //     setPasswordError('');
    //     if (email.length < 6) {
    //         console.log("Error")
    //         setEmailError("Слишком короткий логин");
    //         result = false;
    //     }
    //     else if(!/[^a-zA-Z0-9]/.test(email)){
    //         setEmailError('Недопустимые символы в логине');
    //         result = false
    //     }
    //     if (password.length <=7) {
    //         setPasswordError('Слишком короткий пароль!');
    //         result = false
    //     }
    //     return result;
    // }
    //
    // const loginRequest = async (mail,password) => {
    //     const response = await fetch(`${URL}/${1}`);
    //
    //     const data = await response.json();
    //
    //     if(response.status !== 200){
    //         setEmailError('Ошибка: Проверьте правильность введенных данных')
    //         console.log(response);
    //     }
    //     else if (data.email === "Sincere@april.biz") {
    //         data.toString();
    //         console.log(data);
    //         navigate('/Map');
    //     }
    // }
    //
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     isValid() ? loginRequest(email,password) : console.log("this data is not Valid");
    // }
    //
    //


    return<>

        <body>
        <section className={newStyle.section}>

            <div className={newStyle.logo_div}>
                <h1 className={newStyle.logo_h1}>Вы используете сервис Fire Activity Map -<br/>Сервис для мониторинга пожаров и очагов возгорания<br/>по всему миру</h1>
            </div>

            <video className={newStyle.video} autoPlay muted loop>
                <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
            </video>

            <div className={newStyle.form_box}>
                    <form>
                        <h2 className={newStyle.h2}>Вход</h2>
                        {(emailDirty && emailError) && <div style={{color:"red"}} className={newStyle.error}>{emailError}</div>}
                        <div className={newStyle.input_box}>
                            <input type='text' name='email' onChange={e => emailHandler(e)} value={email} className={newStyle.email_input} required onBlur={e => blurHandler(e)}/>
                            <label htmlFor="" className={newStyle.email_label}>Email</label>
                        </div>

                        <div className={newStyle.input_box}>
                            <input type="password" name='password' onChange={e => passwordHandler(e)} value={password} className={newStyle.password_input} required onBlur={e => blurHandler(e)}/>
                            <label htmlFor="" className={newStyle.password_label}>Пароль</label>
                        </div>
                        {(passwordDirty && passwordError) && <div style={{color:"red"}}>{passwordError}</div>}
                        <button disabled={!formValid} className={newStyle.button} onClick={()=>navigate('/Map')}>Войти</button>

                        <div className={newStyle.register}>
                            <p>Нет аккаунта? <a href="#" onClick={()=> navigate('/Signup')}>Зарегистрироваться</a></p>
                        </div>

                        <div className={newStyle.restore}>
                            <p>Забыли пароль? <a href="#" onClick={()=> navigate('/restore_access')}>Восстановить доступ</a></p>
                        </div>
                    </form>
            </div>
        </section><
        /body>

    </>
}