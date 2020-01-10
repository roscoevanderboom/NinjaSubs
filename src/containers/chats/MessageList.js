import React, { useContext } from 'react';
import { GlobalState } from '../../state';

import { ListItem, ListItemText } from '@material-ui/core';

import { useStyles } from './styles';

export default ({ list }) => {
    const classes = useStyles();
    const { state } = useContext(GlobalState);
    const { profileData } = state;

    return (list &&
        <ul className={classes.list}>
            {list.map((item, i) =>
                <div
                    key={i}
                    className={item.sender_name === profileData.name
                        ? classes.listItemRight
                        : classes.listItemLeft}>
                    <ListItem
                        classes={{
                            root: classes.textBubble
                        }}

                        children={
                            <ListItemText
                                primary={item.post} />
                        } />
                </div>
            )}
        </ul>
    );
}