import './Header.css';
import AccountMenu from "./AccountMenu/AccountMenu";
import {MainMenu} from "./MainMenu/MainMenu";
import React from "react";
export function Header(){
    return(
        <div >
            <header className="Header">
                <div>
                    <MainMenu />
                </div>
                <div className="label">
                    <h1>Fire Activity Map</h1>
                </div>
                <div className="account_menu">
                    <AccountMenu />
                </div>
            </header>
        </div>
    );
}