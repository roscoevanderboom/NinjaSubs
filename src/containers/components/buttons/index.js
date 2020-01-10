import React from 'react';
// Components
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export const DismissBtn = ({ onClick }) => (
    <Button
        onClick={onClick}>
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
export const CustomBtn = ({ text, onClick }) => (
    <Button
        variant='outlined'
        color='default'
        onClick={onClick}>
        {text}
    </Button>
)
