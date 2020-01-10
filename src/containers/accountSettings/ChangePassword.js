import React, { useContext, useState } from 'react';
import { GlobalState } from '../../state';

// Components
import {
    Dialog, DialogTitle, DialogActions, Button,
    TextField, DialogContent
} from '@material-ui/core';

export default () => {

    const { state, methods } = useContext(GlobalState);
    const { user, modals } = state;
    const { handleModals, feedback } = methods;

    const [password, setPassword] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        user.updatePassword(password).then(function () {
            handleModals('ChangePassword');
            feedback('success', 'Password changed')
        }).catch(function (error) {
            handleModals('ChangePassword');           
            feedback('logout', error.message)
        });
    }

    return (
        <Dialog open={modals.ChangePassword} onClose={() => handleModals('ChangePassword')}>
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
                <Button children={`Submit`} variant='outlined' onClick={handleSubmit} />
            } />
        </Dialog>
    )
}
