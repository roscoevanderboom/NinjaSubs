/*eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../state';

import {
    Toolbar, IconButton, Container,
    Typography, Tooltip
} from '@material-ui/core';


import { ChevronLeft, Close, VoiceOverOff } from '@material-ui/icons';

import MessageList from './MessageList';
import Footer from './Footer'

import { useStyles } from './styles';

export default () => {
    const classes = useStyles();
    const { methods, state, fb, constants } = useContext(GlobalState);
    const { setSelectedChat, handleInbox, updateProfileData } = methods;
    const { selectedChat, profileData, history } = state;
    const [list, setList] = useState([]);
    const [recipient, setRecipient] = useState({
        name: '',
        image: ''
    });

    const NoChat = () => {
        return (
            <Typography
                className={classes.header}
                variant='h5'
                align='center'
                children={selectedChat ? '' : 'Select a conversation'} />
        )
    }
    const deleteChat = () => {
        if (!selectedChat) {
            return;
        }
        if (!confirm(`Delete chatroom?\nChatroom will be deleted for both users.`)) {
            return;
        }
        if (selectedChat)
            fb.privateChats.doc(`${selectedChat.id}`).delete()
                .then(() => {
                    history.push('/home/contacts');
                    handleInbox()
                    setSelectedChat(false);
                })
                .catch(err => {
                    console.log(err.message)
                })
    }
    const blockUser = () => {
        if (!selectedChat) {
            return;
        }
        if (!confirm(`Block ${recipient.name}?\nYou can unblock user\nfrom Settings page.`)) {
            return;
        }
        let badUser = selectedChat.participants.filter(uid => uid !== profileData.uid)
        updateProfileData({
            blackList: constants.add_to_array(profileData.blackList, badUser[0])
        })
            .then(() => {
                deleteChat();
            })
    }
    const goBack = () => {
        history.goBack();
    }

    useEffect(() => {
        if (selectedChat) {
            setList(selectedChat.messages)
            profileData.name === selectedChat.user1_Name
                ? setRecipient({
                    name: selectedChat.user2_Name,
                    image: selectedChat.user2_Image
                })
                : setRecipient({
                    name: selectedChat.user1_Name,
                    image: selectedChat.user1_Image
                });
        }
    }, [selectedChat, profileData])

    return (
        <div className={classes.body}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    onClick={goBack}
                    color="inherit"
                    edge="start" >
                    <ChevronLeft />
                </IconButton>

                <Typography variant='h6'
                    className={classes.navlink}
                    children={recipient ? recipient.name : ''} />

                <div>
                    <Tooltip
                        title='Block user'
                        placement='left'>
                        <IconButton
                            onClick={blockUser}
                            color="inherit"
                            edge="start" >
                            <VoiceOverOff />
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        color="inherit"
                        aria-label="delete chat"
                        onClick={deleteChat}
                        edge="start" >
                        {<Close />}
                    </IconButton>
                </div>
            </Toolbar>
            <div className={classes.chatArea}>
                <Container className={classes.chatBody}>
                    {selectedChat ? <MessageList list={list} /> : <NoChat />}
                </Container>
                <Footer />
            </div>
        </div>
    );
}