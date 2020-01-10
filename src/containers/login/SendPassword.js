import React from 'react';
import { GlobalState } from '../../state';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';

export default function FormDialog({ props }) {
    const { classes} = props;
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const { state, methods } = React.useContext(GlobalState);
    const { auth } = state;
    const { feedback } = methods;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSendPassword = () => {
        auth.sendPasswordResetEmail(email).then(function () {
            feedback('success', 'Verification email sent.');
            handleClose()
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div>
            <Typography
                className={classes.forgotPassword}
                onClick={handleClickOpen}
                variant='subtitle1'
                component='p'
                children={
                    <Link href="#" variant="body2">
                        {'Forgot your password?'}
                    </Link>
                } />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reset your password, enter your email and click submit.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleEmail}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={handleSendPassword}
                        color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}