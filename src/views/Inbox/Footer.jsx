import React, { useContext, useState } from 'react';
import store from 'state';
// Constants
import { ninjaStar } from '../../constants';
// Actions
import { handleNewChatMessage } from '../../actions/privatechat';
// Components
import {
    Button, Container, Avatar
} from '@material-ui/core';

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { state, feedback } = useContext(store);
    const { selectedChat, profileData } = state;
    const [newPost, setNewPost] = useState('');

    const handleNewPost = (e) => {
        setNewPost(e.target.value)
    }
    const post = (value) => (e) => {
        if (e.key === "Enter" || value === 'btn') {
            if (newPost === '') {
                return;
            }
            handleNewChatMessage(profileData, newPost, selectedChat)
                .then(() => {
                    setNewPost('')
                })
                .catch(function (err) {
                    feedback("error", err);
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