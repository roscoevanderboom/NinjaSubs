import React from 'react';

import * as fb from '../../../constants/firebase/constants';
// Components
import { Button } from '@material-ui/core';
import { Close, ExitToApp } from '@material-ui/icons';

export const DismissBtn = ({ key, close }) => (
    <Button
        onClick={() => { close(key) }}>
        <Close />
    </Button>
)
export const AcceptBtn = ({ onClick }) => (
    <Button
        variant='outlined'
        onClick={onClick}>
        Accept
    </Button>
)
export const LogoutBtn = ({ key, close }) => (
    <Button       
        onClick={() => {
            fb.handleSignOut()
            close(key)
        }}>
        <ExitToApp />
    </Button>
)
export const CustomBtn = ({ text, onClick }) => (
    <Button
        variant='outlined'
        color='default'
        onClick={() => onClick}>
        {text}
    </Button>
)
