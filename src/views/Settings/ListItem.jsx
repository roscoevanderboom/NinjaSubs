import React from 'react';

// Components
import {
    ListItem, ListItemText, Button, Divider
} from '@material-ui/core';

export default ({ props }) => {
    const { i, item, listOfClicks, classes } = props;
    return (
        <ListItem button
            className={classes.listItem}
            onClick={() => listOfClicks[i]()}>
            <ListItemText>
                {item.text}
            </ListItemText>
            <Button >
                {item.icon}
            </Button>
            <Divider />
        </ListItem>
    )
}
