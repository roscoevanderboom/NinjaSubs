import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GlobalState from '../../state/store';

import {
    Typography, List, Divider,
    ListItemIcon, ListItemText
} from '@material-ui/core';

import routes from '../../routes/routes'

export default ({ props }) => {
    const { classes, toggleDrawer } = props;
    const { state } = useContext(GlobalState);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        // state.profileData.type === 'Employer'
        //     ? setLinks(routes.slice(2))
        //     : setLinks(routes.slice(1))
        setLinks(routes.slice(1))
    }, [state.profileData])


    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)} >

            <Typography
                className={classes.header}
                component='header'
                variant='h5'>NinjaSubs</Typography>
            <Divider />
            <List>
                {links.map((route, index) => (
                    <NavLink
                        key={index}
                        to={route.path}
                        className={classes.navLink}>
                        <ListItemIcon>
                            {route.icon}
                        </ListItemIcon>
                        <ListItemText primary={route.name} />
                    </NavLink>
                ))}
            </List>
        </div>
    );
}