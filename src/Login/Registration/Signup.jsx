import React, {useState} from "react";
import './Signup.css'
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [nameError,setNameError] = useState('');

    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState('');

    const [company,setCompany] = useState('');
    const [companyError, setCompanyError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordRepeat,setPasswordRepeat] = useState('');
    const [passwordRepeatError, setpasswordRepeatError] = useState('');

    const isValid = (): boolean =>{ // Не сделано!!
        let result = true;
        setMailError("");
        setPasswordError('');
        if (mail.length < 5) {
            console.log("Error")
            setMailError("Слишком короткий электронный адрес");
            result = false;
        }
        else if(!/[^a-zA-Z0-9@]/.test(mail)){
            setMailError('Недопустимые символы в логине');
            result = false
        }
        if (password.length <=7) {
            setPasswordError('Ненадежный пароль!');
            result = false
        }
        else if(/[a-zA-Z]/.test(password)){
            setPasswordError('недопустимые символы!');
            result = false;
            // if(/[^]/.test(password)){
            //     setPasswordError('пароль ненадежный! Используйте A-Z');
            //     result = false;
            // }
        }

        return result;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isValid()
        // ? loginRequest(mail,password) : console.log("this data is not Valid");
    }
    return<>
        <form onSubmit={handleSubmit}>
            <div className='parent'>
                <video className={'video'} autoPlay muted loop>
                    <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
                </video>
                <div className='block'>
                    <div className='block_header'>
                        <h2>Регистрация</h2>
                    </div>

                    <div className='inputs_block'>
                        <input placeholder='Ф.И.О' onChange={e => setName(e.target.value)} value={name}></input>
                        {nameError && <div className={'error'}>{nameError}</div>}

                        <input type={'email'} placeholder='Почта' onChange={e => setMail(e.target.value)} value={mail}></input>
                        {mailError && <div className={"error"}>{mailError}</div>}

                        <input placeholder='Наименование организации' onChange={e => setCompany(e.target.value)} value={company}></input>
                        {companyError && <div className={'error'}>{companyError}</div>}

                        <input type="password" placeholder='Пароль' onChange={e => setPassword(e.target.value)} value={password}></input>
                        {passwordError && <div className={'error'}>{passwordError}</div>}

                        <input type="password" placeholder='Повтор пароля' onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat}></input>
                        {passwordRepeatError && <div className={'error'}>{passwordRepeatError}</div>}
                    </div>

                    <div className='form_footer'>
                        <button className={'registration_button'}>Зарегистрироваться</button>
                        <br/>
                        <a className={'ref_signin'} href="" onClick={()=> navigate('/')}>Уже есть аккаунт?</a>
                    </div>

                </div>
            </div>
        </form>
    </>
}