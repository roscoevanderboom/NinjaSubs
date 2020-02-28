import React, { useContext, useState } from 'react';
import store from 'state';

import {
    Button, Container, Avatar
} from '@material-ui/core';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, methods, constants, fb } = useContext(store);
    const { selectedChat, profileData } = state;
    const { chatPost, ninjaStar } = constants;
    const { feedback } = methods;
    const [newPost, setNewPost] = useState('');

    const handleNewPost = (e) => {
        setNewPost(e.target.value)
    }
    const post = (value) => (e) => {  
        if (e.key === "Enter" || value === 'btn') {
            if (newPost === '') {
                return;
            }
            var newChat = chatPost(profileData, newPost);
            fb.privateChats.doc(`${selectedChat.room_id}`).update({
                messages: [...selectedChat.messages, newChat]
            })
                .then(() => {
                    setNewPost('')
                })
                .catch(function (error) {
                    feedback("error", 'Chat room does not exist');
                });
        }
    };

    return (
        <Container onKeyPress={post()}
            className={classes.footer}>
            <input
                value={newPost}
                className={classes.textInputDiv}
                type='text'
                onChange={handleNewPost} />
            <Button
                className='p-1'
                variant='outlined'
                id='postBtn'
                children={<Avatar src={ninjaStar} />}
                onClick={post('btn')} />
        </Container>
    );
}