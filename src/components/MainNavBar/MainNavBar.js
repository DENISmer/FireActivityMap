import React from "react";
import './MainNavBar.css';
export function MainNavBar(){
    return(
        <div className="navBar">
            <div className="#">
                тут будет основная информация
            </div>
            <div className="#">
                <button>first</button>
            </div>
            <div className="#">
                дополнительные инстр
            </div>
        </div>
        );
}