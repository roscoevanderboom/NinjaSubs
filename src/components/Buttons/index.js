import React from 'react';

import { signOut } from '../../actions/auth';
// Components
import CustomButton from '../CustomButtons/Button';
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
                signOut(hist)
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
export const SubmitBtn = (props) => (
    <CustomButton
        children={props.children}
        size='sm'
        color='danger'
        onClick={props.onClick} />
)