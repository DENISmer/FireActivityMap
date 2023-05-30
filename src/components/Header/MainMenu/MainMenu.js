import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {SvgIcon} from "@mui/material";
import MenuIcon from '../../../icons/2x/twotone_notes_black_24dp.png'
import {Link} from "react-router-dom";

export function MainMenu() {
    return (
        <PopupState variant="outlined" >
            {(popupState) => (
                <React.Fragment>
                    <Button  className="dropdown-menu" {...bindTrigger(popupState)}>
                        {<img src={MenuIcon} width={33} ></img>}
                    </Button>
                    <Menu {...bindMenu(popupState)} onClick>
                        <MenuItem onClick={popupState.close}>О нас</MenuItem>
                        <MenuItem component={Link} to={'/Manual'} onClick={popupState.close}>Руководоство</MenuItem>
                        <MenuItem onClick={popupState.close}>FAQ</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}