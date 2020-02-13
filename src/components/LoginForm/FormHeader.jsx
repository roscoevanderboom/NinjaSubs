import React from 'react';


import { Typography } from '@material-ui/core';

export default ({ props }) => {
    const { tab, classes } = props;
    return (
        <React.Fragment>
            <Typography
                align='center'
                variant='h4'
                component='header'
                className={classes.header}>
                Welcome to NinjaSubs!
            </Typography>
            <Typography
                align='center'
                variant='h5'
                component='header'
                className={classes.header}>
                {tab}
            </Typography>
        </React.Fragment>
    )
}