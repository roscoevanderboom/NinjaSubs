import React, { useContext, useState } from 'react';
import GlobalState from 'state';

// Components
import { SubmitBtn } from '../../components/Buttons';
import {
    Dialog, DialogTitle, DialogActions, TextField, DialogContent
} from '@material-ui/core';
// Icons
import { Security } from '@material-ui/icons';
// custom components
import SettingsItem from './SettingsItem';

export default () => {

    const { state, feedback } = useContext(GlobalState);
    const { user } = state;

    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        setOpen(value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        user.updatePassword(password).then(function () {
            setOpen(false);
            feedback('success', 'Password changed')
        }).catch(function (error) {
            setOpen(false);
            feedback('logout', error.message)
        });
    }

    return (
        <React.Fragment>
            <SettingsItem
                text='Change your password.'
                icon={<Security />}
                onClick={() => handleOpen(true)} />
            <Dialog open={open} onClose={() => handleOpen(false)}>
                <DialogTitle children={'Change Password'} />
                <DialogContent>
                    <TextField
                        type='password'
                        margin="dense"
                        label="Password"
                        value={password}
                        onChange={handlePassword}
                        placeholder='Enter new password' />
                </DialogContent>
                <DialogActions children={
                    <SubmitBtn onClick={handleSubmit} children={`Submit`} />
                } />
            </Dialog>
        </React.Fragment>

    )
}
