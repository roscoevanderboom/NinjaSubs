import React, { useContext } from 'react';
import store from 'state';

import { ListItem, ListItemText } from '@material-ui/core';

import { useStyles } from './styles';

export default ({ list }) => {
    const classes = useStyles();
    const { state } = useContext(store);
    const { profileData } = state;

    return (list &&
        <ul className={classes.list}>
            {list.map((item, i) =>
                <div
                    key={i}
                    className={item.sender_name === profileData.name
                        ? 'text-dark mt-2 row p-0 m-0 justify-content-end'
                        : 'text-dark mt-2 row p-0 m-0 justify-content-start'}>
                    <ListItem
                        className='col-6 p-0 m-0'
                        children={
                            <ListItemText
                                inset={true}
                                classes={{
                                    primary: item.sender_name === profileData.name
                                        ? classes.listItemRight
                                        : classes.listItemLeft
                                }}
                                className={item.sender_name === profileData.name
                                    ? 'row p-0 m-0 justify-content-end'
                                    : 'row p-0 m-0 justify-content-start'}
                                primary={item.post} />
                        } />
                </div>
            )}
        </ul>
    );
}