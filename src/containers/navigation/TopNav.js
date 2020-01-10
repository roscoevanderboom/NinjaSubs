import React, { useContext } from 'react';
import { GlobalState } from '../../state';
import clsx from 'clsx';
// Components
import {
    AppBar, Toolbar, IconButton
} from '@material-ui/core';

import { ExitToApp, Menu } from '@material-ui/icons';

export default ({ open, handleDrawer, classes }) => {
    const { fb } = useContext(GlobalState); 

    const signOut = () => {
        fb.auth.signOut()
    }

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })} >
            <Toolbar className={classes.toolbar} >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start" >
                    <Menu />
                </IconButton>            
               
                <IconButton
                    color="inherit"
                    aria-label="sign out"
                    onClick={signOut}
                    edge="start" >

                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}