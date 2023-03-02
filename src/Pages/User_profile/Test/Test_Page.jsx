import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Test.css"

export function Test_Page(){

    const navigate = useNavigate();

    const name = 'Ivan Ivanovich Ivanov';
    const email = 'Ivanich@mail.rom';
    const organization_name = 'SupremeUltimateTurboV-powerUndergroundCompany'


    return<>
        {/*<div className="star"></div>
        <div className="start2"></div>*/}

        <div className="test stars1"></div>
        <div className="test stars2"></div>
        <div className="test stars3"></div>
    </>
}