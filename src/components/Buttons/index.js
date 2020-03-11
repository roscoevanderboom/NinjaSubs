import React from 'react';

import { handleSignOut } from '../../constants/firebase/constants';
// Components
import { Button } from '@material-ui/core';
import { Close, ExitToApp } from '@material-ui/icons';

export const DismissBtn = ({ props }) => {
    const { key, closeSnackbar } = props;
    return (
        <Button
            onClick={() => { closeSnackbar(key) }}>
            <Close />
        </Button>
    )
}
export const AcceptBtn = ({ onClick }) => (
    <Button
        variant='outlined'
        onClick={onClick}>
        Accept
    </Button>
)
export const LogoutBtn = ({ props }) => {
    const { key, closeSnackbar, hist } = props;
    return (
        <Button
            onClick={() => {
                handleSignOut(hist)
                closeSnackbar(key)
            }}>
            <ExitToApp />
        </Button>
    )
}
export const CustomBtn = ({ text, onClick }) => (
    <Button
        variant='outlined'
        color='default'
        onClick={() => onClick}>
        {text}
    </Button>
)
