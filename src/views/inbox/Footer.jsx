import React, { useContext, useState } from 'react';
import GlobalState from '../../state/store';

import {
    Button, Container, Avatar
} from '@material-ui/core';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = useContext(GlobalState);
    const { selectedChat, profileData } = state;
    const { chatPost, ninjaStar } = constants;
    const { feedback } = methods;
    const [newPost, setNewPost] = useState('');

    const handleNewPost = (e) => {
        setNewPost(e.target.value)
    }
    const post = () => {
        if (newPost === '') {
            return;
        }
        var newChat = chatPost(profileData, newPost);
        fb.privateChats.doc(`${selectedChat.room_id}`).update({
            messages: [...selectedChat.messages, newChat]
        }).catch(function (error) {
            feedback("error", 'Chat room does not exist');
        });
    };

    return (
        <Container
            className={classes.footer}>
            <input   
                className={classes.textInputDiv}
                type='text'
                onChange={handleNewPost} />
            <Button
                className='p-1'
                variant='outlined'
                children={<Avatar src={ninjaStar} />}
                onClick={post} />
        </Container>
    );
}