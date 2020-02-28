
import React from "react";
// @material-ui/core components
import { makeStyles, Typography } from "@material-ui/core";
// Styles
import { title } from "assets/jss/material-kit-react";
const useStyles = makeStyles({   
    header: {
        ...title,
        marginTop: 20
    }
});

export default (props) => {
    const { text } = props;
    const classes = useStyles();
    return (
        <Typography
            align='center'
            variant='h5'
            component='header'
            className={classes.header}>
            {text}
        </Typography>
    )
}