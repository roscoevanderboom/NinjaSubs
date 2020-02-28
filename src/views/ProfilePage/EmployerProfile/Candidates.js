import React, { useContext, useState, useEffect } from 'react';
// Store
import store from 'state';
// @material-ui/core
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Chip, Avatar, Badge,
} from '@material-ui/core';
// @material-ui/icons
import People from '@material-ui/icons/People';
// Core components
import Button from "components/CustomButtons/Button.js";
// Custom Components
import SubCard from 'components/SubCard/SubCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paperWidthSm: {
        margin: 5
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'space-around',
    }

}));


export default ({ post }) => {
    const classes = useStyles()
    const { state, methods, fb, constants, setState } = useContext(store);
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <React.Fragment>
            <Badge badgeContent={post.candidates.length}>
                <Button justIcon
                    color='primary'
                    variant='outlined'
                    onClick={handleModal}>
                    <People />
                </Button>
            </Badge>
            <Dialog open={open} onClose={handleModal}
                classes={{
                    paperWidthSm: classes.paperWidthSm
                }}>
                <DialogTitle children={'Candidates'} />
                <DialogContent
                    className={classes.dialogContent}>
                    {post.candidates.map((sub, i) =>
                        <SubCard key={i} sub={sub} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        color='danger'
                        children={`Close`}
                        onClick={handleModal} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}