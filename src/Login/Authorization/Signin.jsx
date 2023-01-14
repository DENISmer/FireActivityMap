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
            <img className='logos-img' src="https://img3.akspic.ru/crops/7/4/5/5/25547/25547-zemlya-noch-prostranstvo-vselennaya-kosmos-1920x1080.jpg"/>
            <div className='block'>
                <div className='block_header'>
                    <h2>Авторизация</h2>
                </div>
                <div className='inputs_block'>

                    <input type="email" placeholder='Почта' onChange={e => setMail(e.target.value)} value={mail}></input>
                    {mailError && <div className="error">{mailError}</div>}

                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Пароль'></input>
                    {passwordError && <div className="error">{passwordError}</div>}

                </div>
                <div className="form_footer">
                    <button type={"submit"}>Войти</button>
                    <br/>
                    <a href="" onClick={()=> navigate('/Signup')}>Нет аккаунта?</a>
                </div>
            </div>
        </div>
        </form>
    </>
}