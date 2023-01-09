import React, {useState} from "react";
import './MainNavBar.css';
import UnstyledButtonsSimple from "../buttons/materialui buttons";
import NavBarIcon from '../../icons/NavBarIcons/2x/twotone_miscellaneous_services_black_24dp.png';
import NavBarCloseIcon from '../../icons/closeButton/2x/twotone_close_black_24dp.png';

export function MainNavBar(){
    const [showNavBar, setShowNavBar] = useState(false);

    const handleShow = () => showNavBar ? setShowNavBar(false) : setShowNavBar(true);
    const handleClose = () => setShowNavBar(false);
    return(
        <>
            <button  className="show_hide_NavBar" onClick={handleShow}>
                {showNavBar ?  <img src={NavBarCloseIcon} width={32} height={35}/> : <img src={NavBarIcon} width={32} height={35}/>}
            </button>
        <div dis className={showNavBar ? "navBar" : "hidden"}>
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
        </>
        );
}
