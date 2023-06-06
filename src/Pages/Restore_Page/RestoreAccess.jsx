import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import newStyle from "./Restore.module.css";
import auth from '../Authorization/Auth.module.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {URL_FOR_USER} from "../../config/config";




export default function Restore() {

    const navigate = useNavigate();

    const [seconds, setSeconds ] = useState(30);
    const [disable, setDisable] = useState(false);
    const [restoreSuccess,setRestoreSuccess] = useState(false);
    const [restoreError,setRestoreError] = useState(false);

    const [email,setEmail] = useState('')
    const handleDisable = () => {
        setDisable(true);
        setTimeout(()=> {
            setDisable(false)
            setRestoreError(false)
        },30000)
        let timerId = seconds > 0 && setInterval(()=> {setSeconds((seconds) => (seconds >= 1 ? seconds - 1 : 0))},1000);
        if (disable){
            clearInterval(timerId)
        }else {
            setSeconds(30)
        }
    }

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = (email) => {
        axios(URL_FOR_USER.URL_RESTORE_PASSWORD,{
            method: 'POST',
            data:{
                email: email
            }
        })
            .then((response)=> {
                if(response.data.user_info === '10'){// сюда надо старт счетчика для повторного запроса
                    setRestoreSuccess(true);
                    setRestoreError(false);
                }
            })
            .catch((error)=>{
                setRestoreSuccess(false)
                if(error.request.status === 400 || error.request.status === 403 ) {
                    setRestoreError(true);
                    setRestoreSuccess(false)
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


                    {!disable && <div className={newStyle.input_box}>
                        <input
                            type={"email"}
                            className={newStyle.restore_input}
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                        <label className={newStyle.restore_label}>Email</label>
                    </div>}

                        <div className={auth.error}>
                    {errors?.Email && <p>{errors?.Email?.message || "Неверный формат!"}</p>}
                        </div>

                    {!disable && <input type="submit" className={newStyle.button} onClick={() => {
                        handleDisable()
                        onSubmit(email);
                    }}
                             disabled={disable || !isValid} value="Восстановить доступ"/>}
                    {disable && <div className={newStyle.seconds}>Отправить запрос повторно через: {seconds}</div>}
                    {restoreSuccess && <div className={auth.success}>Письмо с инструкцией отправлено на почту</div>}
                    {restoreError && <div className={auth.error}>Упс, что-то пошло не так :(</div>}



                    <div className={newStyle.login}>
                        <p><a href="" onClick={()=> navigate('/')}>Авторизация</a></p>
                    </div>

                </form>
            </div>
        </section>
    </>
}
{/*{...register("Email", {*/}
{/*    required: "Это поле обязательно для заполнения",*/}
{/*    maxLength: {*/}
{/*        value: 40,*/}
{/*        message: "Маскимум 40 символов"*/}
{/*    },*/}
{/*    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i*/}
{/*})}*/}