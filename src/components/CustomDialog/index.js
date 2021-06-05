import React from 'react';

// Components
import { SubmitBtn } from '../../components/Buttons';
import {
    Dialog, DialogTitle, DialogActions, DialogContent
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
    dialog: {
        width: "94%",
        margin: 0,
        maxWidth: 350,
    }
});

export default (props) => {
    const classes = styles();
    return (
        <React.Fragment>
            {props.component}
            <Dialog
                open={props.open}
                onClose={props.handleOpen}
                classes={{
                    paperScrollPaper: classes.dialog
                }}>
                <DialogTitle children={props.title} />
                <DialogContent children={props.children} />
                <DialogActions children={
                    <SubmitBtn onClick={props.handleSubmit} children={`Submit`} />
                } />
            </Dialog>
        </React.Fragment>

    )
}
