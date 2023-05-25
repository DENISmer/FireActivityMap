import React from 'react';
import './App.css'
import {MapComponent} from "./components/Map/Map.jsx";
import {Registration} from "./Pages/Registration/Registration";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Login} from "./Pages/Authorization/Auth";
import AccountMenu from "./components/Header/AccountMenu/AccountMenu";
import Restore from "./Pages/Restore_Page/RestoreAccess"
import {Restore_password} from "./Pages/Restore_Page/RestorePassword";
import {Profile} from "./Pages/User_profile/Profile";
import {Test_Page} from "./Pages/User_profile/Test/Test_Page";
import {User_manual} from "./Pages/Users_guide/User_manual";

export default function App(){

    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />}/>
                <Route exac path='/Registration' element={<Registration />}/>
                <Route exac path='/Map' element={<MapComponent />}/>
                <Route exac path='/Acc' element={<AccountMenu />}/>
                <Route exac path='/Restore_access' element={<Restore />}/>
                <Route exac path='/Restore_password' element={<Restore_password />}/>
                <Route exac path='/Profile' element ={<Profile/>}/>
                <Route exac path='/Test_Page' element = {<Test_Page/>}/>
                <Route exac path='/Manual' element = {<User_manual/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

