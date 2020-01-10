import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import {
    List, ListItem, ListItemIcon, ListItemText,
    Drawer, IconButton, Divider,
} from '@material-ui/core';

import { ChevronLeft } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    }
}))

export default ({ props }) => {
    const { open, state, handleDrawer } = props;
    const { routes, profileData } = state;
    const classes = useStyles();
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        if (profileData.type === undefined) {
            return
        }
        let r;
        if (profileData.type === 'Employer') {
            r = routes.slice(3);
            setList(r)
            return;
        }
        r = routes.slice(2)
        setList(r)
    }, [profileData, routes]);


    return (
        <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={open}
            classes={{ paper: classes.drawerPaper, }} >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawer}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List>
                {list.map((btn, index) =>
                    <NavLink
                        key={index}
                        onClick={handleDrawer}
                        className={classes.navLink} to={btn.path} >
                        <ListItem button>
                            <ListItemIcon>
                                {btn.icon}
                            </ListItemIcon>
                            <ListItemText primary={btn.name} />
                        </ListItem>
                    </NavLink>
                )}
            </List>
        </Drawer>


    )
}