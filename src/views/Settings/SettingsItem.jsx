import React from 'react';

// Components
import {
    ListItem, ListItemText, Button, Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
const styles = makeStyles({   
    listItem: {
        padding: '5px 5px 5px 12px'
    },
})

export default (props) => {
    const classes = styles();
    const { text, icon, onClick } = props;
    return (
        <ListItem button
            className={classes.listItem}
            onClick={onClick}>
            <ListItemText>
                {text}
            </ListItemText>
            <Button >
                {icon}
            </Button>
            <Divider />
        </ListItem>
    )
}
