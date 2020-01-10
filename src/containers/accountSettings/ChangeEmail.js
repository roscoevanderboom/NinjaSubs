import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../state';

// Components
import {
    Dialog, DialogTitle, DialogActions, Button,
    TextField, DialogContent, DialogContentText
} from '@material-ui/core';

export default () => {

    const { state, methods } = useContext(GlobalState);
    const { user, modals, profileData } = state;
    const { handleModals, feedback, updateProfileData } = methods;

    const [email, setEmail] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = () => {
        user.updateEmail(email).then(function () {
            updateProfileData({ email: email });
            handleModals('ChangeEmail');            
        }).catch(function (error) {
            handleModals('ChangeEmail');           
            feedback('logout', error.message)
        });
    }

    useEffect(() => {
        setEmail(profileData.email)
    }, [profileData.email])

    return (
        <Dialog open={modals.ChangeEmail} onClose={() => handleModals('ChangeEmail')}>
            <DialogTitle children={'Change Email'} />
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Account Email"
                    value={email}
                    onChange={handleEmail}
                    placeholder='Enter email address' />
                <DialogContentText>
                    Your email is not shared with anyone.
                    </DialogContentText>
            </DialogContent>
            <DialogActions children={
                <Button children={`Submit`} variant='outlined' onClick={handleSubmit} />
            } />
        </Dialog>
    )
}
