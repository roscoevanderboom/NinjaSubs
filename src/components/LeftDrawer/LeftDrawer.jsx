import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';

import {
    makeStyles, SwipeableDrawer, IconButton
} from '@material-ui/core';

import NavLinks from './NavLinks';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        outline: 'none'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 10
    },
    navLink: {
        textDecoration: 'none',
        color: 'black',
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    list: {
        minWidth: 250
    }
}));

export default function LeftDrawer() {
    const classes = useStyles();
  
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown'
            && (event.key === 'Tab'
                || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <div>
            <IconButton
                edge="start"
                onClick={toggleDrawer(true)}
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer" >

                <MenuIcon />
            </IconButton>

            <SwipeableDrawer
                className={classes.drawer}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                <NavLinks props={{ classes, toggleDrawer }} />
            </SwipeableDrawer>
        </div>
    );
}