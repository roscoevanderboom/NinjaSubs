import React, { useState } from 'react';
// @material-ui/core
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Badge,
} from '@material-ui/core';
// @material-ui/icons
import People from '@material-ui/icons/People';
// Core components
import Button from "components/CustomButtons/Button.js";
// Custom Components
import SubCard from 'components/SubProfileDialog';
import { makeStyles } from '@material-ui/core/styles';
import { title } from "assets/jss/material-kit-react";

const useStyles = makeStyles(theme => ({
    paperWidthSm: {
        width: "90%",
        maxWidth: 500
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    title: {
        ...title,
        marginTop: 0
    }
}));


export default ({ post }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);

    const handleModal = () =>  setOpen(!open);

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
                <DialogTitle children={'Candidates'} className={classes.title} />
                <DialogContent>
                    {post.candidates.map((sub, i) =>
                        <SubCard key={i} sub={sub} trigger="listItem" />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        size='sm'
                        color='danger'
                        children={`Close`}
                        onClick={handleModal} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}