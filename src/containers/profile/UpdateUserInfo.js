import React from 'react';
import { GlobalState } from '../../state';

// Components
import {
    DialogTitle, Dialog
} from '@material-ui/core';

import EmployerForm from './EmployerForm';
import SubForm from './SubForm';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
        margin: 0
    }
}))

export default () => {
    const classes = useStyles();
    const { state } = React.useContext(GlobalState);
    const { modals, profileData } = state;

    return (
        <div>
            <Dialog
                classes={{ paper: classes.paper }}
                open={modals.UpdateUserInfo}                
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit profile details</DialogTitle>

                {profileData.type === 'Employer'
                    ? <EmployerForm />
                    : <SubForm />
                }
            </Dialog>
        </div>
    );
}