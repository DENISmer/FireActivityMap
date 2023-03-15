import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./Test.css"
import {TimePicker} from "@mui/x-date-pickers";

export function Test_Page(){

    const navigate = useNavigate();

    const timer = useRef();

    const click = event => {
        clearTimeout(timer.current);

        if (event.detail === 1){
            timer.current = setTimeout(onclick, 300);
            console.log('single click');
        }else if (event.detail === 2){
            alert('double click');
        }
    }


    return<>
        {/*<div className="star"></div>
        <div className="start2"></div>*/}
        <div className={"test_div_clock"}>
            <div className="test stars1"></div>
            <div className="test stars2"></div>
            <div className="test stars3"></div>

            <button onClick={click} className='button'>double click</button>


        </div>




    </>
}