import React, { useContext, useState } from 'react';
import { GlobalState } from '../../state';

import {
    TextField, Button, Container
} from '@material-ui/core';

import { Send } from '@material-ui/icons';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = useContext(GlobalState);
    const { selectedChat, profileData } = state;
    const { add_to_array, chatPost } = constants;
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
        fb.privateChats.doc(`${selectedChat.id}`).update({
            messages: add_to_array(selectedChat.messages, newChat)
        }).catch(function (error) {
            feedback("error", 'Chat room does not exist');
        });
    };

    return (
        <Container
            className={classes.textInputDiv}>
            <TextField
                className={classes.textInput}
                type='text'
                onChange={handleNewPost} />
            <Button
                className={classes.postBtn}
                variant='outlined'
                children={<Send />}
                onClick={post} />
        </Container>
    );
}