import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../Registration/Signup.css'

export function Signin(){
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // const [isLoading, setIsLoading] = useState(false);

    const URL = "https://jsonplaceholder.typicode.com/users/";

    const isValid = (): boolean =>{
        let result = true;
        setMailError("");
        setPasswordError('');
        if (mail.length < 6) {
            console.log("Error")
            setMailError("Слишком короткий логин");
            result = false;
        }
        else if(!/[^a-zA-Z0-9]/.test(mail)){
            setMailError('Недопустимые символы в логине');
            result = false
        }
        if (password.length <=7) {
            setPasswordError('Слишком короткий пароль!');
            result = false
        }
        return result;
    }

    const loginRequest = async (mail,password) => {
        const response = await fetch(`${URL}/${1}`);

        const data = await response.json();

        if(response.status !== 200){
            setMailError('Ошибка: Проверьте правильность введенных данных')
            console.log(response);
        }
        else if (data.email === "Sincere@april.biz") {
            data.toString();
            console.log(data);
            navigate('/Map');
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isValid() ? loginRequest(mail,password) : console.log("this data is not Valid");
    }

    return<>
        <form onSubmit={handleSubmit}>
            <div className='parent'>
                <div className='logo'>
                    <h1>Welcome to Fire Activity Map</h1>
                </div>
                <video className={'video'} autoPlay muted loop>
                    <source src={'https://joy1.videvo.net/videvo_files/video/free/video0485/large_watermarked/_import_61c054cfcedae4.80735760_preview.mp4'}/>
                </video>
                <div className='block'>
                    <div className='block_header'>
                        <h2>Авторизация</h2>
                    </div>
                    <div className='inputs_block'>

                        <input type="email" placeholder='Почта' onChange={e => setMail(e.target.value)} value={mail}></input>
                        {mailError && <div className="error">{mailError}</div>}

                        <input type="password" placeholder='Пароль' onChange={e => setPassword(e.target.value)}></input>
                        {passwordError && <div className="error">{passwordError}</div>}

                    </div>
                    <div className="form_footer">
                        <button className='login_button' type={"submit"}>Войти</button>
                        <br/>
                        <a className='ref_signup' href="" onClick={()=> navigate('/Signup')}>Нет аккаунта?</a>
                    </div>
                </div>
            </div>
        </form>
    </>
}