import React from 'react';

// Components
import {
    ListItem, ListItemText, Button, Divider
} from '@material-ui/core';

export default ({ props }) => {
    const { i, item, listOfClicks, styles } = props;
    return (
        <ListItem
            className={styles.listItem}>
            <ListItemText>
                {item.text}
            </ListItemText>
            <Button onClick={() => listOfClicks[i]()}>
                {item.icon}
            </Button>
            <Divider />
        </ListItem>
    )
}
