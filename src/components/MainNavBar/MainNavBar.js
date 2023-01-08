import React from "react";
import './MainNavBar.css';
import {useButton} from "@mui/base/ButtonUnstyled";
import {ButtonUnstyled} from "@mui/base";
import UnstyledButtonsSimple from "../buttons/materialui buttons";
import {ScaleControl} from "react-leaflet";
export function MainNavBar(){
    return(
        <div className="navBar">
            <div className="navBarMainInstuments">
                <h2>тут будет основная информация</h2>
            </div>

            <div className="navBarMainInstuments">
                <h2>
                    <UnstyledButtonsSimple />
                    <br/>
                    <UnstyledButtonsSimple />
                    <br/>
                    <UnstyledButtonsSimple />
                    <button className='navBar_button'>first</button>
                    <button className='navBar_button'>second</button>
                    <button className='navBar_button'>third</button>
                </h2>
            </div>
            <div className="navBarMainInstuments">
                <h2>доп информация</h2>
            </div>
        </div>

        );
}
