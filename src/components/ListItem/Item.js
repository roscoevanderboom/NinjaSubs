import React from 'react';

// Components
import {
    ListItemText, ListItemIcon, ListItem, Button
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    secondaryText: {
        color: 'black'
    },
    root: {
        cursor: 'pointer'
    }
}));

export default ({ primary, secondary, icon, click }) => {
    const classes = useStyles();

    return (
        <ListItem>
            {icon === undefined ? null :
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
            }
            <ListItemText
                classes={{
                    secondary: classes.secondaryText
                }}
                primary={primary}
                secondary={secondary} />

            {click === undefined ? null :
                <Button onClick={click} />
            }
        </ListItem>
    )
}
