/*eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../state';

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
    const { state, methods } = useContext(GlobalState);
    const { inbox, user, selectedChat, profileData } = state;
    const { setTitle, handleInbox, feedback, isUserVerfied } = methods;

    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        handleInbox();
    }, [])

    useEffect(() => {
        if (profileData) {
            let filtered = [];
            inbox.forEach(chat => {
                chat.participants.forEach(uid => {
                    if (!profileData.blackList.includes(uid)
                        && uid !== profileData.uid) {
                        filtered.push(chat);
                        return;
                    }
                })
            })
            setFilteredContacts(filtered);
        }
    }, [inbox])

    useEffect(() => {
        // isUserVerfied()
        console.log('re- apply restrictions')
    }, [user])

    return (
        <div className={classes.body}>
            {filteredContacts.length === 0 ? <h3>No Contacts</h3> :
                <React.Fragment>
                    {filteredContacts.map((chat, i) =>
                        <ChatButton
                            key={i}
                            chat={chat} />
                    )}
                </React.Fragment>
            }
        </div>
    );
}




