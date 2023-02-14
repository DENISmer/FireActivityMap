import React from 'react';
import './App.css'
import MapComponent from "./components/Map/Map.jsx";
import {Signup} from "./Login/Registration/Signup.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Signin} from "./Login/Authorization/Signin.jsx";
import AccountMenu from "./components/Header/AccountMenu/AccountMenu";
import Restore from "./Login/Restore_Page/RestoreAccess.jsx"
import {Restore_password} from "./Login/Restore_Page/RestorePassword";
import {Profile} from "./Pages/User_profile/Profile";

export default function App(){

    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Signin />}/>
                <Route exac path='/Signup' element={<Signup />}/>
                <Route exac path='/Map' element={<MapComponent />}/>
                <Route exac path='/Acc' element={<AccountMenu />}/>
                <Route exac path='/restore_access' element={<Restore />}/>
                <Route exac path='/restore_password' element={<Restore_password />}/>
                <Route exac path={'/Profile'} element ={<Profile/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

