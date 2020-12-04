import React, { useContext, useState } from 'react';
// State
import store from 'state';
// actions
import { searchInbox } from 'actions/privatechat'
// Components
import CustomButton from 'components/CustomButtons/Button';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    DialogContentText, Chip, Avatar
} from '@material-ui/core';

import { useStyles } from './styles';

export default function SubCard({ sub }) {
    const classes = useStyles();
    const { state, dispatch, hist } = useContext(store);
    const { inbox, profileData } = state;

    const [open, setOpen] = useState(false)

    const handleModal = (value) => {
        setOpen(value)
    }

    const handleStartChat = () => {
        if (state.user === null) {
            return;
        }
        searchInbox(inbox, profileData, sub, hist, dispatch);
    }

    return (
        <div>
            <Chip
                className="ml-1 mr-1"
                label={sub.name}
                onClick={() => handleModal(true)}
                avatar={<Avatar src={sub.image} alt={sub.name} />}
                clickable={true} />
            <Dialog
                open={open}
                onClose={() => handleModal(false)}
                classes={{ paper: classes.paper }}
                aria-labelledby="subcard-title"
                aria-describedby="subcard-bio" >
                <div className='d-flex'>
                    <Avatar
                        className='m-2'
                        src={sub.image} alt={sub.name} />
                    <DialogTitle id="subcard-title" >
                        {sub.name}
                    </DialogTitle>
                </div>
                <DialogContent>
                    <DialogContentText id="subcard-bio">
                        {sub.bio}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        size='sm'
                        color='github'
                        onClick={handleStartChat}>
                        Contact
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </div>

    );
}