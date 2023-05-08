import './Header.css';
import AccountMenu from "./AccountMenu/AccountMenu";
import {MainMenu} from "./MainMenu/MainMenu";
import React from "react";
import {disableMapDragging, enableMapDragging} from "../Map/MapEvents/MapEvents";

export function Header(props){
    return(
        <div onMouseDown={() => disableMapDragging(props.map)} onMouseUp={() => enableMapDragging(props.map)}>
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