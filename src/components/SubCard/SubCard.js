import React, { useContext, useState } from 'react';
// State
import store from 'state';

import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    DialogContentText, Chip, Avatar, Button
} from '@material-ui/core';

import { useStyles } from './styles';

export default function SubCard({ sub }) {
    const classes = useStyles();
    const { methods } = useContext(store);
    const { searchInbox, isUserVerfied } = methods;

    const [open, setOpen] = useState(false)

    const handleModal = (value) => {
        setOpen(value)
    }

    const handleStartChat = () => {
        if (!isUserVerfied()) {
            return;
        }       
        searchInbox(sub)
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
                    <Button
                        variant='outlined'
                        onClick={handleStartChat}>
                        Contact
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}