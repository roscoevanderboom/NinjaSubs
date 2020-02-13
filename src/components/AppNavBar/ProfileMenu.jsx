import React, { useContext } from 'react';
import GlobalState from '../../state/store';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const menuId = 'primary-search-account-menu';

const ProfileMenu = ({ props }) => {
    const { fb, hist } = useContext(GlobalState)
    const { anchorEl, handleMenuClose } = props;

    const isMenuOpen = Boolean(anchorEl);

    const veiwAccountSettings = () => {        
        handleMenuClose()
        hist.push('/home/settings')
    }

    const signOut = () => {
        handleMenuClose()
        fb.handleSignOut(hist)
    }

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={veiwAccountSettings}>Account Settings</MenuItem>
            <MenuItem onClick={signOut}>Log out</MenuItem>
        </Menu>
    );
}

export default ProfileMenu;