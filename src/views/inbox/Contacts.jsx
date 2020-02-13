/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import GlobalState from '../../state/store';

import ChatButton from './ChatButton';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    body: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 700
    }
}));

export default () => {
    const classes = useStyles();
    const { state, filters, setState } = useContext(GlobalState);
    const { inbox, profileData, searchList } = state;

    useEffect(() => {
        if (profileData) {
            setState.setCurrentList(filters.filterInbox(inbox, profileData));           
        }
    }, [inbox])

    return (
        <div className={classes.body}>           
            {searchList.length === 0
                ? <span className="text-muted mt-3">
                    <small>No Messages</small>
                </span>
                : <React.Fragment>
                    {searchList.map((chat, i) =>
                        <ChatButton
                            key={i}
                            chat={chat} />
                    )}
                </React.Fragment>
            }
        </div>
    );
}




