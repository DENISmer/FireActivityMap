import React from 'react';
//import "./Map.css"
import './App.css'
import MapComponent from "./components/Map/Map.js";
import {Signup} from "./Login/Registration/Signup.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Signin} from "./Login/Authorization/Signin.jsx";
import AccountMenu from "./components/Header/AccountMenu/AccountMenu";
export default function App(){

    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Signin />}/>
                <Route exac path='/Signup' element={<Signup />}/>
                <Route exac path='/Map' element={<MapComponent />}/>
                <Route exac path='/Acc' element={<AccountMenu />}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

